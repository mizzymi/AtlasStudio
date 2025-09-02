export type IconName =
  | 'rocket' | 'shield' | 'users' | 'star' | 'mail' | 'user' | 'quote' | 'image'
  | 'dollar-sign' | 'check' | 'list' | 'arrow-left' | 'arrow-right';

export interface BlockBase<T extends string, C> { id: string; type: T; content: C; }

/** HERO */
export interface HeroContent {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  backgroundImage?: string;
  buttonUrl?: string; // enlace del botón
}
export type HeroBlock = BlockBase<'hero', HeroContent>;

/** FEATURES */
export interface Feature { icon: IconName; title: string; description: string; }
export interface FeaturesContent { title?: string; subtitle?: string; features?: Feature[]; }
export type FeaturesBlock = BlockBase<'features', FeaturesContent>;

/** TEXT */
export interface TextContent { title?: string; text?: string; }
export type TextBlock = BlockBase<'text', TextContent>;

/** CONTACT */
export interface ContactContent { title?: string; subtitle?: string; }
export type ContactBlock = BlockBase<'contact', ContactContent>;

/** CTA */
export interface CTAContent {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonUrl?: string; // enlace del botón
}
export type CTABlock = BlockBase<'call-to-action', CTAContent>;

/** TESTIMONIALS */
export interface Testimonial { quote: string; author: string; role?: string; avatar?: string; }
export interface TestimonialsContent { title?: string; subtitle?: string; testimonials?: Testimonial[]; }
export type TestimonialsBlock = BlockBase<'testimonials', TestimonialsContent>;

/** IMAGE + TEXT */
export interface ImageTextContent {
  title?: string;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
  buttonText?: string;
  imageRight?: boolean;
  buttonUrl?: string; // enlace del botón
}
export type ImageTextBlock = BlockBase<'image-text', ImageTextContent>;

/** PRICING */
export interface Plan {
  name: string;
  price: string;
  frequency: string;
  features: string[];
  buttonText: string;
  highlight?: boolean;
  buttonUrl?: string; // enlace del botón
}
export interface PricingContent { title?: string; subtitle?: string; plans?: Plan[]; }
export type PricingBlock = BlockBase<'pricing', PricingContent>;

/** LIST */
export interface ListContent { title?: string; items?: string[]; }
export type ListBlock = BlockBase<'list', ListContent>;

/** CAROUSEL */
export interface CarouselContent { title?: string; images?: string[]; }
export type CarouselBlock = BlockBase<'carousel', CarouselContent>;

export type Block =
  | HeroBlock | FeaturesBlock | TextBlock | ContactBlock | CTABlock
  | TestimonialsBlock | ImageTextBlock | PricingBlock | ListBlock | CarouselBlock;

export type BlockType = Block['type'];
