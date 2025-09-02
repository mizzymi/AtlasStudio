import React from 'react';
import { motion } from 'framer-motion';
import s from '../blocks.module.scss';
import type { FeaturesContent, IconName } from '@/types/blocks';
import {
  Rocket, Shield, Users, Star, Mail, User, Quote,
  Image as ImageIcon, DollarSign, Check, List, ArrowLeft, ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICONS: Record<IconName, LucideIcon> = {
  rocket: Rocket,
  shield: Shield,
  users: Users,
  star: Star,
  mail: Mail,
  user: User,
  quote: Quote,
  image: ImageIcon,
  'dollar-sign': DollarSign,
  check: Check,
  list: List,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
};

const Features: React.FC<{ content: FeaturesContent }> = ({ content }) => (
  <section className={s.section}>
    <div className={s.container}>
      <div className={s.center}>
        <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          {content.title ?? 'Características'}
        </motion.h2>
        {content.subtitle && <p className={s.subtitle}>{content.subtitle}</p>}
      </div>
      <div className={s.grid}>
        {(content.features ?? []).map((f, idx) => {
          const Icon = ICONS[f.icon] ?? Star;
          return (
            <motion.div
              key={idx}
              className={s.card}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * idx }}
            >
              <div className={s.featureIcon}><Icon size={20} /></div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Features;
