import React from 'react';
import s from '../blocks.module.scss';
import type { CTAContent } from '@/types/blocks';

const CallToAction: React.FC<{ content: CTAContent }> = ({ content }) => (
  <section className={s.section} style={{background:'linear-gradient(90deg,var(--secondary),var(--primary))', color:'#fff', textAlign:'center'}}>
    <div className={s.container}>
      <h2>{content.title ?? '¿Listo para Empezar?'}</h2>
      {content.subtitle && <p>{content.subtitle}</p>}
      {content.buttonText && (
        <a href={content.buttonUrl || '#'} className={s.ctaBtn} style={{background:'#fff', color:'#4c51bf'}}>
          {content.buttonText}
        </a>
      )}
    </div>
  </section>
);

export default CallToAction;