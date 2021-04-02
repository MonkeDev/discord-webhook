export default interface embedStructure {
  title?: string;
  type?: "rich" | "image" | "video" | "gifv" | "article" | "link";
  description?: string;
  url?: string;
  timestamp?: Date;
  color?: number;
  footer?: {
    text?: string;
    icon_url?: string;
    proxy_icon_url?: string;
  };
  image?: {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  };
  thumbnail?: {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  };
  video?: {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  };
  provider?: {
    name?: string;
    url?: string;
  };
  author?: {
    name?: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
  };
  fields?: Array<{
    name?: string;
    value?: string;
    inline?: boolean;
  }>;
}
