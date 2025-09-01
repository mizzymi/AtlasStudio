import React from 'react';
import s from '../blocks.module.scss';
import type { TextContent } from '@/types/blocks';

const TextSection: React.FC<{ content: TextContent }> = ({ content }) => (
  <section className={s.section}>
    <div className={`${s.container} ${s.center}`}>
      <h2>{content.title ?? 'Tu Título'}</h2>
      <p>{content.text ?? 'Contenido...'}</p>
    </div>
  </section>
);

export default TextSection;