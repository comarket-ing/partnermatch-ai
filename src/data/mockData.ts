export interface MetricCard {
  label: string;
  value: string;
  change: string;
  changeType: "up" | "down" | "neutral";
  subtitle: string;
}

export interface PartnerCandidate {
  id: string;
  name: string;
  logo: string;
  industry: string;
  matchScore: number;
  sharedTech: string[];
  description: string;
  employees: string;
  funding: string;
  hiringSignals: string[];
  website: string;
  overlapAccounts: number;
}

export interface MappingCell {
  userPopulation: string;
  partnerPopulation: string;
  count: number;
}

export const dashboardMetrics: MetricCard[] = [
  {
    label: "Partner-Influenced Revenue",
    value: "$284,500",
    change: "+18.2%",
    changeType: "up",
    subtitle: "vs. last quarter",
  },
  {
    label: "New Integrations Found",
    value: "23",
    change: "+7",
    changeType: "up",
    subtitle: "this month",
  },
  {
    label: "Active Collaborations",
    value: "8",
    change: "+2",
    changeType: "up",
    subtitle: "in progress",
  },
  {
    label: "Avg. Match Score",
    value: "74",
    change: "+5pts",
    changeType: "up",
    subtitle: "across pipeline",
  },
  {
    label: "Intro Requests Sent",
    value: "31",
    change: "12 pending",
    changeType: "neutral",
    subtitle: "this quarter",
  },
  {
    label: "Partner-Sourced Deals",
    value: "14",
    change: "+4",
    changeType: "up",
    subtitle: "in pipeline",
  },
];

export const partnerCandidates: PartnerCandidate[] = [
  {
    id: "1",
    name: "DataForge Analytics",
    logo: "DF",
    industry: "Business Intelligence",
    matchScore: 92,
    sharedTech: ["Snowflake", "dbt", "Looker"],
    description: "Enterprise BI platform helping mid-market companies transform raw data into actionable insights.",
    employees: "120–200",
    funding: "Series B · $45M",
    hiringSignals: ["Hiring 3 AEs", "New VP Partnerships role"],
    website: "dataforge.io",
    overlapAccounts: 34,
  },
  {
    id: "2",
    name: "CloudSync Pro",
    logo: "CS",
    industry: "Integration Platform",
    matchScore: 87,
    sharedTech: ["Salesforce", "HubSpot", "Zapier"],
    description: "iPaaS solution connecting 200+ SaaS tools for seamless data synchronization across the stack.",
    employees: "80–120",
    funding: "Series A · $22M",
    hiringSignals: ["Expanding to EMEA"],
    website: "cloudsyncpro.com",
    overlapAccounts: 28,
  },
  {
    id: "3",
    name: "RevOps Central",
    logo: "RC",
    industry: "Revenue Operations",
    matchScore: 79,
    sharedTech: ["Salesforce", "Gong", "Outreach"],
    description: "Revenue intelligence platform unifying sales, marketing, and CS data for predictable growth.",
    employees: "50–80",
    funding: "Series A · $18M",
    hiringSignals: ["Hiring Head of Alliances"],
    website: "revopscentral.com",
    overlapAccounts: 19,
  },
  {
    id: "4",
    name: "SecureVault AI",
    logo: "SV",
    industry: "Cybersecurity",
    matchScore: 71,
    sharedTech: ["AWS", "Okta", "Datadog"],
    description: "AI-powered threat detection for cloud-native applications, serving the mid-market segment.",
    employees: "200–350",
    funding: "Series C · $80M",
    hiringSignals: ["Opening Tokyo office", "Hiring 5 SDRs"],
    website: "securevault.ai",
    overlapAccounts: 22,
  },
  {
    id: "5",
    name: "Onboard.ly",
    logo: "OB",
    industry: "Customer Success",
    matchScore: 65,
    sharedTech: ["Intercom", "Segment", "Amplitude"],
    description: "Digital adoption platform that reduces time-to-value for SaaS onboarding workflows.",
    employees: "30–50",
    funding: "Seed · $6M",
    hiringSignals: ["Launched partner program"],
    website: "onboard.ly",
    overlapAccounts: 11,
  },
  {
    id: "6",
    name: "PipelineHQ",
    logo: "PH",
    industry: "Sales Enablement",
    matchScore: 58,
    sharedTech: ["Salesforce", "Slack", "Notion"],
    description: "Sales enablement suite with content management, coaching, and deal intelligence for B2B teams.",
    employees: "150–250",
    funding: "Series B · $38M",
    hiringSignals: [],
    website: "pipelinehq.com",
    overlapAccounts: 8,
  },
];

export const mappingData: MappingCell[] = [
  { userPopulation: "Prospects", partnerPopulation: "Customers", count: 14 },
  { userPopulation: "Prospects", partnerPopulation: "Prospects", count: 8 },
  { userPopulation: "Prospects", partnerPopulation: "Open Deals", count: 3 },
  { userPopulation: "Customers", partnerPopulation: "Customers", count: 22 },
  { userPopulation: "Customers", partnerPopulation: "Prospects", count: 11 },
  { userPopulation: "Customers", partnerPopulation: "Open Deals", count: 5 },
  { userPopulation: "Open Deals", partnerPopulation: "Customers", count: 7 },
  { userPopulation: "Open Deals", partnerPopulation: "Prospects", count: 4 },
  { userPopulation: "Open Deals", partnerPopulation: "Open Deals", count: 2 },
];

// ── Agreement Templates & Agreements ──

export type AgreementStatus = "draft" | "pending_review" | "sent" | "signed" | "expired";

export interface AgreementTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  clausesCount: number;
  lastUpdated: string;
  popularity: number; // 0-100
}

export interface Agreement {
  id: string;
  templateId: string;
  templateTitle: string;
  partnerName: string;
  title: string;
  status: AgreementStatus;
  createdAt: string;
  sentAt?: string;
  signedAt?: string;
  expiresAt?: string;
}

export const agreementTemplates: AgreementTemplate[] = [
  {
    id: "tpl-1",
    title: "Co-Webinar Partnership",
    category: "Co-Webinar",
    description: "Joint webinar hosting agreement covering promotion responsibilities, lead sharing, and content ownership.",
    clausesCount: 12,
    lastUpdated: "2025-12-10",
    popularity: 94,
  },
  {
    id: "tpl-2",
    title: "Content Swap Agreement",
    category: "Content Swap",
    description: "Mutual guest-posting and content co-creation agreement with editorial guidelines and attribution rules.",
    clausesCount: 9,
    lastUpdated: "2025-11-28",
    popularity: 78,
  },
  {
    id: "tpl-3",
    title: "Lead Sharing Framework",
    category: "Lead Sharing",
    description: "Bi-directional lead referral agreement with qualification criteria, SLAs, and revenue attribution model.",
    clausesCount: 15,
    lastUpdated: "2026-01-05",
    popularity: 87,
  },
  {
    id: "tpl-4",
    title: "Joint Case Study",
    category: "Co-Marketing",
    description: "Agreement for co-producing a customer success story including approval workflows and distribution rights.",
    clausesCount: 8,
    lastUpdated: "2026-02-01",
    popularity: 65,
  },
];

export const agreements: Agreement[] = [
  {
    id: "agr-1",
    templateId: "tpl-1",
    templateTitle: "Co-Webinar Partnership",
    partnerName: "DataForge Analytics",
    title: "Q1 2026 Joint Webinar Series",
    status: "signed",
    createdAt: "2025-12-15",
    sentAt: "2025-12-16",
    signedAt: "2025-12-20",
    expiresAt: "2026-06-30",
  },
  {
    id: "agr-2",
    templateId: "tpl-3",
    templateTitle: "Lead Sharing Framework",
    partnerName: "CloudSync Pro",
    title: "Bi-Directional Lead Referral — CS×CM",
    status: "sent",
    createdAt: "2026-01-10",
    sentAt: "2026-01-11",
    expiresAt: "2026-07-10",
  },
  {
    id: "agr-3",
    templateId: "tpl-2",
    templateTitle: "Content Swap Agreement",
    partnerName: "RevOps Central",
    title: "Blog & Newsletter Content Exchange",
    status: "pending_review",
    createdAt: "2026-02-01",
  },
  {
    id: "agr-4",
    templateId: "tpl-4",
    templateTitle: "Joint Case Study",
    partnerName: "SecureVault AI",
    title: "Enterprise Security Case Study",
    status: "draft",
    createdAt: "2026-02-18",
  },
  {
    id: "agr-5",
    templateId: "tpl-1",
    templateTitle: "Co-Webinar Partnership",
    partnerName: "Onboard.ly",
    title: "Onboarding Best Practices Webinar",
    status: "expired",
    createdAt: "2025-06-01",
    sentAt: "2025-06-02",
    signedAt: "2025-06-05",
    expiresAt: "2025-12-01",
  },
];
