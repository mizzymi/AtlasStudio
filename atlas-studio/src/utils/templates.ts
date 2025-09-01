import type { Block } from '@/types/blocks';

export const defaultTemplates: { id: string; name: string; preview?: string; blocks: Omit<Block, 'id'>[] }[] = [
  {
    id: 'landing-modern',
    name: 'Landing Moderno',
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    blocks: [
      { type: 'hero', content: { title: 'Construye el Futuro', subtitle: 'Soluciones innovadoras para empresas modernas', buttonText: 'Comenzar Ahora', backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop' } },
      { type: 'features', content: { title: 'Características Principales', subtitle: 'Descubre lo que hace especial nuestro producto', features: [ { icon: 'rocket', title: 'Rápido', description: 'Optimizado para velocidad' }, { icon: 'shield', title: 'Seguro', description: 'Protección avanzada' }, { icon: 'users', title: 'Colaborativo', description: 'Trabajo en equipo' } ] } },
    ],
  },
  {
    id: 'portfolio-creative',
    name: 'Portfolio Creativo',
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    blocks: [
      { type: 'hero', content: { title: 'Diseñador Creativo', subtitle: 'Transformando ideas en experiencias visuales', buttonText: 'Ver Portfolio', backgroundImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=600&fit=crop' } },
      { type: 'text', content: { title: 'Mi Historia', text: 'Soy un diseñador apasionado con años de experiencia creando interfaces de usuario intuitivas y atractivas.' } },
    ],
  },
];

export const blockCatalog = [
  { type: 'hero', name: 'Hero Section' },
  { type: 'features', name: 'Características' },
  { type: 'text', name: 'Texto' },
  { type: 'image-text', name: 'Imagen y Texto' },
  { type: 'list', name: 'Lista' },
  { type: 'carousel', name: 'Carrusel' },
  { type: 'pricing', name: 'Precios' },
  { type: 'testimonials', name: 'Testimonios' },
  { type: 'call-to-action', name: 'Llamada a la Acción' },
  { type: 'contact', name: 'Contacto' },
] as const;