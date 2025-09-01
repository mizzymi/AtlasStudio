import React from 'react';
import s from '../blocks.module.scss';
import type { TestimonialsContent } from '@/types/blocks';

const Testimonials: React.FC<{ content: TestimonialsContent }> = ({ content }) => (
  <section className={s.section} style={{ background: '#f8fafc' }}>
    <div className={s.container}>
      <div className={s.center}>
        <h2>{content.title ?? 'Lo que Dicen Nuestros Clientes'}</h2>
        {content.subtitle && <p className={s.subtitle}>{content.subtitle}</p>}
      </div>
      <div className={s.grid}>
        {(content.testimonials ?? []).map((t, i) => (
          <div className={s.card} key={i} style={{ alignItems: 'center', textAlign: 'center' }}>
            <div style={{ fontStyle: 'italic', color: '#555' }}>&quot;{t.quote}&quot;</div>
            {t.avatar && <img src={t.avatar} alt={t.author} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid #667eea', margin: '.75rem 0' }} />}
            <div style={{ fontWeight: 700 }}>{t.author}</div>
            {t.role && <div className={s.subtitle}>{t.role}</div>}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;