import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/redux/store';
import { setLang, setShowSettings, setSiteName, type UILang } from '@/redux/slices/UI/UI.slice';
import s from './SettingsModal.module.scss';

const LANG_OPTIONS: { value: UILang; label: string }[] = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'pt', label: 'Português' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'it', label: 'Italiano' },
  { value: 'nl', label: 'Nederlands' },
  { value: 'pl', label: 'Polski' },
  { value: 'ja', label: '日本語' },
  { value: 'zh', label: '中文' },
  { value: 'ar', label: 'العربية' },
];

const SettingsModal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((st: RootState) => st.ui.showSettings);
  const currentLang = useSelector((st: RootState) => st.ui.lang);
  const currentName = useSelector((st: RootState) => st.ui.siteName);

  const [siteName, setSiteNameLocal] = useState(currentName);
  const [lang, setLangLocal] = useState<UILang>(currentLang);

  useEffect(() => { setSiteNameLocal(currentName); }, [currentName, isOpen]);
  useEffect(() => { setLangLocal(currentLang); }, [currentLang, isOpen]);

  if (!isOpen) return null;

  const close = () => dispatch(setShowSettings(false));
  const save = () => {
    dispatch(setSiteName(siteName.trim() || 'Mi Sitio Web'));
    dispatch(setLang(lang));
    close();
  };

  return (
    <div className={s.modal} onClick={close}>
      <div className={s.panel} onClick={(e) => e.stopPropagation()}>
        <div className={s.header}>
          <strong>Configuración del sitio</strong>
          <button className={`${s.btn} ${s.ghost}`} onClick={close}>Cerrar</button>
        </div>

        <div className={s.body}>
          <div>
            <div className={s.label}>Nombre del sitio</div>
            <input
              className={s.input}
              value={siteName}
              onChange={(e) => setSiteNameLocal(e.target.value)}
              placeholder="Mi Sitio Web"
            />
          </div>

          <div>
            <div className={s.label}>Idioma del documento (atributo &lt;html lang="..."&gt;)</div>
            <select
              className={s.select}
              value={lang}
              onChange={(e) => setLangLocal(e.target.value as UILang)}
            >
              {LANG_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <div className={s.actions}>
          <button className={`${s.btn} ${s.ghost}`} onClick={close}>Cancelar</button>
          <button className={`${s.btn} ${s.primary}`} onClick={save}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
