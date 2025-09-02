import React from 'react';
import { motion } from 'framer-motion';
import s from '../blocks.module.scss';
import type { HeroContent } from '@/types/blocks';

const Hero: React.FC<{ content: HeroContent }> = ({ content }) => (
  <section className={s.hero}>
    <div className={s.heroBg} style={{ backgroundImage:`url('${content.backgroundImage ?? ''}')` }} />
    <div className={s.heroOverlay} />
    <div className={s.heroContent}>
      <motion.h1 initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.6}}>
        {content.title ?? 'Tu Título Aquí'}
      </motion.h1>
      <motion.p initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.1,duration:.6}}>
        {content.subtitle ?? 'Subtítulo descriptivo'}
      </motion.p>
      {content.buttonText && (
        <motion.a
          href={content.buttonUrl || '#'}
          className={s.ctaBtn}
          initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.2,duration:.6}}
        >
          {content.buttonText}
        </motion.a>
      )}
    </div>
  </section>
);

export default Hero;