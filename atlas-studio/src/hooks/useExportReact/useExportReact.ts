import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { Block } from '@/types/blocks';

// Helpers para “literalizar” valores
const lit = (s: unknown) => JSON.stringify(s ?? '');
const escAttr = (s: unknown) => String(s ?? '').replace(/`/g, '\\`');

// ---------- package.json ----------
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

// ---------- tsconfig ----------
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
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["src"]
}`;

// ---------- vite.config ----------
const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()], server: { port: 5173 } })
`;

// ---------- index.html ----------
const indexHtml = (siteName: string) => `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${siteName}</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;

// ---------- main.tsx ----------
const mainTsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>
)
`;

// ---------- App.tsx ----------
const appTsx = `import React from 'react'
import Home from './pages/Home/Home'
const App: React.FC = () => <Home />
export default App
`;

// ---------- Global CSS ----------
const globalCss = `
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  --radius: 16px;
  --shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  scroll-behavior: smooth;
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
.pricing {
  background: color-mix(in srgb, var(--secondary) 20%, transparent);
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

// ---------- Plantillas por bloque (contenido incrustado) ----------
const fileNameFor = (type: Block['type'], index: number) => {
  const base = {
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
  }[type];
  return index === 0 ? `${base}.tsx` : `${base}_${index + 1}.tsx`;
};

const heroInline = (c: any) => `import React from 'react'
const Hero: React.FC = () => (
  <section className="hero" style={{ backgroundImage: \`url('${escAttr(c.backgroundImage ?? '')}')\` }}>
    <div className="hero__overlay"></div>
    <div className="hero__content">
      <h1>${escAttr(c.title ?? '')}</h1>
      ${c.subtitle ? `<p>${escAttr(c.subtitle)}</p>` : ''}
      ${c.buttonText ? `<a className="btn" href="${escAttr(c.buttonUrl || '#')}">${escAttr(c.buttonText)}</a>` : ''}
    </div>
  </section>
)
export default Hero
`;

const featuresInline = (c: any) => {
  type IconKey =
    | 'rocket' | 'shield' | 'users' | 'star' | 'mail' | 'user' | 'quote'
    | 'image' | 'dollar-sign' | 'check' | 'list' | 'arrow-left' | 'arrow-right';

  const ICON_MAP: Record<IconKey, { import: string; local: string }> = {
    rocket: { import: 'Rocket', local: 'Rocket' },
    shield: { import: 'Shield', local: 'Shield' },
    users: { import: 'Users', local: 'Users' },
    star: { import: 'Star', local: 'Star' },
    mail: { import: 'Mail', local: 'Mail' },
    user: { import: 'User', local: 'User' },
    quote: { import: 'Quote', local: 'Quote' },
    image: { import: 'Image', local: 'LucideImage' },
    'dollar-sign': { import: 'DollarSign', local: 'DollarSign' },
    check: { import: 'Check', local: 'Check' },
    list: { import: 'List', local: 'List' },
    'arrow-left': { import: 'ArrowLeft', local: 'ArrowLeft' },
    'arrow-right': { import: 'ArrowRight', local: 'ArrowRight' },
  };

  const used: Array<{ import: string; local: string }> = [];
  const add = (key?: string) => {
    const k = (key?.toLowerCase() as IconKey) || 'star';
    const rec = ICON_MAP[k] ?? ICON_MAP['star'];
    if (!used.some(u => u.local === rec.local)) used.push(rec);
    return rec.local;
  };

  const features = Array.isArray(c.features) ? c.features : [];
  const itemJSX = features.map((f: any) => {
    const Comp = add(f?.icon);
    const title = (f?.title ?? '').toString().replace(/`/g, '\\`');
    const desc = (f?.description ?? '').toString().replace(/`/g, '\\`');
    return `
      <div className="card" style={{ textAlign: 'center' }}>
        <div className="featureIcon"><${Comp} size={20} /></div>
        <h3>${title}</h3>
        ${desc ? `<p>${desc}</p>` : ``}
      </div>`;
  }).join('\n');

  const named = used.filter(u => u.import === u.local).map(u => u.import);
  const aliased = used.filter(u => u.import !== u.local);
  const aliasedStr = aliased.map(u => `${u.import} as ${u.local}`);

  const importList = [...named, ...aliasedStr].join(', ') || 'Star';

  const title = (c?.title ?? '').toString().replace(/`/g, '\\`');
  const subtitle = (c?.subtitle ?? '').toString().replace(/`/g, '\\`');

  return `import React from 'react'
import { ${importList} } from 'lucide-react'

const Features: React.FC = () => (
  <section className="section">
    <div className="container">
      <div className="center">
        <h2>${title}</h2>
        ${subtitle ? `<p className="subtitle">${subtitle}</p>` : ``}
      </div>
      <div className="grid">
${itemJSX}
      </div>
    </div>
  </section>
)
export default Features
`;
};

const textInline = (c: any) => `import React from 'react'
const TextBlock: React.FC = () => (
  <section className="section">
    <div className="container center">
      <h2>${escAttr(c.title ?? '')}</h2>
      <p className="subtitle">${escAttr(c.text ?? '')}</p>
    </div>
  </section>
)
export default TextBlock
`;

const contactInline = (c: any) => `import React from 'react'
const Contact: React.FC = () => (
  <section className="section pricing">
    <div className="container center">
      <h2>${escAttr(c.title ?? '')}</h2>
      ${c.subtitle ? `<p className="subtitle">${escAttr(c.subtitle)}</p>` : ''}
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

const ctaInline = (c: any) => `import React from 'react'
const CTA: React.FC = () => (
  <section className="section" style={{ background: 'linear-gradient(90deg,var(--secondary),var(--primary))', color:'#fff', textAlign:'center' }}>
    <h2>${escAttr(c.title ?? '')}</h2>
    ${c.subtitle ? `<p className="subtitle" style={{ color:'#fff' }}>${escAttr(c.subtitle)}</p>` : ''}
    ${c.buttonText ? `<a className="btn btn--light" href="${escAttr(c.buttonUrl || '#')}">${escAttr(c.buttonText)}</a>` : ''}
  </section>
)
export default CTA
`;

const testimonialsInline = (c: any) => {
  const items = (c.testimonials ?? []).map((t: any) => `
      <div className="card" style={{ display:'flex', alignItems:'center', flexDirection:'column' }}>
        <div style={{ fontStyle:'italic', color:'#555' }}>"${escAttr(t.quote ?? '')}"</div>
        ${t.avatar ? `<img src="${escAttr(t.avatar)}" alt="${escAttr(t.author ?? '')}" style={{ width:80, height:80, borderRadius:'50%', objectFit:'cover', border:'3px solid var(--primary)', margin:'.75rem 0' }} />` : ''}
        <div style={{ fontWeight:600 }}>${escAttr(t.author ?? '')}</div>
        ${t.role ? `<div style={{ color:'#666' }}>${escAttr(t.role)}</div>` : ''}
      </div>`).join('\n');
  return `import React from 'react'
const Testimonials: React.FC = () => (
  <section className="section" style={{ background:'#f8fafc' }}>
    <div className="container center">
      <h2>${escAttr(c.title ?? '')}</h2>
      ${c.subtitle ? `<p className="subtitle">${escAttr(c.subtitle)}</p>` : ''}
      <div className="grid">
${items}
      </div>
    </div>
  </section>
)
export default Testimonials
`;
};

const imageTextInline = (c: any) => `import React from 'react'
const ImageText: React.FC = () => (
  <section className="section">
    <div className="${c.imageRight ? 'imageText imageText--right' : 'imageText'}">
      <div className="imageText__image">
        <img src="${escAttr(c.imageUrl ?? '')}" alt="${escAttr(c.imageAlt ?? 'Imagen')}" />
      </div>
      <div className="imageText__content">
        <h2>${escAttr(c.title ?? '')}</h2>
        <p className="subtitle">${escAttr(c.text ?? '')}</p>
        ${c.buttonText ? `<a className="btn" href="${escAttr(c.buttonUrl || '#')}">${escAttr(c.buttonText)}</a>` : ''}
      </div>
    </div>
  </section>
)
export default ImageText
`;

const pricingInline = (c: any) => {
  const plans = (c.plans ?? []).map((p: any) => `
        <div className="${p.highlight ? 'plan plan--highlight' : 'plan'}">
          <h3>${escAttr(p.name ?? '')}</h3>
          <div className="plan__price">${escAttr(p.price ?? '')}</div>
          ${p.frequency ? `<p className="plan__freq">${escAttr(p.frequency)}</p>` : ''}
          <ul className="plan__list">
            ${(p.features ?? []).map((f: any) => `<li>${escAttr(f)}</li>`).join('')}
          </ul>
          ${p.buttonText ? `<a className="btn" href="${escAttr(p.buttonUrl || '#')}">${escAttr(p.buttonText)}</a>` : ''}
        </div>`).join('\n');
  return `import React from 'react'
const Pricing: React.FC = () => (
  <section className="section pricing">
    <div className="container center">
      <h2>${escAttr(c.title ?? '')}</h2>
      ${c.subtitle ? `<p className="subtitle">${escAttr(c.subtitle)}</p>` : ''}
      <div className="pricing__grid">
${plans}
      </div>
    </div>
  </section>
)
export default Pricing
`;
};

const listInline = (c: any) => `import React from 'react'
const ListBlock: React.FC = () => (
  <section className="section">
    <div className="container center">
      <h2>${escAttr(c.title ?? '')}</h2>
      <ul style={{ listStyle:'none', padding:0, maxWidth:800, margin:'0 auto' }}>
        ${(c.items ?? []).map((i: any) => `<li style={{ background:'#f3f4f6', borderRadius:12, padding:'1rem', margin:'.5rem 0' }}>${escAttr(i)}</li>`).join('\n')}
      </ul>
    </div>
  </section>
)
export default ListBlock
`;

const carouselInline = (c: any) => `import React, { useState } from 'react'
const Carousel: React.FC = () => {
  const imgs = ${JSON.stringify(c.images ?? [])};
  const [i, setI] = useState(0);
  const go = (dir: number) => setI((prev) => (prev + dir + imgs.length) % imgs.length);
  return (
    <section className="section" style={{ background:'#f0f4f8' }}>
      <div className="container center">
        <h2>${escAttr(c.title ?? '')}</h2>
        <div className="carousel">
          <div className="carousel__track" style={{ transform: \`translateX(-\${i*100}%)\`, display:'flex', transition:'transform .5s ease' }}>
            {imgs.map((src, idx) => (
              <div key={idx} className="carousel__slide">
                <img src={src} alt={\`Slide \${idx+1}\`} style={{ width:'100%', display:'block' }}/>
              </div>
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

// Decide plantilla según tipo
const inlineComponentFor = (block: Block): string => {
  const c: any = (block as any).content ?? {};
  switch (block.type) {
    case 'hero': return heroInline(c);
    case 'features': return featuresInline(c);
    case 'text': return textInline(c);
    case 'contact': return contactInline(c);
    case 'call-to-action': return ctaInline(c);
    case 'testimonials': return testimonialsInline(c);
    case 'image-text': return imageTextInline(c);
    case 'pricing': return pricingInline(c);
    case 'list': return listInline(c);
    case 'carousel': return carouselInline(c);
    default: return `import React from 'react'\nexport default () => null\n`;
  }
};

// ---------- Home.tsx (importa cada componente generado y lo renderiza) ----------
const homeTsxInline = (siteName: string, generatedImports: string[], generatedUsages: string[]) => `import React from 'react'
import './Home.css'
${generatedImports.join('\n')}

const Home: React.FC = () => {
  return (
    <main>
      <header className="top">
        <h1>${escAttr(siteName)}</h1>
      </header>

${generatedUsages.map(u => `      ${u}`).join('\n')}

      <footer className="foot">© {new Date().getFullYear()} ${escAttr(siteName)}</footer>
    </main>
  )
}
export default Home
`;

// ---------- Home.css ----------
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
.top h1 { margin: 0; font-size: 1.1rem; }
.foot { text-align: center; padding: 2rem 1rem; color: #777; }
`;

// ---------- Hook principal ----------
export const useExportReact = (siteNameFromPage: string) => {
  const exportReactAppZip = async (
    blocksInput: Block[] | undefined,
    _lang: string, // ya no se usa porque incrustamos contenido
    _theme: { primary: string; secondary: string } // idem
  ) => {
    const blocks: Block[] = Array.isArray(blocksInput) ? blocksInput : [];
    const usedTypes = Array.from(new Set(blocks.map(b => b.type)));
    const appName = siteNameFromPage.toLowerCase().replace(/[^a-z0-9-]+/g, '-');

    const zip = new JSZip();

    // Raíz
    zip.file('package.json', pkgJson(appName, usedTypes));
    zip.file('tsconfig.json', tsconfig);
    zip.file('vite.config.ts', viteConfig);
    zip.file('index.html', indexHtml(siteNameFromPage));

    // src base
    zip.file('src/main.tsx', mainTsx);
    zip.file('src/App.tsx', appTsx);
    zip.file('src/styles/global.css', globalCss);

    // Generar componentes inlined y Home
    const blocksDir = zip.folder('src/components/blocks')!;

    const imports: string[] = [];
    const usages: string[] = [];

    blocks.forEach((b, idx) => {
      const fileName = fileNameFor(b.type, blocks.filter(x => x.type === b.type && x !== b).length ? idx : blocks.findIndex(x => x === b));
      // Asegurar nombres únicos y ordenados por índice global
      const baseName = fileName.replace('.tsx', '');
      const path = `src/components/blocks/${fileName}`;

      blocksDir.file(fileName, inlineComponentFor(b));
      imports.push(`import ${baseName} from '../../components/blocks/${baseName}'`);
      usages.push(`<${baseName} />`);
    });

    zip.file('src/pages/Home/Home.tsx', homeTsxInline(siteNameFromPage, imports, usages));
    zip.file('src/pages/Home/Home.css', homeCss);

    // Generar y descargar
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${appName}.zip`);
  };

  return { exportReactAppZip };
};