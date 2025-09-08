import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from '@/components/TopBar/TopBar';
import Canvas from '@/components/Canvas/Canvas';
import PropertyPanel from '@/components/PropertyPanel/PropertyPanel';
import PreviewModal from '@/components/PreviewModal/PreviewModal';
import { RootState } from '@/redux/store';
import { setSidebarTab, setShowPreview, setShowSettings } from '@/redux/slices/UI/UI.slice';
import { addBlock } from '@/redux/slices/blocks/blocks.slice';
import type { Block } from '@/types/blocks';
import { useExportReact } from '@/hooks/useExportReact/useExportReact';
import { useUniqueId } from '@/hooks/useUniqueId/useUniqueId';
import Sidebar from '@/components/SideBar/SideBar';
import SettingsModal from '@/components/SettingsModal/SettingsModal';

const defaultContentFor = (type: Block['type']): any => {
  switch (type) {
    case 'hero': return { title: 'Tu Título Impactante', subtitle: 'Descripción convincente', buttonText: 'Comenzar Ahora', backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop' };
    case 'features': return { title: 'Características', subtitle: 'Lo que nos hace especiales', features: [{ icon: 'rocket', title: 'Rápido', description: 'Optimizado' }, { icon: 'shield', title: 'Seguro', description: 'Protección' }, { icon: 'users', title: 'Colaborativo', description: 'Equipo' }] };
    case 'text': return { title: 'Sobre nosotros', text: 'Texto descriptivo' };
    case 'contact': return { title: 'Contáctanos', subtitle: 'Estamos aquí para ayudarte' };
    case 'call-to-action': return { title: '¿Listo para Empezar?', subtitle: 'Únete hoy', buttonText: 'Regístrate' };
    case 'testimonials': return { title: 'Clientes felices', subtitle: 'Historias reales', testimonials: [{ quote: '¡Increíble!', author: 'Ana' }, { quote: 'Me encanta', author: 'Juan' }] };
    case 'image-text': return { title: 'Imagen + Texto', text: 'Visual y descriptivo', imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop', imageAlt: 'Imagen' };
    case 'pricing': return { title: 'Precios', subtitle: 'Elige tu plan', plans: [{ name: 'Básico', price: '$19', frequency: '/mes', features: ['5 proyectos'], buttonText: 'Elegir' }, { name: 'Estándar', price: '$49', frequency: '/mes', features: ['20 proyectos'], buttonText: 'Elegir', highlight: true }, { name: 'Premium', price: '$99', frequency: '/mes', features: ['Ilimitado'], buttonText: 'Elegir' }] };
    case 'list': return { title: 'Lista', items: ['Primer elemento', 'Segundo elemento'] };
    case 'carousel': return { title: 'Galería', images: ['https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&h=500&fit=crop', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=500&fit=crop'] };
  }
};

const BuilderPage: React.FC = () => {
  const dispatch = useDispatch();
  const { generate } = useUniqueId();
  const tab = useSelector((s: RootState) => s.ui.sidebarTab);
  const siteName = useSelector((s: RootState) => s.ui.siteName);
  const blocks = useSelector((s: RootState) => s.blocks.data);
  const theme = useSelector((s: RootState) => s.ui.theme);
  const lang = useSelector((s: RootState) => s.ui.lang);
  const themeVars = { '--primary': theme.primary, '--secondary': theme.secondary } as React.CSSProperties;
  const { exportReactAppZip } = useExportReact(siteName);
  const onAddBlock = useCallback((type: Block['type']) => {
    const block: Block = { id: generate(), type, content: defaultContentFor(type) } as Block;
    dispatch(addBlock(block));
  }, [dispatch, generate]);
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', height: '100vh', ...themeVars } as React.CSSProperties}
    >
      <TopBar
        siteName={siteName}
        onPreview={() => dispatch(setShowPreview(true))}
        onExport={() => {
          console.log('Exportando bloques:', Array.isArray(blocks), blocks?.length, blocks);
          exportReactAppZip(blocks, lang, theme);
        }}
        onSettings={() => dispatch(setShowSettings(true))}
      />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar onAddBlock={onAddBlock} activeTab={tab} onTabChange={(t) => dispatch(setSidebarTab(t))} onApplyTemplate={(tpl) => {
          tpl.forEach((b: any) => onAddBlock(b.type));
        }} />
        <Canvas />
        <PropertyPanel />
      </div>
      <PreviewModal />
      <SettingsModal />
    </div>
  );
};

export default BuilderPage;