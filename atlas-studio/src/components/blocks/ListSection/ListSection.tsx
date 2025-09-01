import React from 'react';
import s from '../blocks.module.scss';
import type { ListContent } from '@/types/blocks';

const ListSection: React.FC<{ content: ListContent }> = ({ content }) => (
  <section className={s.section}>
    <div className={`${s.container} ${s.center}`}>
      <h2>{content.title ?? 'Lista'}</h2>
      <ul className={s.ul} style={{ maxWidth: 800, margin: '0 auto' }}>
        {(content.items ?? []).map((it, i) => (
          <li key={i} style={{ background: '#f3f4f6', padding: '1rem', borderRadius: 12, margin: '.5rem 0' }}>{it}</li>
        ))}
      </ul>
    </div>
  </section>
);

export default ListSection;