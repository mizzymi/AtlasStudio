import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { Block } from '@/types/blocks'; // ⟵ agrega esto
import { RootState } from '@/redux/store';
import { moveBlock, deleteBlock } from '@/redux/slices/blocks/blocks.slice';
import { selectBlock } from '@/redux/slices/UI/UI.slice';
import { ArrowUp, ArrowDown, Edit, Trash } from 'lucide-react';
import BlockRenderer from '@/components/BlockRenderer/BlockRenderer';
import s from './Canvas.module.scss';
import { selectblocksData } from '@/redux/slices/blocks';

const Canvas: React.FC = () => {
  const blocks = useSelector(selectblocksData) ?? [];
  const selectedId = useSelector((s: RootState) => s.ui.selectedBlockId);
  const dispatch = useDispatch();

  if (blocks.length === 0) {
    return (
      <div className={`${s.canvas} center`}>
        <div className="card" style={{ padding: '2rem', textAlign: 'center', maxWidth: 420 }}>
          <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Comienza a Construir</div>
          <div style={{ color: '#6b7280' }}>Agrega bloques desde la barra lateral para diseñar tu sitio.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={s.canvas}>
      <div className={s.inner}>
        {blocks.map((block: Block, i: number) => ( 
          <div
            key={block.id}
            className={`${s.blockWrap} ${selectedId === block.id ? 'selected' : ''}`}
            onClick={() => dispatch(selectBlock(block.id))}
          >
            <BlockRenderer block={block} />
            <div className={s.tools}>
              {i > 0 && (
                <button className={s.toolBtn} onClick={(e) => { e.stopPropagation(); dispatch(moveBlock({ from: i, to: i - 1 })); }}>
                  <ArrowUp size={16} />
                </button>
              )}
              {i < blocks.length - 1 && (
                <button className={s.toolBtn} onClick={(e) => { e.stopPropagation(); dispatch(moveBlock({ from: i, to: i + 1 })); }}>
                  <ArrowDown size={16} />
                </button>
              )}
              <button className={s.toolBtn} onClick={(e) => { e.stopPropagation(); dispatch(selectBlock(block.id)); }}>
                <Edit size={16} />
              </button>
              <button className={s.toolBtn} onClick={(e) => { e.stopPropagation(); dispatch(deleteBlock(block.id)); }}>
                <Trash size={16} color="#ef4444" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
