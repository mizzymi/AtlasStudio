import React from 'react';
import { ExternalLink, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import BlockRenderer from '@/components/BlockRenderer/BlockRenderer';
import { setShowPreview } from '@/redux/slices/UI/UI.slice';
import s from './PreviewModal.module.scss';

const PreviewModal: React.FC = () => {
  const isOpen = useSelector((st: RootState) => st.ui.showPreview);
  const siteName = useSelector((st: RootState) => st.ui.siteName);
  const blocks = useSelector((s: RootState) => s.blocks.data) ?? [];
  const dispatch = useDispatch();
  if (!isOpen) return null;

  return (
    <div className={s.modal} onClick={()=>dispatch(setShowPreview(false))}>
      <div className={s.panel} onClick={(e)=>e.stopPropagation()}>
        <div className={s.header}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <ExternalLink size={18} color="#3b82f6"/>
            <div>
              <div style={{fontWeight:700}}>{siteName}</div>
              <div style={{fontSize:12, color:'#6b7280'}}>Vista Previa</div>
            </div>
          </div>
          <button onClick={()=>dispatch(setShowPreview(false))}><X/></button>
        </div>
        <div className={s.body}>
          {blocks.length===0 ? (
            <div className="center" style={{height:'100%'}}>
              <div className="card" style={{padding:'2rem', textAlign:'center'}}>Sin contenido</div>
            </div>
          ) : (
            <div>
              {blocks.map(b => <BlockRenderer key={b.id} block={b} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;