import React from 'react';
import { LayoutDashboard, FileText, Plus } from 'lucide-react';
import { blockCatalog, defaultTemplates } from '@/utils/templates';
import s from './Sidebar.module.scss';
import type { BlockType } from '@/types/blocks';

interface Props {
  onAddBlock: (type: BlockType) => void;
  activeTab: 'blocks' | 'templates';
  onTabChange: (t: 'blocks' | 'templates') => void;
  onApplyTemplate: (blocks: any[]) => void;
}

const Sidebar: React.FC<Props> = ({ onAddBlock, activeTab, onTabChange, onApplyTemplate }) => {
  return (
    <aside className={s.sidebar}>
      <div className={s.header}>
        <h2>Atlas Studio</h2>
        <div className={s.tabs}>
          <button className={`${s.tab} ${activeTab === 'blocks' ? s.tabActive : ''}`} onClick={() => onTabChange('blocks')}><LayoutDashboard size={16} /> Bloques</button>
          <button className={`${s.tab} ${activeTab === 'templates' ? s.tabActive : ''}`} onClick={() => onTabChange('templates')}><FileText size={16} /> Plantillas</button>
        </div>
      </div>

      {activeTab === 'blocks' && (
        <div className={s.section}>
          <h4>Agregar Bloques</h4>
          <div style={{ display: 'grid', gap: '.75rem' }}>
            {blockCatalog.map(b => (
              <button key={b.type} className={s.blockBtn} onClick={() => onAddBlock(b.type)}>
                <div style={{ padding: '.4rem', background: '#fff', borderRadius: 8, boxShadow: '0 1px 2px rgba(0,0,0,.06)' }}>🧩</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{b.type}</div>
                </div>
                <Plus size={16} color="#94a3b8" />
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className={s.section}>
          <h4>Plantillas</h4>
          <div style={{ display: 'grid', gap: '.75rem' }}>
            {defaultTemplates.map(t => (
              <div key={t.id} className={s.card} onClick={() => onApplyTemplate(t.blocks)}>
                <div className={s.preview}>{t.preview && <img src={t.preview} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>Bloques: {t.blocks.length}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;