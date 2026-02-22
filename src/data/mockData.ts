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
