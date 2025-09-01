import React from 'react';
import s from '../blocks.module.scss';
import type { ContactContent } from '@/types/blocks';

const ContactForm: React.FC<{ content: ContactContent }> = ({ content }) => (
  <section className={s.section} style={{ background: 'linear-gradient(135deg,#e0f2fe,#e8eaf6)' }}>
    <div className={`${s.container} ${s.center}`}>
      <h2>{content.title ?? 'Contáctanos'}</h2>
      {content.subtitle && <p className={s.subtitle}>{content.subtitle}</p>}
      <form className={s.contactForm} onSubmit={(e) => e.preventDefault()}>
        <input className={s.input} placeholder="Tu nombre" />
        <input className={s.input} type="email" placeholder="tu@email.com" />
        <textarea className={s.input} rows={5} placeholder="Tu mensaje..." />
        <button className={s.ctaBtn} type="submit">Enviar Mensaje</button>
      </form>
    </div>
  </section>
);

export default ContactForm;