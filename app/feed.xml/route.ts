import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const posts = getAllPosts(false);
  const siteUrl = "https://portfolio-omega-six-vei2m47p70.vercel.app";

  const itemsXml = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      <author>rubanpooventhan@outlook.com (${post.author.name})</author>
    </item>`;
    })
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ruban — Network Engineer &amp; Systems Architect Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Technical engineering tutorials and field guides on Cisco Catalyst switching, FortiOS 7.6 firewalls, Linux administration, and Zero Trust security.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeed.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
