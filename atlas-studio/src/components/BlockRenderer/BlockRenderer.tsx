import React from 'react';
import type { Block } from '@/types/blocks';
import Hero from '@/components/blocks/Hero/Hero';
import Features from '@/components/blocks/Features/Features';
import TextSection from '@/components/blocks/TextSection/TextSection';
import ContactForm from '@/components/blocks/ContactForm/ContactForm';
import CallToAction from '@/components/blocks/CallToAction/CallToAction';
import Testimonials from '@/components/blocks/Testimonials/Testimonials';
import ImageText from '@/components/blocks/ImageText/ImageText';
import Pricing from '@/components/blocks/Pricing/Pricing';
import ListSection from '@/components/blocks/ListSection/ListSection';
import Carousel from '@/components/blocks/Carousel/Carousel';

interface Props { block: Block }

const BlockRenderer: React.FC<Props> = ({ block }) => {
  switch (block.type) {
    case 'hero': return <Hero content={block.content}/>;
    case 'features': return <Features content={block.content}/>;
    case 'text': return <TextSection content={block.content}/>;
    case 'contact': return <ContactForm content={block.content}/>;
    case 'call-to-action': return <CallToAction content={block.content}/>;
    case 'testimonials': return <Testimonials content={block.content}/>;
    case 'image-text': return <ImageText content={block.content}/>;
    case 'pricing': return <Pricing content={block.content}/>;
    case 'list': return <ListSection content={block.content}/>;
    case 'carousel': return <Carousel idForButtons={block.id} content={block.content}/>;
    default: return <div className="card" style={{padding:'1rem'}}>Tipo de bloque no reconocido</div>;
  }
};

export default BlockRenderer;