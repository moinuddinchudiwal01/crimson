// Icon/Image type used across different entities
export interface Icon {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  created_at: string;
  updated_at: string;
}

// Subject Area Level 1
export interface SaLevelOne {
  id: number;
  created_at: string;
  updated_at: string;
  category: string;
  name: string;
  sortorder: number;
  status: boolean;
  slug: string;
  icon: Icon | null;
  banner: any;
}

// Subject Area Level 2
export interface SaLevelTwo {
  id: number;
  name: string;
  salevelone: number;
  created_at: string;
  updated_at: string;
  showinsubjectareapage: boolean;
  status: boolean;
  icon: Icon | null;
}

// Subject Area Level 3
export interface SaLevelThree {
  id: number;
  name: string;
  saleveltwo: number;
  created_at: string;
  updated_at: string;
  showinsubjectareapage: boolean;
  status: boolean;
  careers_current_opening: any;
  icon: Icon | null;
}

// Journal details
export interface Journal {
  id: number;
  title: string;
  articleinfluence?: number;
  authorguidelines?: string;
  crimsoniscore?: number;
  hirschindex?: number;
  issn?: string;
  impactfactor?: number;
  journalabbreviation?: string;
  journalreach?: string;
  journalwebsiteurl?: string;
  scicategory?: string;
  scopuscategory?: string;
  publishingcompany?: string;
  statementofscope?: string;
  salevelone?: number;
  journalsubjectarea?: string;
  created_at: string;
  updated_at: string;
  mediumofpublication?: string;
  showinhomepage: boolean;
  displaytitle: string | null;
  journalimage: any;
  journallogo: any;
}

// Publisher details
export interface Publisher {
  id: number;
  publishername: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  website: string | null;
  websitelink: string | null;
  altdisplaytext: string | null;
  logo: any;
}

// Service Type
export interface ServiceType {
  id: number;
  servicename: string;
  status: boolean;
  servicetype: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  testimonial: any;
  subtitle: string | null;
  description: string | null;
  tooltipinfo: string | null;
  b2bser: number;
  shortdescription: string | null;
  icon: Icon | null;
}

// Client details
export interface Client {
  id: number;
  memid: string;
  firstname: string;
  lastname: string;
  country: number;
  designation: string | null;
  organization: string;
  status: boolean;
  olddatainsertime: string;
  created_at: string;
  updated_at: string;
  generaltestimonial: any;
  identityconfidentiality: boolean;
  olddataclientimage: any;
  showinhomepage: boolean;
  firstname_regional: string;
  lastname_regional: string;
  clientimage_available: boolean;
  clientimage: any;
  organizationlogo: any;
}

// Main Research Paper interface
export interface ResearchPaper {
  id: number;
  assignmentno: string;
  salevelone: SaLevelOne | null;
  saleveltwo: SaLevelTwo | null;
  salevelthree: SaLevelThree | null;
  journal: Journal | null;
  articlelink: string;
  papertitle: string;
  coauthors: string;
  editorcode: string | null;
  identityconfidentiality: boolean;
  status: boolean;
  olddatainserttime: string;
  testimonial: any;
  showinhomepage: boolean;
  publisher: Publisher | null;
  journalaltimpactfactor: number;
  servicetype: ServiceType | null;
  publishername: string;
  journaldetails: string;
  client: Client | null;
  published_at: string;
  created_at: string;
  updated_at: string;
  tags: any[];
}

// Search and filter types
export type SearchCategory = 'all' | 'papertitle' | 'coauthors' | 'journal' | 'category' | 'publisher';

export type SortField = 'papertitle' | 'created_at' | 'impactfactor' | 'journalaltimpactfactor';

export type SortOrder = 'asc' | 'desc';