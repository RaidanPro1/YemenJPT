
export enum AiProviderType {
  LOCAL = 'LOCAL',
  CLOUD = 'CLOUD'
}

export enum ModuleCategory {
  OSINT = 'OSINT & Digital Research',
  SOCIAL_MEDIA = 'Public Opinion Analysis',
  VERIFICATION = 'Digital Forensics',
  AI_CORE = 'Sovereign AI Processor',
  GEOSPATIAL = 'Geospatial Monitoring',
  MONITORING = 'News Monitoring',
  ARCHIVING = 'Sovereign Archiving',
  COLLABORATION = 'Newsroom Collaboration',
  ADMIN = 'System Administration',
  AUTOMATION = 'Workflow Automation',
  OBSERVATORY = 'Violations Observatory',
  FACT_CHECK = 'Fact-Checking Unit',
  ACADEMY = 'Media Academy',
  FINANCIAL = 'Financial & Data Journalism',
  INDICATOR_LAB = 'Indicator Lab (Early Warning)',
  ORG_MGMT = 'Organizational Management',
  PRODUCTIVITY = 'Productivity & Workflow',
  CMS = 'Content Publishing (CMS)',
  SYSTEM_MGMT = 'System & Content Management'
}

export enum TenantType {
  ORGANIZATION = 'organization',
  FREELANCER = 'freelancer'
}

export enum TenantStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  PROVISIONING = 'provisioning'
}

export enum UserRole {
  ADMIN = 'Root Admin',
  EDITOR_CHIEF = 'Editor-in-Chief',
  MONITOR = 'Violation Monitor',
  TRAINER = 'Academy Trainer',
  ANALYST = 'Data Analyst',
  VERIFIER = 'Fact Verifier',
  JOURNALIST = 'Investigative Journalist',
  GUEST = 'Guest/Trial'
}

export enum UserStatus {
  APPROVED = 'Approved',
  PENDING = 'Pending',
  REJECTED = 'Rejected'
}

export enum AiModelType {
  FALCON_3 = 'Falcon 3 (Sovereign Arabic)',
  JAIS = 'Jais (Arabic Native)',
  QWEN_3 = 'Qwen 3 (Reasoning Core)',
  LLAMA_3_1 = 'Llama 3.1 (Global)',
  GEMINI_2_5 = 'Gemini 2.5 Flash (Cloud)',
  GEMINI_PRO = 'Gemini 3 Pro (Cloud)',
  WHISPER_YEMEN = 'Munsit (Yemeni Whisper)'
}

// Added ViolationStatus enum for the observatory module
export enum ViolationStatus {
  PENDING = 'قيد التحقق',
  VERIFIED = 'مؤكد',
  ARCHIVED = 'مؤرشف'
}

export interface TenantResourceQuota {
  cpuLimit: number; // Cores
  ramLimit: number; // GB
  storageLimit: number; // GB
  apiTokenLimit: number; 
  activeUsersLimit: number;
}

export interface TenantResourceUsage {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
  apiTokensUsed: number;
  activeUsers: number;
}

export interface TenantSite {
  id: string;
  siteUrl: string;
  type: 'wordpress' | 'ghost' | 'portfolio';
  status: 'active' | 'maintenance' | 'deploying' | 'error';
  wpVersion?: string;
  dbName?: string;
  cloudflareStatus: 'synced' | 'pending' | 'error';
  lastHealthCheck?: number;
}

export interface TenantPortal {
  id: string;
  name: string;
  subdomain: string;
  type: 'yemenjpt' | 'mail' | 'vault' | 'newsroom';
  isEnabled: boolean;
}

export interface ApiVaultItem {
  id: string;
  serviceName: string;
  apiKeyPreview: string; // "sk-...abcd"
  isEnabled: boolean;
  usageCount: number;
}

export interface Organization extends Tenant {
  sites: TenantSite[];
  portals: TenantPortal[];
  apiVault: ApiVaultItem[];
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  type: TenantType;
  status: TenantStatus;
  primaryDomain: string;
  quota: TenantResourceQuota;
  usage: TenantResourceUsage;
  socialLinks: SocialMediaLink[];
  createdAt: number;
}

export interface SocialMediaLink {
  id: string;
  platform: 'facebook' | 'twitter' | 'telegram' | 'youtube';
  handle: string;
  status: 'connected' | 'expired' | 'error';
  tokenExpiresAt?: number;
}

// Updated User interface to include usage metrics and limits
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  tenantId?: string;
  status: UserStatus;
  oauthConnected?: boolean;
  usage?: {
    cpu: number;
    ram: number;
    storage: number;
    apiTokens: number;
    cpuLimit: number;
    ramLimit: number;
    storageLimit: number;
    apiLimit: number;
  };
}

export interface ServiceTool {
  id: string;
  name: string;
  category: ModuleCategory;
  description: string;
  status: 'online' | 'offline' | 'provisioning' | 'error';
  icon: string;
  isCustomizable: boolean;
  isSovereign: boolean;
  configSchema?: any;
  currentSettings?: Record<string, any>;
}

export interface TrainingFeedback {
  id: string;
  inputData: any;
  aiPrediction: any;
  humanCorrection: any;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: number;
}

export interface TrainingJob {
  id: string;
  targetModel: string;
  dataset: string;
  status: 'queued' | 'training' | 'validating' | 'completed' | 'failed';
  progress: number;
  createdAt: number;
}

export interface ModelVersion {
  id: string;
  version: string;
  baseModel: AiModelType;
  isActive: boolean;
  accuracy: number;
  createdAt: number;
}

// Added Course interface for the Academy module
export interface Course {
  id: string;
  title: string;
  trainer: string;
  duration: string;
  level: string;
  enrolled: number;
  image: string;
  hasCertificate: boolean;
}

// Added Task interface for Collaboration module
export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  assignee?: string;
}

// Added Comment interface for file/task discussions
export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: number;
}

// Added PublicationRecord interface for tracking content publishing
export interface PublicationRecord {
  id: string;
  platform: string;
  url: string;
  status: string;
}

// Added SharedFile interface for the Newsroom Collaboration module
export interface SharedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  owner: string;
  updatedAt: string;
  comments: number;
  timestamp: number;
  organizationId: string;
  folderId: string;
  commentsList?: Comment[];
  publications?: PublicationRecord[];
}

// Added Folder interface for organizing newsroom content
export interface Folder {
  id: string;
  name: string;
}

// Added SortOption type for list sorting
export type SortOption = 'name' | 'date' | 'size';

export interface GeminiConfig {
  accessToken?: string;
  specificModel?: AiModelType;
  lowLatency?: boolean;
  dialect?: string;
  useColabGpu?: boolean;
  useSearch?: boolean;
  isCodeAssistant?: boolean;
  useThinking?: boolean;
  thinkingBudget?: number;
}
