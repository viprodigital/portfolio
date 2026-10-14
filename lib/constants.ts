export interface SkillItem {
  name: string;
  level: number;
  iconName: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  tagline: string;
  icon: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: string[];
  tags: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
  gradient: string;
  features: string[];
  architectureDetails: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string;
  gradient: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  badge: string;
  description: string;
  coreResponsibilities: {
    title: string;
    items: string[];
  }[];
  techStack: string[];
}

export const PERSONAL_INFO = {
  name: "Ruban",
  title: "Network Engineer & Systems Architect",
  roles: [
    "Network Engineer",
    "Systems Architect",
    "AI Enthusiast",
    "Tech Strategist",
    "Cloud & Security Specialist",
  ],
  experienceYears: "2.5+",
  heroBio:
    "I build scalable frameworks, Network solutions, and AI-powered workflows to deliver reliable, high-quality software.",
  typingKeywords: [
    "Cisco",
    "Windows",
    "Linux",
    "Firewall",
    "Cloud",
  ],
  floatingIcons: [
    { name: "Playwright", icon: "CheckCircle2", label: "Playwright" },
    { name: "TypeScript", icon: "Code2", label: "TypeScript" },
    { name: "JavaScript", icon: "FileCode", label: "JavaScript" },
    { name: "GitHub", icon: "GitBranch", label: "GitHub" },
    { name: "VS Code", icon: "Terminal", label: "VS Code" },
    { name: "Jenkins", icon: "Cpu", label: "Jenkins" },
    { name: "API", icon: "Boxes", label: "REST & GraphQL" },
    { name: "AI", icon: "Sparkles", label: "AI Models" },
  ],
  email: "rubanpooventhan@outlook.com",
  phone: "+1 (555) 349-8201",
  location: "Global / Remote Available",
  socials: {
    linkedin: "https://www.linkedin.com/in/ruban-p-68634814b/",
    github: "https://github.com/repos?q=owner%3A%40me",
    youtube: "https://youtube.com/@ruban-tech",
    email: "mailto:rubanpooventhan@outlook.com",
  },
};

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  category: "Security" | "Networking" | "Cloud" | "Education";
  status: "Verified" | "Completed" | "Active";
  badgeText: string;
  description: string;
  skills: string[];
  gradient: string;
  verificationUrl?: string;
}

export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Certifications", href: "#certifications" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "#contact" },
];

export const STATS = [
  { value: 2.5, suffix: "+", label: "Years Experience", description: "Production enterprise systems" },
  { value: 50, suffix: "+", label: "Production Scripts", description: "PowerShell, Bash & Python" },
  { value: 100, suffix: "+", label: "Test Cases", description: "Automated verification routines" },
  { value: 20, suffix: "+", label: "Delivered Projects", description: "Cloud, network & infra deployments" },
];

export const SKILL_PILLS = [
  "Playwright",
  "TypeScript",
  "JavaScript",
  "API Testing",
  "CI/CD",
  "AI Tools",
  "Problem Solving",
  "Cisco IOS",
  "Active Directory",
  "VMware ESXi",
  "Cloud Security",
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Networking",
    tagline: "Enterprise routing, switching, and directory infrastructure",
    icon: "Network",
    skills: [
      { name: "Cisco Routing & Switching", level: 92, iconName: "Router", description: "OSPF, EIGRP, BGP, VLANs, Trunking, STP, Port Security" },
      { name: "Windows Server", level: 94, iconName: "Server", description: "DNS, DHCP, Group Policy (GPO), WSUS, Failover Clustering" },
      { name: "Linux Administration", level: 88, iconName: "TerminalSquare", description: "Ubuntu, RHEL, systemd, bash scripting, SSH hardening" },
      { name: "Active Directory (AD DS)", level: 95, iconName: "Users2", description: "Multi-domain forests, LDAP, Kerberos, Azure AD / Entra ID sync" },
    ],
  },
  {
    title: "Programming",
    tagline: "Modern full-stack engineering and systems scripting",
    icon: "Code",
    skills: [
      { name: "TypeScript", level: 88, iconName: "FileCode2", description: "Type-safe interfaces, generics, async architectures" },
      { name: "JavaScript (ES6+)", level: 90, iconName: "Braces", description: "Modern event loop, closures, DOM, Node.js runtime" },
      { name: "Python", level: 85, iconName: "FileText", description: "Network scripting (Netmiko, Paramiko), data pipelines" },
      { name: "MERN Stack", level: 82, iconName: "Layers", description: "MongoDB, Express.js, React, Node.js web applications" },
    ],
  },
  {
    title: "Security & Cloud",
    tagline: "Perimeter defense, identity protection, and resilient cloud ops",
    icon: "ShieldAlert",
    skills: [
      { name: "Firewall (Cisco ASA / Fortinet)", level: 90, iconName: "ShieldCheck", description: "Stateful inspection, NAT, ACLs, IPSec VPN, SSL-VPN" },
      { name: "AWS Cloud Infrastructure", level: 86, iconName: "Cloud", description: "VPC, EC2, S3, IAM policies, Route 53, CloudWatch" },
      { name: "API Security & OAuth", level: 85, iconName: "KeyRound", description: "Token authorization, rate limiting, SSL/TLS certificates" },
      { name: "Backup & Disaster Recovery", level: 92, iconName: "DatabaseBackup", description: "Veeam, automated snapshot cycles, offsite replication" },
    ],
  },
  {
    title: "Tools & DevOps",
    tagline: "Continuous integration, version control, and team velocity",
    icon: "Wrench",
    skills: [
      { name: "Git & Version Control", level: 94, iconName: "GitBranch", description: "Branching strategies, interactive rebase, pull requests" },
      { name: "GitHub & Actions", level: 90, iconName: "Github", description: "Automated testing workflows, security alerts, secrets" },
      { name: "Jenkins CI/CD", level: 84, iconName: "Workflow", description: "Pipeline-as-code, automated builds, webhook triggers" },
      { name: "Jira & Agile Workflows", level: 90, iconName: "KanbanSquare", description: "Sprint tracking, incident management, sprint planning" },
      { name: "VS Code & Remote SSH", level: 95, iconName: "Code", description: "Container dev, remote server debugging, extensions" },
      { name: "Postman", level: 90, iconName: "Send", description: "REST test suites, mock servers, automated environment tests" },
    ],
  },
  {
    title: "Artificial Intelligence",
    tagline: "Next-generation LLMs, autonomous workflows, and AI pair-programming",
    icon: "BrainCircuit",
    skills: [
      { name: "ChatGPT & Prompt Architecture", level: 95, iconName: "Bot", description: "Few-shot prompting, code refactoring, context caching" },
      { name: "Claude (Anthropic)", level: 92, iconName: "Sparkles", description: "Complex system design analysis, architectural critique" },
      { name: "Google Gemini", level: 90, iconName: "Cpu", description: "Multimodal analysis, large context processing, intelligent pipelines" },
      { name: "GitHub Copilot", level: 94, iconName: "Terminal", description: "Accelerated development, unit testing synthesis" },
      { name: "AI Workflows & LLMs", level: 88, iconName: "Zap", description: "Agentic pipelines, auto-triaging, script generation" },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: "System Engineer",
    company: "Enterprise Technology Infrastructure",
    period: "2024 - Present (2.5+ Years Cumulative)",
    badge: "Current Role",
    description:
      "Spearheading end-to-end infrastructure reliability, network security boundaries, virtualization clusters, and automated provisioning systems across multi-site environments.",
    coreResponsibilities: [
      {
        title: "Security & Firewall Management",
        items: [
          "Configured stateful packet filtering, NAT translation rules, and IPS/IDS signature databases on enterprise firewalls.",
          "Established zero-trust site-to-site and client-to-site IPSec VPN tunnels for 150+ concurrent remote staff.",
          "Conducted periodic vulnerability assessments and patch deployment cycles to maintain 99.98% system uptime.",
        ],
      },
      {
        title: "Virtualization & Cloud Computing",
        items: [
          "Architected VMware ESXi and vCenter server clusters with dynamic vMotion and DRS load balancing.",
          "Orchestrated hybrid AWS cloud connectivity using AWS Site-to-Site VPN and Direct Connect integrations.",
          "Scripted VM deployment, snapshot retention, and storage allocation using PowerShell PowerCLI scripts.",
        ],
      },
      {
        title: "Active Directory, Backup & Asset Management",
        items: [
          "Managed enterprise Active Directory Domain Services (AD DS) including OU hierarchies, GPOs, and Kerberos auth.",
          "Engineered 3-2-1 backup strategy with Veeam and offsite encrypted storage, executing regular test restores.",
          "Maintained enterprise IT asset management pipelines, ensuring 100% compliance with hardware/software licenses.",
        ],
      },
      {
        title: "Routing & Switching Infrastructure",
        items: [
          "Configured Cisco L2/L3 Catalyst switches, implementing VLAN segmentation, 802.1Q trunking, and LACP EtherChannels.",
          "Optimized inter-VLAN routing and dynamic OSPF protocols to minimize latency across departmental subnets.",
          "Implemented 802.1X port security and MAC address limiting to thwart rogue endpoint connections.",
        ],
      },
    ],
    techStack: [
      "Cisco Catalyst",
      "VMware vSphere",
      "Windows Server 2022",
      "Active Directory",
      "AWS VPC/EC2",
      "PowerShell",
      "IPSec VPN",
      "Veeam Backup",
      "Linux RHEL",
      "Wireshark",
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "active-directory-aws",
    title: "Active Directory Management & AWS Cloud",
    subtitle: "Hybrid Identity & Cloud Provisioning Ecosystem",
    description:
      "Engineered an enterprise hybrid identity infrastructure integrating on-premises Active Directory Domain Services with AWS IAM & Directory Service. Enabled seamless federated single sign-on (SSO), dynamic Group Policy Object (GPO) propagation, and role-based access control (RBAC) across multi-account AWS environments.",
    metrics: [
      "99.99% Directory Availability",
      "Zero-Trust SSO Integration",
      "Dynamic RBAC Provisioning",
      "Sub-15ms Auth Latency",
    ],
    tags: ["Active Directory", "AWS Cloud", "PowerShell", "IAM & SSO", "Windows Server", "Security"],
    category: "Cloud & Identity",
    githubUrl: "https://github.com/repos?q=owner%3A%40me",
    liveUrl: "https://demo.ruban-infra.internal/ad-aws",
    gradient: "from-blue-600/30 via-indigo-600/20 to-purple-600/30",
    features: [
      "Seamless cross-account IAM role federation via SAML 2.0 and AWS IAM Identity Center.",
      "Custom PowerShell scripts executing scheduled audits on stale computer objects and inactive accounts.",
      "Fine-grained password policies and multi-factor authentication (MFA) enforcement across all privileged tiers.",
      "Real-time CloudWatch and Windows Event Log security telemetry forwarded to centralized SIEM.",
    ],
    architectureDetails:
      "The topology features dual-redundant on-prem domain controllers synchronized with an AWS Managed Microsoft AD instance via redundant IPSec VPN tunnels. AWS IAM Identity Center acts as the identity broker, mapping on-prem security groups directly to granular AWS IAM permission sets.",
  },
  {
    id: "vmware-virtualization",
    title: "VMware Virtualization Setup",
    subtitle: "High-Availability Cluster & Distributed Networking",
    description:
      "Designed and deployed a resilient VMware vSphere 8.0 cluster infrastructure powering 40+ mission-critical production virtual machines. Implemented VMware vSAN storage pools, Distributed Virtual Switches (vDS) with multi-NIC teaming, and automated vMotion migration triggers.",
    metrics: [
      "Zero Downtime Maintenance",
      "40+ Production VMs",
      "10GbE Network Fabric",
      "N+1 Cluster Redundancy",
    ],
    tags: ["VMware ESXi", "vCenter Server", "vSAN", "vMotion", "PowerCLI", "SAN / iSCSI"],
    category: "Virtualization",
    githubUrl: "https://github.com/repos?q=owner%3A%40me",
    liveUrl: "https://demo.ruban-infra.internal/vsphere-cluster",
    gradient: "from-purple-600/30 via-pink-600/20 to-indigo-600/30",
    features: [
      "vSphere High Availability (HA) and Distributed Resource Scheduler (DRS) rules tuned for peak loads.",
      "Resilient VM backup workflows using Veeam Backup & Replication with instant VM recovery capabilities.",
      "PowerCLI scripts for batch VM provisioning, snapshot hygiene, and ESXi host patch compliance.",
      "Isolated VMkernel networks for vMotion, Fault Tolerance, and storage traffic over redundant 10GbE uplinks.",
    ],
    architectureDetails:
      "Cluster of 3 Dell PowerEdge servers connected to an all-flash iSCSI SAN. Distributed switch utilizes LACP link aggregation with VLAN tagging, maintaining separate broadcast domains for management, storage, and VM production traffic.",
  },
  {
    id: "file-server-management",
    title: "File Server Management Infrastructure",
    subtitle: "Distributed File System & Tiered Storage Architecture",
    description:
      "Deployed a fault-tolerant, high-performance Windows Distributed File System (DFS) namespace architecture supporting 500+ corporate users. Implemented NTFS access-based enumeration, BitLocker volume encryption at rest, scheduled tiered snapshot cycles, and quota monitoring.",
    metrics: [
      "12TB Managed Storage",
      "Instant Shadow Copies",
      "AES-256 BitLocker Encrypted",
      "DFS Multi-Target Failover",
    ],
    tags: ["Windows Server", "DFS Namespace", "Storage Spaces Direct", "BitLocker", "Shadow Copies", "PowerShell"],
    category: "Storage & Systems",
    githubUrl: "https://github.com/repos?q=owner%3A%40me",
    liveUrl: "https://demo.ruban-infra.internal/dfs-storage",
    gradient: "from-cyan-600/30 via-teal-600/20 to-blue-600/30",
    features: [
      "Distributed File System (DFS) Replication engine synchronizing critical departments between primary and secondary sites.",
      "Volume Shadow Copy Service (VSS) configured with twice-daily restore points for self-service file recovery.",
      "File Server Resource Manager (FSRM) policies restricting unauthorized file types (.exe, .mp4) and auto-alerting quotas.",
      "PowerShell monitoring script sending real-time Discord/Slack webhooks when free space drops below 15%.",
    ],
    architectureDetails:
      "Dual Windows Server 2022 nodes configured in Storage Spaces Direct with active DFS namespaces. Access-based enumeration ensures employees only see folders they have verified permissions to view.",
  },
  {
    id: "small-office-network",
    title: "Small Office Network Design",
    subtitle: "Turnkey Cisco Network Architecture & Perimeter Security",
    description:
      "Architected and commissioned an end-to-end enterprise network topology for a multi-story office building. Configured Cisco Catalyst core and access switches with 802.1Q trunking, multi-VLAN segmentation, DHCP snooping, redundant dual-WAN ISP failover, and secure 802.1X wireless infrastructure.",
    metrics: [
      "Sub-Second WAN Failover",
      "6 Isolated VLANs",
      "802.1X Enterprise Security",
      "1Gbps Full Duplex Core",
    ],
    tags: ["Cisco Catalyst", "Cisco ASA", "VLANs", "OSPF / BGP", "IPSec VPN", "Wi-Fi 6 Enterprise"],
    category: "Networking",
    githubUrl: "https://github.com/repos?q=owner%3A%40me",
    liveUrl: "https://demo.ruban-infra.internal/network-topology",
    gradient: "from-emerald-600/30 via-cyan-600/20 to-blue-600/30",
    features: [
      "Network segmentation dividing Corporate, VoIP, Management, CCTV, Guest, and IoT into isolated VLANs.",
      "Cisco ASA firewall configured with stateful packet inspection, geo-IP blocking, and clientless SSL VPN.",
      "Spanning Tree Protocol (Rapid-PVST+) with PortFast and BPDU Guard enabled to eliminate layer 2 loops.",
      "Dual-WAN router with IP SLA health checks executing automatic dynamic failover during carrier outages.",
    ],
    architectureDetails:
      "Collapsed core network model featuring Cisco Catalyst 3850 core switch connected to 2960-X access switches via fiber optic SFP uplinks. Router-on-a-stick inter-VLAN routing on Cisco 4331 ISR router with Cisco ASA 5516-X perimeter security.",
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "it-support",
    title: "IT-SUPPORT",
    tagline: "24/7 Enterprise Systems Administration & Rapid Resolution",
    description:
      "Comprehensive end-to-end technical support for mission-critical enterprise environments. From hardware lifecycle management and OS deployment to Active Directory user provisioning and emergency disaster recovery.",
    features: [
      "Proactive system health monitoring & alerting",
      "Active Directory & Microsoft 365 identity management",
      "Centralized OS imaging and patch distribution",
      "Rapid turnaround ticket resolution with strict SLAs",
    ],
    icon: "Headphones",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
  },
  {
    id: "network-support",
    title: "Network Support",
    tagline: "High-Availability Architecture, Diagnostics & Routing",
    description:
      "Industrial-grade network engineering and troubleshooting. Specializing in Cisco routers, switches, enterprise firewalls, VLAN segmentation, VPN tunnels, and Wi-Fi 6 wireless performance tuning.",
    features: [
      "Cisco Catalyst & Nexus switch configuration",
      "Multi-VLAN, OSPF, and BGP routing optimization",
      "Site-to-site & remote-worker IPSec VPN setups",
      "Deep packet analysis with Wireshark to resolve bottlenecks",
    ],
    icon: "Network",
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
  },
  {
    id: "application-support",
    title: "Application Support",
    tagline: "Full-Stack Reliability, API Debugging & Uptime Assurance",
    description:
      "Bridge the gap between infrastructure and software. Ensuring web applications, relational databases, background workers, and RESTful microservices run at peak efficiency with zero unexpected downtime.",
    features: [
      "Database performance indexing and query profiling",
      "API payload debugging and endpoint health tracking",
      "Production log aggregation and crash report analytics",
      "CI/CD pipeline monitoring and release rollback protocols",
    ],
    icon: "AppWindow",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
  },
  {
    id: "website-development",
    title: "Website Development",
    tagline: "Apple & Stripe Caliber Frontend Architecture",
    description:
      "Crafting bespoke, high-performance web applications using Next.js App Router, React, TypeScript, and modern CSS motion frameworks. Designed for blinding speed, flawless responsiveness, and maximum conversion.",
    features: [
      "Next.js App Router with Server-Side Rendering (SSR)",
      "Fluid 60fps micro-interactions with Framer Motion",
      "Responsive layout engineering from mobile to 4K displays",
      "100/100 Lighthouse performance, SEO & WCAG accessibility",
    ],
    icon: "Globe",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
  },
  {
    id: "ai-systems-consulting",
    title: "AI Systems Consulting",
    tagline: "Intelligent Agent Pipelines & Autonomous Workflows",
    description:
      "Transforming repetitive manual processes into self-healing, intelligent workflows using Large Language Models (ChatGPT, Claude, Gemini) and custom scripting.",
    features: [
      "Custom AI agent design for IT triage & instant replies",
      "Integration of LLM APIs with internal company systems",
      "Intelligent log summarization and anomaly detection",
      "Prompt engineering and token cost optimization audits",
    ],
    icon: "Sparkles",
    gradient: "from-amber-500/20 via-purple-500/10 to-transparent",
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud & Infrastructure Solutions",
    tagline: "Hybrid Cloud Architecture & Virtualization Clusters",
    description:
      "Designing resilient hybrid cloud systems on AWS and VMware vSphere. Implementing Infrastructure as Code (IaC), zero-trust security boundaries, and automated snapshot retention pipelines.",
    features: [
      "VMware ESXi and vCenter cluster deployments",
      "AWS VPC, EC2, S3, and IAM policy architecture",
      "Resilient disaster recovery & immutable backup plans",
      "Comprehensive cloud cost reduction and security auditing",
    ],
    icon: "CloudCog",
    gradient: "from-emerald-500/20 via-cyan-500/10 to-transparent",
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "fortigate-7-6-operator",
    title: "FortiGate 7.6 Operator",
    issuer: "Fortinet Training Institute",
    date: "October 2026",
    credentialId: "FTI-76-RP-2026",
    category: "Security",
    status: "Verified",
    badgeText: "Official Certification",
    description:
      "Verified course completion and operational proficiency in FortiOS 7.6 firewall architectures, stateful traffic inspection, Next-Gen firewall policies, NAT modes, and clientless/tunnel SSL-VPN gateway deployments.",
    skills: ["FortiOS 7.6", "Next-Gen Firewall", "Stateful Inspection", "NAT / PAT", "SSL-VPN", "Security Profiles"],
    gradient: "from-red-600/25 via-rose-600/15 to-purple-600/20",
    verificationUrl: "/certificates/fortigate-7.6-operator.pdf",
  },
  {
    id: "cisco-routing-switching",
    title: "Cisco Routing & Switching Architecture",
    issuer: "Enterprise Implementation & CCNA Track",
    date: "2024 - 2026",
    category: "Networking",
    status: "Active",
    badgeText: "Enterprise Validated",
    description:
      "Hands-on production network engineering across Cisco Catalyst series switches and ISR routers: 802.1Q trunking, inter-VLAN routing, OSPF dynamic routing, spanning-tree loop mitigation (Rapid-PVST+), and 802.1X port security.",
    skills: ["Cisco Catalyst", "VLAN Segmentation", "OSPF / BGP", "802.1Q Trunking", "Rapid-PVST+", "Port Security"],
    gradient: "from-blue-600/25 via-cyan-600/15 to-indigo-600/20",
  },
  {
    id: "aws-hybrid-cloud",
    title: "AWS Cloud & Hybrid Identity Architecture",
    issuer: "AWS Enterprise Architecture Practice",
    date: "2024 - 2026",
    category: "Cloud",
    status: "Active",
    badgeText: "Hybrid Cloud Specialist",
    description:
      "Production deployment of AWS virtual infrastructure integrated with on-premises Active Directory. Implementing AWS IAM Identity Center (SSO), VPC Peering, Direct Connect / Site-to-Site IPSec VPNs, and least-privilege security policies.",
    skills: ["AWS VPC", "IAM Identity Center", "EC2 & S3", "IPSec Tunneling", "CloudWatch", "Hybrid AD DS"],
    gradient: "from-amber-600/25 via-indigo-600/15 to-purple-600/20",
  },
  {
    id: "btech-cse",
    title: "B.Tech in Computer Science & Engineering",
    issuer: "PKIET, Pondicherry University",
    date: "Graduated",
    category: "Education",
    status: "Completed",
    badgeText: "Bachelor Degree",
    description:
      "Formal engineering degree specializing in computer science, enterprise computer networks, operating system kernels, relational databases, data structures, and distributed systems architecture.",
    skills: ["Computer Networks", "Operating Systems", "Data Structures", "System Security", "Software Engineering"],
    gradient: "from-emerald-600/25 via-teal-600/15 to-blue-600/20",
  },
];
