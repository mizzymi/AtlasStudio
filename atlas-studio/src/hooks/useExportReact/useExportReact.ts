import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { Block } from '@/types/blocks';

const esc = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/`/g, '\\`');

// ---------- Plantillas base del proyecto ----------
const pkgJson = (appName: string, used: Array<Block['type']>) => `{
  "name": "${appName}",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@reduxjs/toolkit": "2.2.5",
    "@types/file-saver": "^2.0.7",
    ${used.includes('features') ? `"lucide-react": "^0.542.0",` : ""}
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-redux": "9.1.2"
  },
  "devDependencies": {
    "@types/react": "^19.1.12",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.2",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.33.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "postcss": "^8.4.49",
    "typescript": "^5.9.2",
    "vite": "^7.1.4"
  }
}`;

const tsconfig = `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "jsx": "react-jsx",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}`;

const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 }
})
`;

const indexHtml = (siteName: string) => `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${siteName}</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/preloaded-state.js"></script>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;

const mainTsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
`;

const appTsx = `import React from 'react'
import Home from './pages/Home/Home'
const App: React.FC = () => <Home />
export default App
`;

// ---------- Redux ----------
const storeTs = `import { configureStore, combineReducers } from '@reduxjs/toolkit';
import uiReducer from './slices/ui.slice';
import blocksReducer from './slices/blocks.slice';

const rootReducer = combineReducers({
  ui: uiReducer,
  blocks: blocksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof makeStore> extends { dispatch: infer D } ? D : never;

export const makeStore = (preloaded?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: preloaded as RootState | undefined,
    devTools: true,
  });

declare global {
  interface Window { __PRELOADED_STATE__?: Partial<RootState> }
}

export const store = makeStore(window.__PRELOADED_STATE__);
export type Store = typeof store;
export type AppGetState = () => RootState;
`;

const uiSlice = `import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Theme = { primary: string; secondary: string }
type UIState = { lang: string; siteName: string; theme: Theme }

const initialState: UIState = {
  lang: 'es',
  siteName: 'Mi Sitio',
  theme: { primary: '#667eea', secondary: '#764ba2' }
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLang: (s, a: PayloadAction<string>) => { s.lang = a.payload },
    setSiteName: (s, a: PayloadAction<string>) => { s.siteName = a.payload },
    setTheme: (s, a: PayloadAction<Theme>) => { s.theme = a.payload }
  }
})

export const { setLang, setSiteName, setTheme } = uiSlice.actions
export default uiSlice.reducer
`;

const blocksSlice = `import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Block } from '@/types'

type BlocksState = { items: Block[] }
const initialState: BlocksState = { items: [] }

const slice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    setBlocks: (s, a: PayloadAction<Block[]>) => { s.items = a.payload }
  }
})

export const { setBlocks } = slice.actions
export default slice.reducer
`;

// ---------- Types (FIX incluido en FeaturesContent) ----------
const typesTs = `export type IconName = 'rocket'|'shield'|'users'|'star'|'mail'|'user'|'quote'|'image'|'dollar-sign'|'check'|'list'|'arrow-left'|'arrow-right'

export type HeroContent = { title:string; subtitle?:string; buttonText?:string; buttonUrl?:string; backgroundImage?:string }
export type FeaturesContent = { title:string; subtitle?:string; features: { icon?: IconName; title: string; description?: string }[] }
export type TextContent = { title:string; text:string }
export type ContactContent = { title:string; subtitle?:string }
export type CTAContent = { title:string; subtitle?:string; buttonText?:string; buttonUrl?:string }
export type Testimonial = { quote:string; author:string; role?:string; avatar?:string }
export type TestimonialsContent = { title:string; subtitle?:string; testimonials: Testimonial[] }
export type ImageTextContent = { title:string; text:string; imageUrl:string; imageAlt?:string; buttonText?:string; buttonUrl?:string; imageRight?:boolean }
export type PricingPlan = { name:string; price:string; frequency?:string; features:string[]; buttonText?:string; buttonUrl?:string; highlight?:boolean }
export type PricingContent = { title:string; subtitle?:string; plans: PricingPlan[] }
export type ListContent = { title:string; items:string[] }
export type CarouselContent = { title:string; images:string[] }

export type Block =
 | { id:string; type:'hero'; content:HeroContent }
 | { id:string; type:'features'; content:FeaturesContent }
 | { id:string; type:'text'; content:TextContent }
 | { id:string; type:'contact'; content:ContactContent }
 | { id:string; type:'call-to-action'; content:CTAContent }
 | { id:string; type:'testimonials'; content:TestimonialsContent }
 | { id:string; type:'image-text'; content:ImageTextContent }
 | { id:string; type:'pricing'; content:PricingContent }
 | { id:string; type:'list'; content:ListContent }
 | { id:string; type:'carousel'; content:CarouselContent }
`;

// ---------- Página Home ----------
const homeTsx = `import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import RenderBlock from '../../components/RenderBlock/RenderBlock'
import './Home.css'

const Home: React.FC = () => {
  const { items } = useSelector((s: RootState) => s.blocks)
  const { siteName, theme } = useSelector((s: RootState) => s.ui)

  const vars: React.CSSProperties = { ['--primary' as any]: theme.primary, ['--secondary' as any]: theme.secondary }

  return (
    <main style={vars}>
      <header className="top">
        <h1>{siteName}</h1>
      </header>
      {items.length === 0 ? <p className="empty">Sin bloques</p> : items.map(b => <RenderBlock key={b.id} block={b} />)}
      <footer className="foot">© {new Date().getFullYear()} {siteName}</footer>
    </main>
  )
}
export default Home
`;

const homeCss = `main {
  font-family: system-ui, sans-serif;
  color: #333;
  background: #f7f8fb;
}
.top {
  padding: 1rem 1.25rem;
  position: sticky;
  top: 0;
  background: #fff;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
  z-index: 10;
}
.top h1 {
  margin: 0;
  font-size: 1.1rem;
}
.foot {
  text-align: center;
  padding: 2rem 1rem;
  color: #777;
}
.empty {
  text-align: center;
  padding: 3rem 1rem;
  color: #777;
}
`;

// ---------- Estilos globales ----------
const globalCss = `
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  --radius: 16px;
  --shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}
a {
  text-decoration: none;
}
.btn {
  display: inline-block;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  box-shadow: var(--shadow);
}
.btn--light {
  background: #fff;
  color: #4c51bf;
}
.section {
  padding: 5rem 1rem;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.center {
  text-align: center;
}
.subtitle {
  color: #666;
  max-width: 800px;
  margin: 0 auto 2rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}
.card {
  background: #fff;
  border-radius: 16px;
  box-shadow: var(--shadow);
  padding: 1.5rem;
}
.featureIcon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: #fff;
  margin: 0 auto 1rem;
}
.hero {
  position: relative;
  min-height: 90vh;
  display: grid;
  place-items: center;
  text-align: center;
  color: #fff;
  background-size: cover;
  background-position: center;
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}
.hero__content {
  position: relative;
  padding: 3rem;
  max-width: 820px;
}
.hero__content h1 {
  font-size: clamp(2rem, 6vw, 3.5rem);
  background: linear-gradient(90deg, #fff, #ddd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero__content p {
  opacity: 0.9;
}
.imageText {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.imageText img {
  width: 100%;
  border-radius: 16px;
  box-shadow: var(--shadow);
}
.imageText--right {
  direction: rtl;
}
.imageText--right .imageText__content {
  direction: ltr;
}
.pricing__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
  max-width: 1200px;
  margin: 0 auto;
}
.plan {
  background: #fff;
  border-radius: 16px;
  box-shadow: var(--shadow);
  padding: 2rem;
}
.plan--highlight {
  outline: 3px solid var(--primary);
  transform: translateY(-4px);
}
.plan__price {
  font-size: 2.25rem;
  color: var(--primary);
  font-weight: 800;
}
.plan__list {
  list-style: none;
  padding: 0;
}
.plan__list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.plan__list li::before {
  content: "✓";
  color: #16a34a;
  font-weight: 700;
}
.carousel {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: var(--shadow);
}
.carousel__track {
  display: flex;
  transition: transform 0.5s ease;
}
.carousel__slide {
  flex: 0 0 100%;
}
.carousel__btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.85);
  border: 0;
  border-radius: 999px;
  padding: 0.6rem 1rem;
  cursor: pointer;
}
.carousel__btn--prev {
  left: 1rem;
}
.carousel__btn--next {
  right: 1rem;
}
@media (max-width: 768px) {
  .imageText {
    grid-template-columns: 1fr;
  }
}
`.trim();

// ---------- Componentes por bloque ----------
const heroTsx = `import React from 'react'
import type { HeroContent } from '@/types'
const Hero: React.FC<{ content: HeroContent }> = ({ content }) => (
  <section className="hero" style={{ backgroundImage: \`url('\${content.backgroundImage ?? ''}')\` }}>
    <div className="hero__overlay"></div>
    <div className="hero__content">
      <h1>{content.title}</h1>
      {content.subtitle && <p>{content.subtitle}</p>}
      {content.buttonText && <a className="btn" href={content.buttonUrl || '#'}>{content.buttonText}</a>}
    </div>
  </section>
)
export default Hero
`;

const featuresTsx = `import React from 'react';
import type { FeaturesContent, IconName } from '@/types';
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
  <section className="section">
    <div className="container">
      <div className="center">
        <h2>{content.title}</h2>
        {content.subtitle && <p className="subtitle">{content.subtitle}</p>}
      </div>
      <div className="grid">
        {(content.features ?? []).map((f, i) => {
          const Icon = f.icon ? (ICONS[f.icon] ?? Star) : Star;
          return (
            <div key={i} className="card" style={{ textAlign: 'center' }}>
              <div className="featureIcon"><Icon size={20} /></div>
              <h3>{f.title}</h3>
              {f.description && <p>{f.description}</p>}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Features;
`;

const textTsx = `import React from 'react'
import type { TextContent } from '@/types'
const TextBlock: React.FC<{ content: TextContent }> = ({ content }) => (
  <section className="section">
    <div className="container center">
      <h2>{content.title}</h2>
      <p className="subtitle">{content.text}</p>
    </div>
  </section>
)
export default TextBlock
`;

const contactTsx = `import React from 'react'
import type { ContactContent } from '@/types'
const Contact: React.FC<{ content: ContactContent }> = ({ content }) => (
  <section className="section" style={{ background: 'linear-gradient(135deg,#e0f2fe,#e8eaf6)' }}>
    <div className="container center">
      <h2>{content.title}</h2>
      {content.subtitle && <p className="subtitle">{content.subtitle}</p>}
      <form style={{ maxWidth: 620, margin: '2rem auto', background:'#fff', borderRadius:16, boxShadow:'var(--shadow)', padding: '2rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
        <input type="text" placeholder="Tu nombre" />
        <input type="email" placeholder="tu@email.com" />
        <textarea placeholder="Tu mensaje..." rows={5}></textarea>
        <button type="submit" className="btn">Enviar Mensaje</button>
      </form>
    </div>
  </section>
)
export default Contact
`;

const ctaTsx = `import React from 'react'
import type { CTAContent } from '@/types'
const CTA: React.FC<{ content: CTAContent }> = ({ content }) => (
  <section className="section" style={{ background: 'linear-gradient(90deg,var(--secondary),var(--primary))', color:'#fff', textAlign:'center' }}>
    <h2>{content.title}</h2>
    {content.subtitle && <p className="subtitle" style={{ color:'#fff' }}>{content.subtitle}</p>}
    {content.buttonText && <a className="btn btn--light" href={content.buttonUrl || '#'}>{content.buttonText}</a>}
  </section>
)
export default CTA
`;

const testimonialsTsx = `import React from 'react'
import type { TestimonialsContent } from '@/types'
const Testimonials: React.FC<{ content: TestimonialsContent }> = ({ content }) => (
  <section className="section" style={{ background:'#f8fafc' }}>
    <div className="container center">
      <h2>{content.title}</h2>
      {content.subtitle && <p className="subtitle">{content.subtitle}</p>}
      <div className="grid">
        {(content.testimonials ?? []).map((t, i) => (
          <div key={i} className="card" style={{ display:'flex', alignItems:'center', flexDirection:'column' }}>
            <div style={{ fontStyle:'italic', color:'#555' }}>"{t.quote}"</div>
            {t.avatar && <img src={t.avatar} alt={t.author} style={{ width:80, height:80, borderRadius:'50%', objectFit:'cover', border:'3px solid var(--primary)', margin:'.75rem 0' }} />}
            <div style={{ fontWeight:600 }}>{t.author}</div>
            {t.role && <div style={{ color:'#666' }}>{t.role}</div>}
          </div>
        ))}
      </div>
    </div>
  </section>
)
export default Testimonials
`;

const imageTextTsx = `import React from 'react'
import type { ImageTextContent } from '@/types'
const ImageText: React.FC<{ content: ImageTextContent }> = ({ content }) => (
  <section className="section">
    <div className={content.imageRight ? 'imageText imageText--right' : 'imageText'}>
      <div className="imageText__image">
        <img src={content.imageUrl} alt={content.imageAlt ?? 'Imagen'} />
      </div>
      <div className="imageText__content">
        <h2>{content.title}</h2>
        <p className="subtitle">{content.text}</p>
        {content.buttonText && <a className="btn" href={content.buttonUrl || '#'}>{content.buttonText}</a>}
      </div>
    </div>
  </section>
)
export default ImageText
`;

const pricingTsx = `import React from 'react'
import type { PricingContent } from '@/types'
const Pricing: React.FC<{ content: PricingContent }> = ({ content }) => (
  <section className="section" style={{ background: 'linear-gradient(135deg,#e0f2fe,#e8eaf6)' }}>
    <div className="container center">
      <h2>{content.title}</h2>
      {content.subtitle && <p className="subtitle">{content.subtitle}</p>}
      <div className="pricing__grid">
        {(content.plans ?? []).map((p, i) => (
          <div key={i} className={p.highlight ? 'plan plan--highlight' : 'plan'}>
            <h3>{p.name}</h3>
            <div className="plan__price">{p.price}</div>
            {p.frequency && <p className="plan__freq">{p.frequency}</p>}
            <ul className="plan__list">
              {(p.features ?? []).map((f, k) => <li key={k}>{f}</li>)}
            </ul>
            {p.buttonText && <a className="btn" href={p.buttonUrl || '#'}>{p.buttonText}</a>}
          </div>
        ))}
      </div>
    </div>
  </section>
)
export default Pricing
`;

const listTsx = `import React from 'react'
import type { ListContent } from '@/types'
const ListBlock: React.FC<{ content: ListContent }> = ({ content }) => (
  <section className="section">
    <div className="container center">
      <h2>{content.title}</h2>
      <ul style={{ listStyle:'none', padding:0, maxWidth:800, margin:'0 auto' }}>
        {(content.items ?? []).map((i, idx) => (
          <li key={idx} style={{ background:'#f3f4f6', borderRadius:12, padding:'1rem', margin:'.5rem 0' }}>{i}</li>
        ))}
      </ul>
    </div>
  </section>
)
export default ListBlock
`;

const carouselTsx = `import React, { useRef, useState } from 'react'
import type { CarouselContent } from '@/types'
const Carousel: React.FC<{ content: CarouselContent }> = ({ content }) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  const imgs = content.images ?? []
  const go = (dir: number) => setI((prev) => (prev + dir + imgs.length) % imgs.length)
  return (
    <section className="section" style={{ background:'#f0f4f8' }}>
      <div className="container center">
        <h2>{content.title}</h2>
        <div className="carousel">
          <div ref={trackRef} className="carousel__track" style={{ transform: \`translateX(-\${i*100}%)\` }}>
            {imgs.map((src, idx) => (
              <div key={idx} className="carousel__slide"><img src={src} alt={\`Slide \${idx+1}\`} style={{ width:'100%', display:'block' }}/></div>
            ))}
          </div>
          <button className="carousel__btn carousel__btn--prev" onClick={() => go(-1)}>&#10094;</button>
          <button className="carousel__btn carousel__btn--next" onClick={() => go(1)}>&#10095;</button>
        </div>
      </div>
    </section>
  )
}
export default Carousel
`;

// ---------- RenderBlock dinámico SOLO con usados ----------
const renderBlockTsxDynamic = (used: Array<Block['type']>) => {
  const mapName: Record<Block['type'], string> = {
    'hero': 'Hero',
    'features': 'Features',
    'text': 'TextBlock',
    'contact': 'Contact',
    'call-to-action': 'CTA',
    'testimonials': 'Testimonials',
    'image-text': 'ImageText',
    'pricing': 'Pricing',
    'list': 'ListBlock',
    'carousel': 'Carousel',
  };

  const imports = used
    .map(t => `import ${mapName[t]} from '../blocks/${mapName[t]}'`)
    .join('\n');

  const cases = used
    .map(t => `    case '${t}': return <${mapName[t]} content={block.content}/>`).join('\n');

  return `import React from 'react'
import type { Block } from '@/types'
${imports}

const RenderBlock: React.FC<{ block: Block }> = ({ block }) => {
  switch (block.type) {
${cases}
    default: return null
  }
}
export default RenderBlock
`;
};

// ---------- Inyección del estado inicial (blocks, theme, lang, siteName) ----------
const preloadStateJs = (blocks: Block[], siteName: string, lang: string, theme: { primary: string; secondary: string }) => `// src/preloaded-state.js
window.__PRELOADED_STATE__ = {
  ui: { lang: ${JSON.stringify(lang)}, siteName: ${JSON.stringify(siteName)}, theme: ${JSON.stringify(theme)} },
  blocks: { items: ${JSON.stringify(blocks, null, 2)} }
};
`;

// ---------- Utilidad principal ----------
export const useExportReact = (siteNameFromPage: string) => {
  const exportReactAppZip = async (
    blocksInput: Block[] | undefined,
    lang: string,
    theme: { primary: string; secondary: string }
  ) => {
    const blocksSafe: Block[] = Array.isArray(blocksInput) ? blocksInput : [];
    const usedTypes = Array.from(new Set(blocksSafe.map(b => b.type)));
    const uses = (t: Block['type']) => usedTypes.includes(t);

    const blocks: Block[] = Array.isArray(blocksInput) ? blocksInput : [];
    const appName = siteNameFromPage.toLowerCase().replace(/[^a-z0-9-]+/g, '-');
    const zip = new JSZip();

    zip.file('package.json', pkgJson(appName, usedTypes));
    zip.file('tsconfig.json', tsconfig);
    zip.file('vite.config.ts', viteConfig);
    zip.file('index.html', indexHtml(siteNameFromPage));

    zip.file('src/main.tsx', mainTsx);
    zip.file('src/App.tsx', appTsx);
    zip.file('src/styles/global.css', globalCss);
    zip.file('src/pages/Home/Home.tsx', homeTsx);
    zip.file('src/pages/Home/Home.css', homeCss);

    zip.file('src/redux/store.ts', storeTs);
    zip.folder('src/redux/slices')!.file('ui.slice.ts', uiSlice);
    zip.folder('src/redux/slices')!.file('blocks.slice.ts', blocksSlice);

    zip.file('src/types.ts', typesTs);

    zip.folder('src/components/RenderBlock')!
      .file('RenderBlock.tsx', renderBlockTsxDynamic(usedTypes));

    const blocksDir = zip.folder('src/components/blocks')!;
    if (uses('hero')) blocksDir.file('Hero.tsx', heroTsx);
    if (uses('features')) blocksDir.file('Features.tsx', featuresTsx);
    if (uses('text')) blocksDir.file('TextBlock.tsx', textTsx);
    if (uses('contact')) blocksDir.file('Contact.tsx', contactTsx);
    if (uses('call-to-action')) blocksDir.file('CTA.tsx', ctaTsx);
    if (uses('testimonials')) blocksDir.file('Testimonials.tsx', testimonialsTsx);
    if (uses('image-text')) blocksDir.file('ImageText.tsx', imageTextTsx);
    if (uses('pricing')) blocksDir.file('Pricing.tsx', pricingTsx);
    if (uses('list')) blocksDir.file('ListBlock.tsx', listTsx);
    if (uses('carousel')) blocksDir.file('Carousel.tsx', carouselTsx);

    // Estado inicial
    zip.file('src/preloaded-state.js',
      preloadStateJs(blocks, siteNameFromPage, lang, theme)
    );

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${appName}.zip`);
  };

  return { exportReactAppZip };
};