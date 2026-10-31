
export enum AppStep {
  CATEGORY_SELECTION = 'CATEGORY_SELECTION',
  SUBCATEGORY_SELECTION = 'SUBCATEGORY_SELECTION',
  BRAND_SELECTION = 'BRAND_SELECTION',
  MODEL_SELECTION = 'MODEL_SELECTION',
  DETAILS_CHAT = 'DETAILS_CHAT',
  COMPARISON_VIEW = 'COMPARISON_VIEW'
}

export enum MainTab {
  COMPARATOR = 'COMPARATOR',
  NEWS = 'NEWS',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  LEGAL = 'LEGAL',
  PRIVACY = 'PRIVACY'
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  content: string;
  fullContent?: string; // HTML/Markdown for detailed view
  imageUrl?: string;
  hashtags: string[];
  linkedinUrl?: string;
  internalLink?: {
    type: 'MODEL' | 'BRAND' | 'SUBCATEGORY' | 'INFO_MODAL' | 'EXTERNAL' | '';
    id: string;
    label: string;
    categoryId?: string;
    subCategoryId?: string;
    brandId?: string;
    url?: string;
  };
}

export interface ProductDetails {
  presentation: string[];
  specs: { label: string; value: string }[];
  // Fix: Made options, pros, and cons optional to fix TS error in data.ts when data is incomplete
  options?: string[];
  pros?: string[];
  cons?: string[];
  colors?: { name: string; hex: string; border?: string; effect?: string }[];
}

export interface Model {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  manufacturerUrl?: string;
  details?: ProductDetails;

  isPediatric?: boolean;
  isBariatric?: boolean;
}


export interface Brand {
  id: string;
  name: string;
  models?: Model[];
}

export interface SubCategory {
  id: string;
  name: string;
  description?: string;
  brands?: Brand[];
  detailedInfo?: {
    title: string;
    content: string; // HTML/Markdown content
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subCategories: SubCategory[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}