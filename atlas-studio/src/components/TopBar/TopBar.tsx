import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Play, Download, Settings, Rocket, Menu } from 'lucide-react';
import s from './TopBar.module.scss';
import { togglePanel, toggleSidebar } from '@/redux/slices/UI/UI.slice';

interface Props {
  siteName: string;
  onPreview(): void;
  onExport(): void;
  onSettings(): void;
}

const TopBar: React.FC<Props> = ({ siteName, onPreview, onExport, onSettings }) => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const handle = {
    sidebar: () => { dispatch(toggleSidebar()); setMenuOpen(false); },
    panel: () => { dispatch(togglePanel()); setMenuOpen(false); },
    preview: () => { onPreview(); setMenuOpen(false); },
    export: () => { onExport(); setMenuOpen(false); },
    settings: () => { onSettings(); setMenuOpen(false); },
  };

  return (
    <div className={s.topbar}>
      <div className={s.brand}>
        <div className={s.badge} aria-hidden>
          <Rocket size={18} />
        </div>
        <div>
          <div className={s.siteName}><strong>{siteName}</strong></div>
          <div className={s.subtitle}>Constructor Visual</div>
        </div>
      </div>

      {/* Botón hamburguesa (solo móvil) */}
      <button
        className={s.hamburger}
        aria-label="Abrir menú"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        onClick={(e) => { e.stopPropagation(); setMenuOpen(v => !v); }}
      >
        <Menu size={20} />
      </button>

      <div className={s.actions}>
        <button className={s.ghost} onClick={handle.sidebar}>Bloques</button>
        <button className={s.ghost} onClick={handle.panel}>Propiedades</button>

        <button className={s.button} onClick={handle.preview}>
          <Play size={16} />
          <span className={s.hiddenSm}>Vista Previa</span>
        </button>

        <button className={s.buttonPrimary} onClick={handle.export}>
          <Download size={16} />
          <span className={s.hiddenSm}>Exportar</span>
        </button>

        <button className={s.iconBtn} onClick={handle.settings} aria-label="Ajustes">
          <Settings size={18} />
        </button>
      </div>

      <div
        ref={menuRef}
        className={`${s.mobileMenu} ${menuOpen ? s.open : ''}`}
        role="menu"
        aria-label="Menú principal"
      >
        <button className={s.mobileItem} role="menuitem" onClick={handle.sidebar}>🧱 Bloques</button>
        <button className={s.mobileItem} role="menuitem" onClick={handle.preview}>▶️ Vista previa</button>
        <button className={s.mobileItem} role="menuitem" onClick={handle.export}>⬇️ Exportar</button>
        <button className={s.mobileItem} role="menuitem" onClick={handle.settings}>🔧 Ajustes</button>
      </div>
    </div>
  );
};

export default TopBar;
