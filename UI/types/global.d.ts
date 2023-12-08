declare type TImage = {
  src: string;
  srcSet?: string;
  alt?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
};

declare type TLink = {
  href: string;
  label: string;
  target?: string;
  rel?: string;
};
