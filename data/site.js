/*
  ============================================================
   SITE CONTENT  (edit this file to update the website)
  ============================================================
   Everything you see on the site comes from this one file.
   - Add a new project?      -> add an item to "projects"
   - New certification?      -> add an item to "certifications"
   - New blog post / note?   -> add an item to "posts" (newest first)
   - New job?                -> add an item to the top of "experience"
   Empty strings ("") are hidden automatically on the page.
   After editing, run:  .\scripts\release.ps1 -Bump patch -Message "what changed"
  ============================================================
*/
window.SITE = {
  version: "1.11.0",
  updated: "2026-11-20",

  profile: {
    name: "Abdullah Al Noman",
    fullName: "Abdullah Al Noman Patwary",
    handle: "alnoman",
    title: "Senior Cybersecurity Engineer",
    roles: [
      "Ethical Hacker",
      "Dark Web Researcher",
      "Senior Cybersecurity Engineer",
      "Penetration Tester (CPENT, CEH)",
      "SOC Architect & Threat Hunter",
      "AppSec & DevSecOps Engineer",
      "AI-Driven Security Builder"
    ],
    /* shown in the hero photo scan readout */
    specialty: "Offensive security, dark web intel",
    clearance: "CPENT / CEH / CCNP-S",
    /* skills shown as the LOADOUT meters in the hero (use the "short" names from skills) */
    loadout: ["Offensive", "Dark Web / CTI", "SOC", "AppSec", "DevSecOps", "AI Security"],
    location: "Dhaka, Bangladesh",
    tagline: "Ethical hacker and dark web researcher. I break into systems {{with written permission}}, hunt {{leaked credentials and data}} in places most people never go, and build the {{SOCs that catch attackers}}.",
    lead: "I build and run **security operations**, secure the software delivery pipeline with **AppSec and DevSecOps**, hunt on the **dark web** for what leaks, and use **AI agents** to make defenders faster. Twelve years across banks, fintech, government and research.",
    about: [
      "I am a security engineer with more than a decade across offensive and defensive security. I design and run Security Operations Centers end to end: log pipelines, detection rules, SOAR automation, incident response and the dashboards that tell the story.",
      "My roots are in networking and infrastructure (Cisco CCNP Security, Fortinet NSE, Microsoft, VMware). On the offensive side I started as an application security and VAPT engineer, and today I hold the EC-Council CPENT and CEH. Lately I build AI-driven security: agentic workflows, RAG and automation that make a SOC faster. On the engineering side I build DevSecOps pipelines that push SAST, SCA and container findings into one place so developers can actually fix them.",
      "I also hold an M.Sc. from Nanjing University of Science and Technology, where I researched fog, cloud and IoT security and published work such as FogAuthChain, a blockchain based authentication scheme. I keep researching and writing. I am working toward being a true cybersecurity all-rounder: SOC, AppSec, cloud, GRC, CTI and AI security."
    ],
    avatar: "assets/img/avatar.jpg",
    resume: "",
    email: "toalnoman@gmail.com",
    links: {
      github: "https://github.com/alnomanbd",
      linkedin: "https://www.linkedin.com/in/alnoman-cse/",
      scholar: "https://scholar.google.com/citations?user=be_4E7UAAAAJ&hl=en",
      twitter: "",
      tryhackme: "",
      hackthebox: "",
      medium: ""
    },
    /* small glowing chips under the tagline. color: amber | teal | coral | lilac | sky */
    chips: [
      { label: "Ethical Hacking", color: "coral" },
      { label: "Dark Web Research", color: "lilac" },
      { label: "Threat Intel", color: "sky" },
      { label: "SOC & Blue Team", color: "teal" },
      { label: "AppSec & DevSecOps", color: "amber" },
      { label: "AI-Driven Security", color: "lilac" }
    ]
  },

  /* scrolling "intel feed" under the hero: [tag, text]. These describe what I do, not live data. */
  ticker: [
    ["TOR", "hidden service recon and leak site monitoring"],
    ["OSINT", "mapping what a stranger can find about a target"],
    ["RED TEAM", "web, API and network exploitation with written permission"],
    ["CTI", "threat actor profiling and breach early warning"],
    ["SOC", "detections mapped to MITRE ATT&CK, alerts that matter"],
    ["DFIR", "triage, root cause analysis and containment"],
    ["APPSEC", "OWASP Top 10, secure code review, SAST and SCA"],
    ["AI SEC", "agentic SOC automation and LLM attack testing"]
  ],

  stats: [
    { value: 12, suffix: "+", label: "Years in industry", color: "amber" },
    { value: 209, suffix: "", label: "Research citations", color: "teal" },
    { value: 18, suffix: "", label: "Certifications", color: "lilac" },
    { value: 95, suffix: "+", label: "Handbook pages published", color: "coral" }
  ],

  now: [
    "Running and maturing a production SOC: Wazuh, TheHive, Cortex, MISP",
    "Pushing every SAST and SCA finding into DefectDojo for developers",
    "Dark web and threat intelligence research for early breach warning",
    "Building AI-driven SOC automation with agents, RAG and MCP",
    "Researching quantum security and post-quantum cryptography migration",
    "Kubernetes security on the CKA / CKS track",
    "Writing The Defensive Mind, an open SOC handbook"
  ],

  skills: [
    {
      group: "SOC & Detection Engineering",
      short: "SOC",
      color: "teal",
      level: 95,
      items: ["Wazuh", "Elastic / ELK", "Splunk", "IBM QRadar", "Sigma rules", "MITRE ATT&CK", "Use case design", "Log pipelines", "Dashboards"]
    },
    {
      group: "Incident Response & SOAR",
      short: "IR / SOAR",
      color: "lilac",
      level: 90,
      items: ["TheHive", "Cortex", "MISP", "n8n playbooks", "Triage", "Root cause analysis", "Threat hunting", "Forensics basics"]
    },
    {
      group: "Offensive Security & VAPT",
      short: "Offensive",
      color: "coral",
      level: 90,
      items: ["Web & API pentest", "Network pentest", "Burp Suite", "Nmap", "Metasploit", "sqlmap", "Nuclei", "Kali Linux", "Reporting"]
    },
    {
      group: "Application Security",
      short: "AppSec",
      color: "amber",
      level: 90,
      items: ["OWASP Top 10", "OWASP API Top 10", "Secure code review", "Threat modeling", "SAST / DAST", "API security", "PCI secure software", "Developer training"]
    },
    {
      group: "DevSecOps & CI/CD",
      short: "DevSecOps",
      color: "amber",
      level: 90,
      items: ["Jenkins", "GitHub Actions", "GitLab CI", "Azure DevOps", "SonarQube", "Dependency-Track", "DefectDojo", "Trivy", "Secrets scanning"]
    },
    {
      group: "Dark Web Research & Threat Intel",
      short: "Dark Web / CTI",
      color: "lilac",
      level: 86,
      items: ["Dark web monitoring", "Leak and breach hunting", "Threat actor profiling", "OSINT", "Tor / Whonix OPSEC", "MISP / STIX", "Threat feeds", "Intel reporting"],
      isNew: true
    },
    {
      group: "AI-Driven Security",
      short: "AI Security",
      color: "coral",
      level: 84,
      items: ["Agentic AI", "Agentic workflows", "RAG", "MCP", "LLM security testing", "AI SOC automation", "Prompt injection defense", "n8n + LLM"],
      isNew: true
    },
    {
      group: "Cloud & Kubernetes Security",
      short: "Cloud / K8s",
      color: "sky",
      level: 82,
      items: ["AWS", "Kubernetes (CKA / CKS track)", "Docker", "kube-bench", "Terraform", "Cloudflare WAF", "Linux hardening"]
    },
    {
      group: "Network & Infrastructure Security",
      short: "Network",
      color: "sky",
      level: 88,
      items: ["Cisco (CCNP Security)", "Fortinet (NSE)", "Firewalls", "VPN", "IDS / IPS", "Routing & switching", "Active Directory", "VMware"]
    },
    {
      group: "GRC & Security Awareness",
      short: "GRC",
      color: "teal",
      level: 82,
      items: ["ISO 27001", "PCI DSS", "SOC 2", "NIST CSF", "Risk assessment", "Policies & SOPs", "Audit prep", "Awareness programs"]
    }
  ],

  experience: [
    {
      role: "Senior Cybersecurity Engineer",
      org: "Synesis IT PLC",
      color: "amber",
      period: "Mar 2026 - Present",
      location: "Dhaka, Bangladesh",
      points: [
        "Designed, built and operate the company SOC: SIEM, detection rules, dashboards and on-call alerting.",
        "Built SOAR and threat intel automation that turns daily threat feeds into live blocklists.",
        "Run DevSecOps: SAST, SCA and container scanning pipelines feeding a central vulnerability platform.",
        "Lead VAPT on web, API and infrastructure, and handle incident response end to end."
      ],
      tags: ["SOC", "DevSecOps", "VAPT", "IR", "AI Automation"]
    },
    {
      role: "DevOps & DevSecOps Engineer",
      org: "United Commercial Bank PLC",
      color: "teal",
      period: "Mar 2025 - Feb 2026",
      location: "Dhaka, Bangladesh",
      points: [
        "Built and managed CI/CD pipelines with Jenkins, GitHub Actions, GitLab CI and Azure DevOps.",
        "Embedded security into the pipeline: SAST, SCA, secret scanning and container image checks.",
        "Automated build, test and release for banking applications in a regulated environment."
      ],
      tags: ["DevOps", "DevSecOps", "CI/CD", "Banking"]
    },
    {
      role: "Information Security Analyst",
      org: "Upay (UCB Fintech Company Limited)",
      color: "coral",
      period: "Aug 2021 - Mar 2025",
      location: "Dhaka, Bangladesh",
      points: [
        "Worked closely with core teams to mitigate threats and improve the security posture of a mobile financial service.",
        "Performed root cause analysis (RCA) for security incidents and drove the fixes.",
        "Security research, vulnerability assessment and cyber defense for fintech platforms."
      ],
      tags: ["Cyber Defense", "Fintech", "Incident Response", "Security Research"]
    },
    {
      role: "IT Consultant",
      org: "Bangladesh Coast Guard Headquarters",
      color: "sky",
      period: "May 2020 - Apr 2021",
      location: "Dhaka, Bangladesh",
      points: [
        "Architected and secured the Coast Guard Resource Planning Management System (CGRPMS).",
        "Source code reviews, secure coding practices and infrastructure hardening aligned with national government standards.",
        "Vulnerability assessment and penetration testing (VAPT) of the application and infrastructure."
      ],
      tags: ["VAPT", "Application Security", "Government"]
    },
    {
      role: "Research Assistant (M.Sc.)",
      org: "Nanjing University of Science and Technology",
      color: "lilac",
      period: "Aug 2016 - Nov 2019",
      location: "Nanjing, China",
      points: [
        "School of Computer Science: research in cloud, fog and IoT security.",
        "Designed FogAuthChain, a blockchain based location aware authentication scheme (Computer Communications, 82 citations).",
        "Published peer-reviewed papers and surveys with 200+ citations."
      ],
      tags: ["Research", "Fog Security", "Blockchain"]
    },
    {
      role: "Web Developer",
      org: "Creative IT Limited",
      color: "teal",
      period: "Feb 2014 - Apr 2016",
      location: "Dhaka, Bangladesh",
      points: [
        "Built secure-by-design dynamic web applications using PHP, MySQL and JavaScript.",
        "Conducted manual source code reviews and black-box security testing for enterprise client projects."
      ],
      tags: ["Web Development", "Secure Coding", "AppSec"]
    }
  ],

  education: [
    { degree: "Master of Science (MS), Computer Science and Engineering (Cyber Security)", school: "Nanjing University of Science and Technology, China", period: "Aug 2016 - Nov 2019", note: "Research in cloud, fog and IoT security, blockchain and cryptography, supervised by Prof. Anmin Fu" },
    { degree: "Bachelor of Science (BS), Computer Science and Engineering", school: "State University of Bangladesh", period: "Jan 2011 - Dec 2014", note: "Problem solving, competitive programming" },
    { degree: "Diploma, Computer Systems Networking and Telecommunications", school: "Daffodil Institute of IT", period: "2009 - 2010", note: "Networking, Linux system administration, software development" },
    { degree: "Higher Secondary Certificate (HSC), Science", school: "Kabi Nazrul Govt. College", period: "2006 - 2008", note: "" },
    { degree: "Secondary School Certificate (SSC), Science", school: "Hajigonj Pilot High School", period: "2004 - 2006", note: "" }
  ],

  /* status: "active" (valid now), "earned" (achieved, older), "in-progress" (studying)
     category is used for the filter buttons above the certificate grid */
  certifications: [
    { name: "Certified Penetration Testing Professional", short: "CPENT", issuer: "EC-Council", year: "2026", status: "active", category: "Offensive", url: "" },
    { name: "Threat Intelligence Fundamentals for SOC Analysts", short: "CTI", issuer: "SOCRadar", year: "2026", status: "active", category: "Threat Intel", url: "" },
    { name: "Fundamentals of Dark Web", short: "DARK", issuer: "SOCRadar", year: "2026", status: "active", category: "Threat Intel", url: "" },
    { name: "OWASP API Security Top 10", short: "API10", issuer: "APIsec University", year: "2024", status: "active", category: "AppSec", url: "" },
    { name: "API Security for PCI Compliance", short: "PCI", issuer: "APIsec University", year: "2024", status: "active", category: "AppSec", url: "" },
    { name: "API Security Fundamentals", short: "API", issuer: "APIsec University", year: "2024", status: "active", category: "AppSec", url: "" },
    { name: "Fortinet NSE 3: Certified Associate", short: "NSE3", issuer: "Fortinet", year: "2022", status: "earned", category: "Network", url: "" },
    { name: "Fortinet NSE 2: Certified Associate", short: "NSE2", issuer: "Fortinet", year: "2022", status: "earned", category: "Network", url: "" },
    { name: "Fortinet NSE 1: Certified Associate", short: "NSE1", issuer: "Fortinet", year: "2020", status: "earned", category: "Network", url: "" },
    { name: "Cisco Certified Network Professional Security (CCNP Security)", short: "CCNP", issuer: "Cisco", year: "2017", status: "earned", category: "Network", url: "" },
    { name: "Certified Ethical Hacker (CEH)", short: "CEH", issuer: "EC-Council", year: "2017", status: "earned", category: "Offensive", url: "" },
    { name: "VMware Certified Associate 6: Data Center Virtualization", short: "VCA6", issuer: "VMware", year: "2016", status: "earned", category: "Infrastructure", url: "" },
    { name: "Cisco Certified Network Associate Security (CCNA Security)", short: "CCNA-S", issuer: "Cisco", year: "2014", status: "earned", category: "Network", url: "" },
    { name: "Cisco Certified Network Associate Routing and Switching", short: "CCNA", issuer: "Cisco", year: "2011", status: "earned", category: "Network", url: "" },
    { name: "Security Certified Network Specialist (SCNS)", short: "SCNS", issuer: "DefensityOne", year: "2011", status: "earned", category: "Network", url: "" },
    { name: "Microsoft Certified IT Professional: Server 2008 Administrator", short: "MCITP", issuer: "Microsoft", year: "2011", status: "earned", category: "Infrastructure", url: "" },
    { name: "MCTS: Windows Server 2008 Active Directory Configuration", short: "MCTS", issuer: "Microsoft", year: "2011", status: "earned", category: "Infrastructure", url: "" },
    { name: "MCTS: Windows Server 2008 Network Infrastructure Configuration", short: "MCTS", issuer: "Microsoft", year: "2011", status: "earned", category: "Infrastructure", url: "" },
    { name: "Certified Kubernetes Administrator", short: "CKA", issuer: "CNCF / Linux Foundation", year: "", status: "in-progress", category: "Cloud", url: "" },
    { name: "Certified Kubernetes Security Specialist", short: "CKS", issuer: "CNCF / Linux Foundation", year: "", status: "in-progress", category: "Cloud", url: "" }
  ],

  /* status: "live" | "lab" | "wip" (in progress). color: amber | teal | coral | lilac | sky
     icon: shield skull code bolt cloud eye cpu net book layers radar pipe box bug users doc globe terminal lock
     featured: true makes the card twice as wide. "type" is used for the filter buttons. */
  projects: [
    {
      name: "The Defensive Mind",
      type: "Open Source",
      icon: "book",
      color: "amber",
      status: "live",
      desc: "A free, practical SOC handbook for any company: L1 to L3 field guides, incident response, 12 playbooks, detection engineering, SOAR, policies, labs and an 18 module training track. Published with MkDocs on GitHub Pages.",
      tags: ["SOC", "Blue Team", "MkDocs", "Training"],
      url: "https://alnomanbd.github.io/The-Defensive-Mind/",
      repo: "https://github.com/alnomanbd/The-Defensive-Mind",
      stats: [["95+", "pages"], ["12", "playbooks"], ["18", "training modules"]],
      featured: true
    },
    {
      name: "SOC in a Box",
      type: "Blue Team",
      icon: "shield",
      color: "teal",
      status: "live",
      desc: "Production SOC stack: Wazuh as SIEM, TheHive and Cortex for case management and enrichment, MISP for threat intel, wired together with automation for alerting.",
      tags: ["Wazuh", "TheHive", "Cortex", "MISP"],
      url: "",
      repo: ""
    },
    {
      name: "Wazuh Detection Pack",
      type: "Blue Team",
      icon: "radar",
      color: "sky",
      status: "live",
      desc: "Custom Wazuh rules and decoders mapped to MITRE ATT&CK, plus a staged set of executive and analyst dashboards for alerts, exposure and compliance.",
      tags: ["Wazuh", "Sigma", "MITRE ATT&CK", "Dashboards"],
      url: "",
      repo: ""
    },
    {
      name: "Threat Feed Automation",
      type: "Automation",
      icon: "bolt",
      color: "lilac",
      status: "live",
      desc: "Daily workflow that pulls public threat feeds, normalizes indicators and hot reloads them into SIEM lists, with alerts to Telegram and Slack.",
      tags: ["n8n", "CTI", "SOAR"],
      url: "",
      repo: ""
    },
    {
      name: "AppSec Pipeline",
      type: "DevSecOps",
      icon: "pipe",
      color: "amber",
      status: "live",
      desc: "Jenkins pipeline running SonarQube (SAST) and Dependency-Track (SCA), pushing every finding into DefectDojo with matching counts and archived raw reports.",
      tags: ["Jenkins", "SonarQube", "Dependency-Track", "DefectDojo"],
      url: "",
      repo: ""
    },
    {
      name: "VaultPay",
      type: "Offensive Lab",
      icon: "bug",
      color: "coral",
      status: "lab",
      desc: "Intentionally vulnerable fintech app (Node, Java, PostgreSQL) used for AppSec training. Each planted flaw is mapped to OWASP Top 10 2025 and demoed live, attack and fix.",
      tags: ["OWASP 2025", "AppSec Training", "Docker"],
      url: "",
      repo: ""
    },
    {
      name: "AI Assisted Pentest Lab",
      type: "Offensive Lab",
      icon: "terminal",
      color: "coral",
      status: "lab",
      desc: "Kali lab wired to an AI agent through MCP for recon and assessment workflows against intentionally vulnerable targets such as OWASP Juice Shop.",
      tags: ["Kali", "MCP", "AI Security"],
      url: "",
      repo: ""
    },
    {
      name: "Post-Quantum Crypto Lab",
      type: "Quantum Security",
      icon: "lock",
      color: "sky",
      status: "wip",
      desc: "Hands-on lab for post-quantum cryptography: ML-KEM and ML-DSA with liboqs and the OpenSSL oqs-provider, hybrid TLS handshakes, and performance compared with RSA and ECC.",
      tags: ["ML-KEM", "ML-DSA", "liboqs", "OpenSSL 3", "Hybrid TLS"],
      url: "",
      repo: ""
    },
    {
      name: "Sentinel",
      type: "AI Security",
      icon: "cpu",
      color: "lilac",
      status: "wip",
      desc: "AI security engineering project: building and attacking LLM apps, RAG pipelines and agents, then adding guardrails, evaluation and monitoring.",
      tags: ["LLM Security", "RAG", "Agents", "Guardrails"],
      url: "",
      repo: ""
    },
    {
      name: "Kubernetes Security Lab",
      type: "Cloud",
      icon: "box",
      color: "sky",
      status: "lab",
      desc: "Production style kubeadm cluster (HA control plane VIP, workers) for break and fix practice, CIS benchmarking and runtime security on the CKA / CKS track.",
      tags: ["Kubernetes", "CKS", "kube-bench"],
      url: "",
      repo: ""
    },
    {
      name: "Dark Web Intelligence Lab",
      type: "Threat Intel",
      icon: "globe",
      color: "teal",
      status: "lab",
      desc: "Isolated Whonix based research lab for passive dark web and CTI collection: leak site monitoring methods, OPSEC and intelligence reporting.",
      tags: ["CTI", "Whonix", "OSINT", "OPSEC"],
      url: "",
      repo: ""
    },
    {
      name: "Security Awareness Program",
      type: "Training",
      icon: "users",
      color: "amber",
      status: "live",
      desc: "Interactive awareness sessions such as 'How much can a stranger find about you?' on personal digital safety and OSINT, with live demos, games and handouts.",
      tags: ["Awareness", "OSINT", "Phishing", "Training"],
      url: "",
      repo: ""
    },
    {
      name: "Secure Developer Program",
      type: "Training",
      icon: "code",
      color: "teal",
      status: "live",
      desc: "Developer secure coding guide and hands-on lessons on reading SonarQube, Dependency-Track and DefectDojo findings and fixing them fast.",
      tags: ["Secure SDLC", "DevSecOps", "Training"],
      url: "",
      repo: ""
    },
    {
      name: "GRC Toolkit",
      type: "GRC",
      icon: "doc",
      color: "sky",
      status: "live",
      desc: "Ready to adapt document sets for ISO 27001 ISMS, PCI DSS, SOC 2 and NIST CSF: policies, procedures, registers, evidence trackers and audit prep.",
      tags: ["ISO 27001", "PCI DSS", "SOC 2", "NIST CSF"],
      url: "",
      repo: ""
    }
  ],

  research: {
    headline: "Peer-reviewed work on fog, cloud and IoT security,",
    summary: "Peer-reviewed research on fog, cloud and IoT security: authentication, access control, trust management and blockchain based defenses. Started during my M.Sc. at NJUST.",
    citations: 209,
    hIndex: 4,
    i10Index: 3,
    interests: ["Post-Quantum Cryptography", "Quantum Security", "Cyber Security", "Blockchain", "Fog Security", "Cloud Security", "IoT Security"],
    /* what I am researching right now (shown as the ACTIVE RESEARCH card) */
    current: {
      title: "Quantum Security and Post-Quantum Cryptography",
      status: "IN PROGRESS",
      summary: "How large quantum computers break today's public key cryptography, and how organisations can migrate safely before they do. I focus on the NIST post-quantum standards, hybrid key exchange, crypto-agility and the harvest now, decrypt later threat to long-lived data.",
      topics: ["FIPS 203 ML-KEM (Kyber)", "FIPS 204 ML-DSA (Dilithium)", "FIPS 205 SLH-DSA (SPHINCS+)", "Lattice-based cryptography", "Hybrid TLS key exchange", "Crypto inventory and agility", "Harvest now, decrypt later", "Quantum risk to PKI and VPNs"],
      working: [
        "Literature review of PQC migration and crypto-agility",
        "PQC readiness assessment framework for banks and fintech",
        "Lab: ML-KEM and ML-DSA with liboqs and the OpenSSL oqs-provider"
      ]
    },
    scholarUrl: "https://scholar.google.com/citations?user=be_4E7UAAAAJ&hl=en",
    papers: [
      { title: "FogAuthChain: A secure location-based authentication scheme in fog computing environments using Blockchain", venue: "Computer Communications, Vol. 162, pp. 212-224 (Elsevier)", year: "2020", cites: 82, url: "https://scholar.google.com/citations?user=be_4E7UAAAAJ&hl=en" },
      { title: "Towards secure fog computing: A survey on trust management, privacy, authentication, threats and access control", venue: "Electronics, 10(10), 1171 (MDPI)", year: "2021", cites: 71, url: "https://scholar.google.com/citations?user=be_4E7UAAAAJ&hl=en" },
      { title: "Authentication, access control, privacy, threats and trust management towards securing fog computing environments: A review", venue: "arXiv preprint arXiv:2003.00395", year: "2020", cites: 49, url: "https://arxiv.org/abs/2003.00395" },
      { title: "A detection approach for finding rogue fog node in fog computing environments", venue: "American Journal of Engineering Research, Vol. 8", year: "2019", cites: 7, url: "https://scholar.google.com/citations?user=be_4E7UAAAAJ&hl=en" }
    ]
  },

  posts: [
    { title: "How a SOC actually works day to day", date: "2026-11-05", tag: "SOC", url: "https://alnomanbd.github.io/The-Defensive-Mind/" },
    { title: "Incident response, the practical way", date: "2026-11-05", tag: "IR", url: "https://alnomanbd.github.io/The-Defensive-Mind/" },
    { title: "Writing detection rules that do not drown you", date: "2026-11-05", tag: "Detection", url: "https://alnomanbd.github.io/The-Defensive-Mind/" }
  ],

  arsenal: [
    "Wazuh", "Splunk", "QRadar", "Elastic", "Sigma", "YARA", "TheHive", "Cortex", "MISP", "n8n",
    "Burp Suite", "Nmap", "Metasploit", "sqlmap", "ffuf", "Nuclei", "ZAP", "Kali",
    "SonarQube", "Dependency-Track", "DefectDojo", "Trivy", "Jenkins",
    "AWS", "Kubernetes", "Docker", "Terraform", "Cloudflare", "Linux", "Python", "Bash", "PowerShell"
  ]
};
