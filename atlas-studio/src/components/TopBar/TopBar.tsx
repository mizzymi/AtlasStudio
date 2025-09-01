import React from 'react';
import { Play, Download, Settings, Rocket } from 'lucide-react';
import s from './TopBar.module.scss';

interface Props { siteName: string; onPreview(): void; onExport(): void; onSettings(): void; }

const TopBar: React.FC<Props> = ({ siteName, onPreview, onExport, onSettings }) => (
  <div className={s.topbar}>
    <div className={s.brand}>
      <div className={s.badge}><Rocket size={18} /></div>
      <div>
        <div><strong>{siteName}</strong></div>
        <div className={s.subtitle}>Constructor Visual</div>
      </div>
    </div>
    <div className={s.actions}>
      <button className={s.button} onClick={onPreview}><Play size={16} /> <span className="hidden-sm">Vista Previa</span></button>
      <button className={s.buttonPrimary} onClick={onExport}><Download size={16} /> <span className="hidden-sm">Exportar</span></button>
      <button className={s.iconBtn} onClick={onSettings}><Settings size={18} /></button>
    </div>
  </div>
);

export default TopBar;