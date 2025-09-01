import React from 'react';
import s from '../blocks.module.scss';
import type { CTAContent } from '@/types/blocks';

const CallToAction: React.FC<{ content: CTAContent }> = ({ content }) => (
  <section className={s.section} style={{ background: 'linear-gradient(90deg,#764ba2,#667eea)', color: '#fff', textAlign: 'center' }}>
    <div className={s.container}>
      <h2>{content.title ?? '¿Listo para Empezar?'}</h2>
      {content.subtitle && <p>{content.subtitle}</p>}
      <button className={s.ctaBtn} style={{ background: '#fff', color: '#4c51bf' }}>{content.buttonText ?? 'Regístrate Ahora'}</button>
    </div>
  </section>
);

export default CallToAction;