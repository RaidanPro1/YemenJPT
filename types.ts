
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
  ACADEMY = 'Media Academy'
}

export enum CmsType {
  WORDPRESS = 'WordPress',
  JOOMLA = 'Joomla',
  TYPO3 = 'Typo3'
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

export enum AiModelType {
  FALCON_3 = 'Falcon 3 (Sovereign Arabic)',
  JAIS = 'Jais (Arabic Native)',
  QWEN_3 = 'Qwen 3 (Reasoning Core)',
  LLAMA_3_1 = 'Llama 3.1 (Global)',
  GEMINI_2_5 = 'Gemini 2.5 Flash (Cloud)',
  GEMINI_PRO = 'Gemini 3 Pro (Cloud)',
  WHISPER_YEMEN = 'Munsit (Yemeni Whisper)'
}

export enum UserStatus {
  APPROVED = 'Approved',
  PENDING = 'Pending',
  REJECTED = 'Rejected'
}

export enum ViolationStatus {
  PENDING = 'Pending',
  VERIFIED = 'Verified',
  ARCHIVED = 'Archived'
}

// Added missing ServiceTool interface
export interface ServiceTool {
  id: string;
  name: string;
  category: ModuleCategory;
  description: string;
  status: 'online' | 'offline';
  icon: string;
  isCustomizable: boolean;
  isSovereign: boolean;
  cpuLimit?: number;
  ramLimit?: number;
  storageLimit?: number;
  cpuUsage?: number;
  ramUsage?: number;
  storageUsage?: number;
}

// Added missing Message interface for AI Core
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Added missing Comment interface for Collaboration
export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: number;
}

// Added missing Folder interface for Collaboration
export interface Folder {
  id: string;
  name: string;
  icon: string;
}

// Added missing SortOption type
export type SortOption = 'name' | 'date' | 'size';

// Added missing Organization sub-interfaces
export interface Site {
  id: string;
  domain: string;
  cms: CmsType;
  status: 'active' | 'inactive';
}

export interface SocialAccount {
  platform: string;
  handle: string;
  status: 'connected' | 'disconnected';
}

// Added missing Organization interface for Admin
export interface Organization {
  id: string;
  name: string;
  primaryDomain: string;
  subDomain?: string; // YemenJPT sub-portal domain
  emailServiceEnabled: boolean;
  emailServiceStatus: 'active' | 'inactive';
  allowedTools: string[];
  sites: Site[];
  socialAccounts: SocialAccount[];
  usage: UsageStats;
  config: {
    primaryModel: AiModelType;
    cloudflareZoneId: string;
  };
}

export interface Violation {
  id: string;
  title: string;
  type: string;
  governorate: string;
  violator: string;
  date: string;
  description: string;
  status: ViolationStatus;
  evidenceCount: number;
}

export interface FactCheck {
  id: string;
  claim: string;
  source: string;
  result: 'true' | 'false' | 'misleading' | 'context' | 'satire';
  analysis: string;
  verifiedBy: string;
  date: string;
}

export interface Course {
  id: string;
  title: string;
  trainer: string;
  startDate: string;
  endDate: string;
  mode: 'online' | 'offline' | 'hybrid';
  enrolled: number;
}

export interface UsageStats {
  cpu: number;
  ram: number;
  storage: number;
  apiTokens: number;
  cpuLimit: number;
  ramLimit: number;
  storageLimit: number;
  apiLimit: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  organizationId?: string;
  status: UserStatus;
  usage: UsageStats;
}

export interface SharedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  owner: string;
  folderId: string;
  timestamp: number;
  comments: number;
  updatedAt?: string;
  organizationId?: string;
  sizeValue?: number; // Added missing property
  commentsList?: Comment[]; // Added missing property
}

export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  organizationId?: string; // Added missing property
}
