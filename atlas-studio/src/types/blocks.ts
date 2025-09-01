export type IconName =
    | 'rocket' | 'shield' | 'users' | 'star' | 'mail' | 'user' | 'quote' | 'image'
    | 'dollar-sign' | 'check' | 'list' | 'arrow-left' | 'arrow-right';


export interface BlockBase<T extends string, C> { id: string; type: T; content: C; }

export interface HeroContent { title?: string; subtitle?: string; buttonText?: string; backgroundImage?: string; }
export type HeroBlock = BlockBase<'hero', HeroContent>;

export interface Feature { icon: IconName; title: string; description: string; }
export interface FeaturesContent { title?: string; subtitle?: string; features?: Feature[]; }
export type FeaturesBlock = BlockBase<'features', FeaturesContent>;

export interface TextContent { title?: string; text?: string; }
export type TextBlock = BlockBase<'text', TextContent>;

export interface ContactContent { title?: string; subtitle?: string; }
export type ContactBlock = BlockBase<'contact', ContactContent>;

export interface CTAContent { title?: string; subtitle?: string; buttonText?: string; }
export type CTABlock = BlockBase<'call-to-action', CTAContent>;

export interface Testimonial { quote: string; author: string; role?: string; avatar?: string; }
export interface TestimonialsContent { title?: string; subtitle?: string; testimonials?: Testimonial[]; }
export type TestimonialsBlock = BlockBase<'testimonials', TestimonialsContent>;

export interface ImageTextContent { title?: string; text?: string; imageUrl?: string; imageAlt?: string; buttonText?: string; imageRight?: boolean; }
export type ImageTextBlock = BlockBase<'image-text', ImageTextContent>;

export interface Plan { name: string; price: string; frequency: string; features: string[]; buttonText: string; highlight?: boolean; }
export interface PricingContent { title?: string; subtitle?: string; plans?: Plan[]; }
export type PricingBlock = BlockBase<'pricing', PricingContent>;

export interface ListContent { title?: string; items?: string[]; }
export type ListBlock = BlockBase<'list', ListContent>;

export interface CarouselContent { title?: string; images?: string[]; }
export type CarouselBlock = BlockBase<'carousel', CarouselContent>;

export type Block =
    | HeroBlock | FeaturesBlock | TextBlock | ContactBlock | CTABlock
    | TestimonialsBlock | ImageTextBlock | PricingBlock | ListBlock | CarouselBlock;

export type BlockType = Block['type'];