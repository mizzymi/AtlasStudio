import React from 'react';
import s from './PropertyPanel.module.scss';
import type { Block, FeaturesContent, TestimonialsContent, PricingContent } from '@/types/blocks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateBlock } from '@/redux/slices/blocks/blocks.slice';
import { selectblocksData } from '@/redux/slices/blocks/';
import { selectBlock, setPanelOpen, setTheme } from '@/redux/slices/UI/UI.slice';

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => <label className={s.label}>{children}</label>;

const Field: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => <input {...props} className={s.input} />;
const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => <textarea {...props} className={s.textarea} />;
const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => <select {...props} className={s.select} />;

const PropertyPanel: React.FC = () => {
  const theme = useSelector((st: RootState) => st.ui.theme);
  const dispatch = useDispatch();
  const selectedId = useSelector((st: RootState) => st.ui.selectedBlockId);
  const blocks = useSelector(selectblocksData);
  const block = blocks.find(b => b.id === selectedId);
  if (!block) return null;

  const apply = (content: any) => dispatch(updateBlock({ ...block, content } as Block));
  const updateArray = <T,>(arr: T[] | undefined, idx: number, next: Partial<T>): T[] => {
    const base = [...(arr ?? [])];
    base[idx] = { ...(base[idx] as any), ...next };
    return base;
  };

  return (
    <aside className={s.panel}>
      <div className={s.header}>
        <div>
          <div style={{ fontWeight: 700 }}>Propiedades</div>
          <div className={s.small}>{block ? `${block.type} block` : 'Ajustes globales'}</div>
        </div>
        {block && (
          <button
            className={s.btn}
            onClick={() => {
              dispatch(selectBlock(null));
              dispatch(setPanelOpen(false));
            }}
          >
            Cerrar
          </button>
        )}

      </div>

      {/* Colores globales */}
      <div className={s.group}>
        <div className={s.label}>Colores del sitio</div>
        <div className={s.row}>
          <div style={{ flex: 1 }}>
            <div className={s.small}>Primario</div>
            <input type="color" className={s.input} value={theme.primary} onChange={e => dispatch(setTheme({ primary: e.target.value }))} />
          </div>
          <div style={{ flex: 1 }}>
            <div className={s.small}>Secundario</div>
            <input type="color" className={s.input} value={theme.secondary} onChange={e => dispatch(setTheme({ secondary: e.target.value }))} />
          </div>
        </div>
      </div>

      {/* HERO */}
      {block.type === 'hero' && (
        <div className={s.group}>
          <Label>Título</Label>
          <Field value={block.content.title ?? ''} onChange={e => apply({ ...block.content, title: e.target.value })} />
          <Label>Subtítulo</Label>
          <TextArea rows={3} value={block.content.subtitle ?? ''} onChange={e => apply({ ...block.content, subtitle: e.target.value })} />
          <Label>Botón</Label>
          <Field value={block.content.buttonText ?? ''} onChange={e => apply({ ...block.content, buttonText: e.target.value })} />
          <Label>URL del botón</Label>
          <Field value={block.content.buttonUrl ?? ''} onChange={e => apply({ ...block.content, buttonUrl: e.target.value })} />
          <Label>Fondo (URL)</Label>
          <Field value={block.content.backgroundImage ?? ''} onChange={e => apply({ ...block.content, backgroundImage: e.target.value })} />
        </div>
      )}

      {/* FEATURES */}
      {block.type === 'features' && (() => {
        const c = block.content as FeaturesContent;
        return (
          <div className={s.group}>
            <Label>Título</Label>
            <Field value={c.title ?? ''} onChange={e => apply({ ...c, title: e.target.value })} />
            <Label>Subtítulo</Label>
            <Field value={c.subtitle ?? ''} onChange={e => apply({ ...c, subtitle: e.target.value })} />
            <div className={s.row} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div className={s.label}>Características</div>
              <button className={s.btn} onClick={() => apply({ ...c, features: [...(c.features ?? []), { icon: 'star', title: 'Nueva', description: 'Descripción' }] })}>Agregar</button>
            </div>
            {(c.features ?? []).map((f, i) => (
              <div key={i} className={s.itemCard}>
                <Field placeholder="Título" value={f.title} onChange={e => apply({ ...c, features: updateArray(c.features, i, { title: e.target.value }) })} />
                <TextArea rows={2} placeholder="Descripción" value={f.description} onChange={e => apply({ ...c, features: updateArray(c.features, i, { description: e.target.value }) })} />
                <Select
                  value={f.icon}
                  onChange={e =>
                    apply({ ...c, features: updateArray(c.features, i, { icon: e.target.value as any }) })
                  }
                >
                  <option value="star">⭐ Estrella</option>
                  <option value="rocket">🚀 Cohete</option>
                  <option value="shield">🛡️ Escudo</option>
                  <option value="users">👥 Usuarios</option>
                  <option value="mail">✉️ Correo</option>
                  <option value="user">👤 Usuario</option>
                  <option value="quote">❝ Cita</option>
                  <option value="image">🖼️ Imagen</option>
                  <option value="dollar-sign">💲 Dinero</option>
                  <option value="check">✔️ Check</option>
                  <option value="list">📋 Lista</option>
                  <option value="arrow-left">⬅️ Flecha izq.</option>
                  <option value="arrow-right">➡️ Flecha der.</option>
                </Select>

                <div className={s.row}>
                  <button className={`${s.btn} ${s.remove}`} onClick={() => apply({ ...c, features: (c.features ?? []).filter((_, x) => x !== i) })}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        );
      })()}

      {/* TEXT */}
      {block.type === 'text' && (
        <div className={s.group}>
          <Label>Título</Label>
          <Field value={block.content.title ?? ''} onChange={e => apply({ ...block.content, title: e.target.value })} />
          <Label>Contenido</Label>
          <TextArea rows={6} value={block.content.text ?? ''} onChange={e => apply({ ...block.content, text: e.target.value })} />
        </div>
      )}

      {/* CONTACT */}
      {block.type === 'contact' && (
        <div className={s.group}>
          <Label>Título</Label>
          <Field value={block.content.title ?? ''} onChange={e => apply({ ...block.content, title: e.target.value })} />
          <Label>Subtítulo</Label>
          <Field value={block.content.subtitle ?? ''} onChange={e => apply({ ...block.content, subtitle: e.target.value })} />
        </div>
      )}

      {/* CTA */}
      {block.type === 'call-to-action' && (
        <div className={s.group}>
          <Label>Título</Label>
          <Field value={block.content.title ?? ''} onChange={e => apply({ ...block.content, title: e.target.value })} />
          <Label>Subtítulo</Label>
          <Field value={block.content.subtitle ?? ''} onChange={e => apply({ ...block.content, subtitle: e.target.value })} />
          <Label>Botón</Label>
          <Field value={block.content.buttonText ?? ''} onChange={e => apply({ ...block.content, buttonText: e.target.value })} />
          <Label>URL del botón</Label>
          <Field value={block.content.buttonUrl ?? ''} onChange={e => apply({ ...block.content, buttonUrl: e.target.value })} />
        </div>
      )}

      {/* TESTIMONIALS */}
      {block.type === 'testimonials' && (() => {
        const c = block.content as TestimonialsContent;
        return (
          <div className={s.group}>
            <Label>Título</Label>
            <Field value={c.title ?? ''} onChange={e => apply({ ...c, title: e.target.value })} />
            <Label>Subtítulo</Label>
            <Field value={c.subtitle ?? ''} onChange={e => apply({ ...c, subtitle: e.target.value })} />
            <div className={s.row} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div className={s.label}>Testimonios</div>
              <button className={s.btn} onClick={() => apply({ ...c, testimonials: [...(c.testimonials ?? []), { quote: 'Nuevo testimonio increíble.', author: 'Nuevo Cliente' }] })}>Agregar</button>
            </div>
            {(c.testimonials ?? []).map((t, i) => (
              <div key={i} className={s.itemCard}>
                <TextArea rows={3} placeholder="Cita" value={t.quote} onChange={e => apply({ ...c, testimonials: updateArray(c.testimonials, i, { quote: e.target.value }) })} />
                <Field placeholder="Autor" value={t.author} onChange={e => apply({ ...c, testimonials: updateArray(c.testimonials, i, { author: e.target.value }) })} />
                <Field placeholder="Rol" value={t.role ?? ''} onChange={e => apply({ ...c, testimonials: updateArray(c.testimonials, i, { role: e.target.value }) })} />
                <Field placeholder="Avatar URL" value={t.avatar ?? ''} onChange={e => apply({ ...c, testimonials: updateArray(c.testimonials, i, { avatar: e.target.value }) })} />
                <button className={`${s.btn} ${s.remove}`} onClick={() => apply({ ...c, testimonials: (c.testimonials ?? []).filter((_, x) => x !== i) })}>Eliminar</button>
              </div>
            ))}
          </div>
        );
      })()}

      {/* IMAGE + TEXT */}
      {block.type === 'image-text' && (
        <div className={s.group}>
          <Label>Título</Label>
          <Field value={block.content.title ?? ''} onChange={e => apply({ ...block.content, title: e.target.value })} />
          <Label>Texto</Label>
          <TextArea rows={4} value={block.content.text ?? ''} onChange={e => apply({ ...block.content, text: e.target.value })} />
          <Label>Imagen URL</Label>
          <Field value={block.content.imageUrl ?? ''} onChange={e => apply({ ...block.content, imageUrl: e.target.value })} />
          <Label>Alt Imagen</Label>
          <Field value={block.content.imageAlt ?? ''} onChange={e => apply({ ...block.content, imageAlt: e.target.value })} />
          <Label>Texto Botón (opcional)</Label>
          <Field value={block.content.buttonText ?? ''} onChange={e => apply({ ...block.content, buttonText: e.target.value })} />
          <Label>URL del botón</Label>
          <Field value={block.content.buttonUrl ?? ''} onChange={e => apply({ ...block.content, buttonUrl: e.target.value })} />
          <div><input id="imgRight" type="checkbox" checked={!!block.content.imageRight} onChange={e => apply({ ...block.content, imageRight: e.target.checked })} /> <label htmlFor="imgRight">Imagen a la derecha</label></div>
        </div>
      )}

      {/* PRICING */}
      {block.type === 'pricing' && (() => {
        const c = block.content as PricingContent;
        return (
          <div className={s.group}>
            <Label>Título</Label>
            <Field value={c.title ?? ''} onChange={e => apply({ ...c, title: e.target.value })} />
            <Label>Subtítulo</Label>
            <Field value={c.subtitle ?? ''} onChange={e => apply({ ...c, subtitle: e.target.value })} />
            <div className={s.row} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div className={s.label}>Planes</div>
              <button className={s.btn} onClick={() => apply({ ...c, plans: [...(c.plans ?? []), { name: 'Nuevo Plan', price: '$0', frequency: '/mes', features: ['Característica'], buttonText: 'Elegir', highlight: false }] })}>Agregar Plan</button>
            </div>
            {(c.plans ?? []).map((p, i) => (
              <div key={i} className={s.itemCard}>
                <Field placeholder="Nombre" value={p.name} onChange={e => apply({ ...c, plans: updateArray(c.plans, i, { name: e.target.value }) })} />
                <Field placeholder="Precio" value={p.price} onChange={e => apply({ ...c, plans: updateArray(c.plans, i, { price: e.target.value }) })} />
                <Field placeholder="Frecuencia" value={p.frequency} onChange={e => apply({ ...c, plans: updateArray(c.plans, i, { frequency: e.target.value }) })} />
                <Field placeholder="Texto del botón" value={p.buttonText} onChange={e => apply({ ...c, plans: updateArray(c.plans, i, { buttonText: e.target.value }) })} />
                <Field placeholder="URL del botón" value={p.buttonUrl ?? ''} onChange={e => apply({ ...c, plans: updateArray(c.plans, i, { buttonUrl: e.target.value }) })} />
                <div><input id={`hl-${i}`} type="checkbox" checked={!!p.highlight} onChange={e => apply({ ...c, plans: updateArray(c.plans, i, { highlight: e.target.checked }) })} /> <label htmlFor={`hl-${i}`}>Resaltar</label></div>
                <div className={s.row} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className={s.small}>Características</div>
                  <button className={s.btn} onClick={() => {
                    const list = [...(p.features ?? []), 'Nueva característica'];
                    apply({ ...c, plans: updateArray(c.plans, i, { features: list }) });
                  }}>Añadir</button>
                </div>
                <div>
                  {(p.features ?? []).map((f, j) => (
                    <div key={j} className={s.row}>
                      <Field value={f} onChange={e => {
                        const list = [...(p.features ?? [])];
                        list[j] = e.target.value;
                        apply({ ...c, plans: updateArray(c.plans, i, { features: list }) });
                      }} />
                      <button className={`${s.btn} ${s.remove}`} onClick={() => {
                        const list = (p.features ?? []).filter((_, x) => x !== j);
                        apply({ ...c, plans: updateArray(c.plans, i, { features: list }) });
                      }}>X</button>
                    </div>
                  ))}
                </div>
                <button className={`${s.btn} ${s.remove}`} onClick={() => apply({ ...c, plans: (c.plans ?? []).filter((_, x) => x !== i) })}>Eliminar Plan</button>
              </div>
            ))}
          </div>
        );
      })()}

      {/* LIST */}
      {block.type === 'list' && (
        <div className={s.group}>
          <Label>Título</Label>
          <Field value={block.content.title ?? ''} onChange={e => apply({ ...block.content, title: e.target.value })} />
          <div className={s.row} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div className={s.label}>Elementos</div>
            <button className={s.btn} onClick={() => apply({ ...block.content, items: [...(block.content.items ?? []), 'Nuevo elemento'] })}>Agregar</button>
          </div>
          {(block.content.items ?? []).map((it: string, i: number) => (
            <div key={i} className={s.itemCard}>
              <Field value={it} onChange={e => {
                const list = [...(block.content.items ?? [])];
                list[i] = e.target.value; apply({ ...block.content, items: list });
              }} />
              <button className={`${s.btn} ${s.remove}`} onClick={() => apply({ ...block.content, items: (block.content.items ?? []).filter((_: any, x: number) => x !== i) })}>Eliminar</button>
            </div>
          ))}
        </div>
      )}

      {/* CAROUSEL */}
      {block.type === 'carousel' && (
        <div className={s.group}>
          <Label>Título</Label>
          <Field value={block.content.title ?? ''} onChange={e => apply({ ...block.content, title: e.target.value })} />
          <div className={s.row} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div className={s.label}>Imágenes</div>
            <button className={s.btn} onClick={() => apply({ ...block.content, images: [...(block.content.images ?? []), 'https://via.placeholder.com/800x500'] })}>Agregar</button>
          </div>
          {(block.content.images ?? []).map((img: string, i: number) => (
            <div key={i} className={s.itemCard}>
              <Field value={img} onChange={e => {
                const list = [...(block.content.images ?? [])];
                list[i] = e.target.value; apply({ ...block.content, images: list });
              }} />
              <button className={`${s.btn} ${s.remove}`} onClick={() => apply({ ...block.content, images: (block.content.images ?? []).filter((_: any, x: number) => x !== i) })}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};

export default PropertyPanel;