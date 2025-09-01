import React from 'react';
import s from '../blocks.module.scss';
import type { PricingContent } from '@/types/blocks';

const Pricing: React.FC<{ content: PricingContent }> = ({ content }) => (
  <section className={s.section} style={{ background: 'linear-gradient(135deg,#e0f2fe,#e8eaf6)' }}>
    <div className={s.container}>
      <div className={s.center}>
        <h2>{content.title ?? 'Nuestros Planes'}</h2>
        {content.subtitle && <p className={s.subtitle}>{content.subtitle}</p>}
      </div>
      <div className={s.pricingGrid}>
        {(content.plans ?? []).map((p, i) => (
          <div key={i} className={`${s.card} ${p.highlight ? s.planHighlight : ''}`} style={{ textAlign: 'center' }}>
            <h3>{p.name}</h3>
            <div className={s.price}>{p.price}</div>
            <div className={s.subtitle}>{p.frequency}</div>
            <ul className={s.ul}>{(p.features ?? []).map((f, j) => <li key={j}>{f}</li>)}</ul>
            <button className={s.ctaBtn}>{p.buttonText}</button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;