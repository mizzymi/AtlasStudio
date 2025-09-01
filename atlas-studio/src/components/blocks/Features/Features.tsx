import React from 'react';
import { motion } from 'framer-motion';
import s from '../blocks.module.scss';
import type { FeaturesContent } from '@/types/blocks';

const Features: React.FC<{ content: FeaturesContent }> = ({ content }) => (
  <section className={s.section}>
    <div className={s.container}>
      <div className={s.center}>
        <motion.h2 initial={{y:20,opacity:0}} animate={{y:0,opacity:1}}>{content.title ?? 'Características'}</motion.h2>
        {content.subtitle && <p className={s.subtitle}>{content.subtitle}</p>}
      </div>
      <div className={s.grid}>
        {(content.features ?? []).map((f, idx) => (
          <motion.div key={idx} className={s.card} initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.1*idx}}>
            <div className={s.featureIcon}>★</div>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;