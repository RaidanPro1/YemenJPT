
export enum AiProviderType {
  LOCAL = 'LOCAL',
  CLOUD = 'CLOUD'
}

export enum ModuleCategory {
  OSINT = 'OSINT & Digital Research',
  AI_CORE = 'Sovereign AI Processor',
  VERIFICATION = 'Digital Forensics',
  GEOSPATIAL = 'Geospatial Monitoring',
  MONITORING = 'News Monitoring',
  ARCHIVING = 'Sovereign Archiving',
  COLLABORATION = 'Newsroom Collaboration',
  ADMIN = 'System Administration',
  FINANCIAL = 'Financial & Data Journalism',
  CMS = 'Content Publishing (CMS)',
  SECURITY = 'Security & Identity',
  ACADEMY = 'The Academy',
  OBSERVATORY = 'Press House Observatory'
}

export enum TenantStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  PROVISIONING = 'provisioning'
}

export enum UserRole {
  ADMIN = 'Root Admin',
  EDITOR_CHIEF = 'Editor-in-Chief',
  JOURNALIST = 'Investigative Journalist'
}

export enum UserStatus {
  APPROVED = 'Approved',
  PENDING = 'Pending'
}

export enum AiModelType {
  FALCON_3 = 'Falcon 3 (Sovereign Arabic)',
  GEMINI_3_PRO = 'Gemini 3 Pro (Cloud)'
}

export interface GlobalSettings {
  brandName: string;
  logoUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  footerText: string;
  primaryColor: string;
  whatsappNumber: string;
}

export interface SeoMetadata {
  id: string;
  route: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
}

export interface AuthProviderConfig {
  name: 'google' | 'facebook';
  isEnabled: boolean;
  clientId: string;
  clientSecret: string;
}

export interface SecuritySettings {
  isPanicModeActive: boolean;
  authProviders: AuthProviderConfig[];
}

export interface TrainingFeedback {
  id: string;
  inputData: string;
  aiPrediction: string;
  humanCorrection: string;
  status: 'pending' | 'approved' | 'discarded';
  timestamp: number;
}

// Added missing TenantType enum
export enum TenantType {
  INDIVIDUAL = 'individual',
  ORGANIZATION = 'organization'
}

// Added missing TenantSite interface
export interface TenantSite {
  id: string;
  siteUrl: string;
  type: string;
  status: string;
  wpVersion: string;
  dbName: string;
  cloudflareStatus: string;
}

// Added missing TenantPortal interface
export interface TenantPortal {
  id: string;
  name: string;
  subdomain: string;
  type: string;
  isEnabled: boolean;
}

// Added missing ApiVaultItem interface
export interface ApiVaultItem {
  id: string;
  serviceName: string;
  apiKeyPreview: string;
  isEnabled: boolean;
  usageCount: number;
}

// Expanded Organization interface to support AdminPage and AdminTenants requirements
export interface Organization {
  id: string;
  name: string;
  domain: string;
  primaryDomain?: string;
  slug?: string;
  type?: TenantType;
  status: TenantStatus;
  createdAt?: number;
  quota?: {
    cpuLimit: number;
    ramLimit: number;
    storageLimit: number;
    apiTokenLimit: number;
    activeUsersLimit: number;
  };
  usage: {
    cpu: number;
    ram: number;
    storage: number;
    cpuUsage?: number;
    ramUsage?: number;
    storageUsage?: number;
    apiTokensUsed?: number;
    activeUsers?: number;
  };
  services: string[];
  sites?: TenantSite[];
  portals?: TenantPortal[];
  apiVault?: ApiVaultItem[];
  socialLinks?: { id: string; platform: string; handle: string; status: string }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  status: UserStatus;
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
  configSchema?: any;
}

// Added missing GeminiConfig interface
export interface GeminiConfig {
  accessToken?: string;
  specificModel?: string;
  lowLatency?: boolean;
  dialect?: string;
  useColabGpu?: boolean;
  useSearch?: boolean;
  useThinking?: boolean;
  thinkingBudget?: number;
  isCodeAssistant?: boolean;
}

// Added missing Collaboration related types
export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: number;
}

export interface PublicationRecord {
  id: string;
}

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
  commentsList: Comment[];
  publications: PublicationRecord[];
}

export interface Task {
  id: string;
  title: string;
  status: string;
}

export enum SortOption {
  NEWEST = 'newest',
  OLDEST = 'oldest'
}

export interface Folder {
  id: string;
  name: string;
}

// Added missing ViolationStatus enum
export enum ViolationStatus {
  PENDING = 'قيد التحقق',
  VERIFIED = 'مؤكد',
  ARCHIVED = 'مؤرشف'
}

// Added missing Course interface
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
