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
  version: "1.0.0",
  updated: "2026-11-19",

  profile: {
    name: "Abdullah Al-Noman",
    fullName: "Abdullah Al-Noman Patwary",
    handle: "alnoman",
    title: "Senior Security Engineer",
    roles: [
      "Senior Security Engineer",
      "SOC Architect & Blue Teamer",
      "DevSecOps Engineer",
      "Penetration Tester (CPENT)",
      "Threat Intel & Dark Web Researcher",
      "Security Researcher"
    ],
    location: "Dhaka, Bangladesh",
    tagline: "I build SOCs, break applications on purpose and turn noisy logs into real alerts.",
    about: [
      "I am a security engineer with more than a decade across offensive and defensive security. I design and run Security Operations Centers end to end: log pipelines, detection rules, SOAR automation, incident response and the dashboards that tell the story.",
      "On the offensive side I started as an application security and VAPT engineer, and today I hold the EC-Council CPENT. On the engineering side I build DevSecOps pipelines that push SAST, SCA and container findings into one place so developers can actually fix them.",
      "I also hold an M.Sc. from Nanjing University of Science and Technology, where I researched fog, cloud and IoT security and published work such as FogAuthChain, a blockchain based authentication scheme. I keep researching and writing. I am working toward being a true cybersecurity all-rounder: SOC, AppSec, cloud, GRC, CTI and AI security."
    ],
    avatar: "assets/img/avatar.svg",
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
    }
  },

  stats: [
    { value: 12, suffix: "+", label: "Years in security" },
    { value: 209, suffix: "", label: "Research citations" },
    { value: 4, suffix: "", label: "h-index" },
    { value: 95, suffix: "+", label: "Handbook pages published" }
  ],

  now: [
    "Running and maturing a production SOC (Wazuh, TheHive, Cortex, MISP)",
    "Building an AppSec pipeline into DefectDojo",
    "Studying Kubernetes security (CKA / CKS track)",
    "Deep diving into dark web intelligence and CTI",
    "Writing The Defensive Mind, an open SOC handbook"
  ],

  skills: [
    {
      group: "SOC & Detection",
      icon: "shield",
      level: 95,
      items: ["Wazuh", "Elastic / ELK", "Splunk", "IBM QRadar", "Sigma", "MITRE ATT&CK", "Detection Engineering", "Log Pipelines"]
    },
    {
      group: "Offensive Security",
      icon: "skull",
      level: 88,
      items: ["Web & API Pentest", "Network Pentest", "Burp Suite", "Nmap", "Metasploit", "Kali Linux", "OWASP Top 10", "Report Writing"]
    },
    {
      group: "AppSec & DevSecOps",
      icon: "code",
      level: 90,
      items: ["SonarQube", "Dependency-Track", "DefectDojo", "Jenkins", "Trivy", "SAST / SCA / DAST", "Secure SDLC", "Threat Modeling"]
    },
    {
      group: "SOAR & Incident Response",
      icon: "bolt",
      level: 90,
      items: ["TheHive", "Cortex", "MISP", "n8n Automation", "Playbooks", "Triage", "Forensics Basics", "Threat Hunting"]
    },
    {
      group: "Cloud & Infrastructure",
      icon: "cloud",
      level: 80,
      items: ["AWS", "Kubernetes", "Docker", "Linux Hardening", "Cloudflare WAF", "Terraform", "Networking", "Bash / PowerShell"]
    },
    {
      group: "Threat Intel & GRC",
      icon: "eye",
      level: 82,
      items: ["OSINT", "Dark Web Monitoring", "Threat Feeds", "ISO 27001", "PCI DSS", "SOC 2", "NIST CSF", "Risk Assessment"]
    }
  ],

  experience: [
    {
      role: "Senior Security Engineer",
      org: "Synesis IT PLC",
      period: "Present",
      location: "Dhaka, Bangladesh",
      points: [
        "Designed, built and operate the company SOC: SIEM, detection rules, dashboards and on-call alerting.",
        "Built SOAR and threat intel automation that turns daily threat feeds into live blocklists.",
        "Run DevSecOps: SAST, SCA and container scanning pipelines feeding a central vulnerability platform.",
        "Lead VAPT on web, API and infrastructure, and handle incident response end to end."
      ],
      tags: ["SOC", "DevSecOps", "VAPT", "IR"]
    },
    {
      role: "Graduate Researcher (M.Sc.)",
      org: "Nanjing University of Science and Technology",
      period: "2016 - 2019",
      location: "Nanjing, China",
      points: [
        "Research in network and information security.",
        "Research Assistant, School of Computer Science: fog, cloud and IoT security.",
        "Designed FogAuthChain, a blockchain based location aware authentication scheme (Computer Communications, 82 citations).",
        "Published peer-reviewed papers and surveys with 200+ citations."
      ],
      tags: ["Research", "Network Security"]
    },
    {
      role: "Application Security & VAPT Engineer",
      org: "Creative IT",
      period: "2014 - 2016",
      location: "Bangladesh",
      points: [
        "Performed web application security assessments and penetration tests.",
        "Worked with developers to fix vulnerabilities and harden applications."
      ],
      tags: ["AppSec", "Pentest"]
    }
  ],

  education: [
    { degree: "M.Sc.", school: "Nanjing University of Science and Technology (NJUST)", period: "2016 - 2019", note: "Research in fog, cloud and IoT security, supervised by Prof. Anmin Fu" },
    { degree: "B.Sc.", school: "", period: "2011 - 2014", note: "" }
  ],

  certifications: [
    { name: "Certified Penetration Testing Professional", short: "CPENT", issuer: "EC-Council", year: "2026", status: "active", url: "" },
    { name: "Certified Kubernetes Administrator", short: "CKA", issuer: "CNCF / Linux Foundation", year: "", status: "in-progress", url: "" },
    { name: "Certified Kubernetes Security Specialist", short: "CKS", issuer: "CNCF / Linux Foundation", year: "", status: "in-progress", url: "" },
    { name: "AWS Security", short: "AWS", issuer: "Amazon Web Services", year: "", status: "in-progress", url: "" }
  ],

  projects: [
    {
      name: "The Defensive Mind",
      type: "Open Source Handbook",
      desc: "A free, practical SOC handbook for any company: L1 to L3 field guides, incident response, 12 playbooks, detection engineering, SOAR, policies, labs and an 18 module training track.",
      tags: ["SOC", "Blue Team", "MkDocs", "Training"],
      url: "https://alnomanbd.github.io/The-Defensive-Mind/",
      repo: "https://github.com/alnomanbd/The-Defensive-Mind",
      featured: true
    },
    {
      name: "SOC in a Box",
      type: "Architecture",
      desc: "Reference SOC stack with Wazuh as SIEM, TheHive and Cortex for case management, MISP for threat intel and automation glue for enrichment and notifications.",
      tags: ["Wazuh", "TheHive", "Cortex", "MISP"],
      url: "",
      repo: "",
      featured: true
    },
    {
      name: "Threat Feed Automation",
      type: "SOAR",
      desc: "Daily pipeline that pulls public threat feeds, normalizes indicators and hot reloads them into SIEM lists so detections stay current without manual work.",
      tags: ["n8n", "CTI", "Automation"],
      url: "",
      repo: "",
      featured: false
    },
    {
      name: "AppSec Pipeline",
      type: "DevSecOps",
      desc: "Jenkins pipeline running SonarQube (SAST) and Dependency-Track (SCA), pushing every finding into DefectDojo with matching counts and archived raw reports.",
      tags: ["Jenkins", "SonarQube", "DefectDojo"],
      url: "",
      repo: "",
      featured: false
    },
    {
      name: "Kubernetes Security Lab",
      type: "Lab",
      desc: "Production style kubeadm cluster (HA control plane VIP, workers) used for break and fix practice, CIS benchmarking and runtime security.",
      tags: ["Kubernetes", "CKS", "kube-bench"],
      url: "",
      repo: "",
      featured: false
    },
    {
      name: "AI Assisted Pentest Lab",
      type: "Offensive Lab",
      desc: "Kali based lab wired to an AI agent through MCP for recon and assessment workflows against intentionally vulnerable targets.",
      tags: ["Kali", "MCP", "AI Security"],
      url: "",
      repo: "",
      featured: false
    }
  ],

  research: {
    summary: "Peer-reviewed research on fog, cloud and IoT security: authentication, access control, trust management and blockchain based defenses. Started during my M.Sc. at NJUST.",
    citations: 209,
    hIndex: 4,
    i10Index: 3,
    interests: ["Cyber Security", "Blockchain", "Fog Security", "Cloud Security", "IoT Security"],
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
