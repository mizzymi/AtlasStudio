import React from 'react';
import s from '../blocks.module.scss';
import type { ImageTextContent } from '@/types/blocks';

const ImageText: React.FC<{ content: ImageTextContent }> = ({ content }) => (
  <section className={s.imageText}>
    <div className={`${s.imageTextGrid} ${content.imageRight ? s.imageRight : ''}`}>
      <div><img className={s.image} src={content.imageUrl ?? 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop'} alt={content.imageAlt ?? 'Imagen'} /></div>
      <div>
        <h2>{content.title ?? 'Imagen + Texto'}</h2>
        <p>{content.text ?? 'Bloque versátil para combinar imagen y texto.'}</p>
        {content.buttonText && <button className={s.ctaBtn}>{content.buttonText}</button>}
      </div>
    </div>
  </section>
);

export default ImageText;