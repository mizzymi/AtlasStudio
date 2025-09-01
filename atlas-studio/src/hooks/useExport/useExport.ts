import JSZip from 'jszip';
import type { Block } from '@/types/blocks';

const escapeHtml = (s?: string) => (s ?? '').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export const generateHTML = (blocks: Block[], siteName = 'Mi Sitio') => {
  const blocksHTML = blocks.map((block) => {
    switch (block.type) {
      case 'hero':
        return `
<section class="hero" style="--bg:url('${escapeHtml(block.content.backgroundImage)}')">
  <div class="hero__overlay"></div>
  <div class="hero__content">
    <h1>${escapeHtml(block.content.title)}</h1>
    <p>${escapeHtml(block.content.subtitle)}</p>
    <button>${escapeHtml(block.content.buttonText)}</button>
  </div>
</section>`;
      case 'features': {
        const items = (block.content.features ?? []).map(f => `
  <div class="feature">
    <div class="feature__icon">★</div>
    <h3>${escapeHtml(f.title)}</h3>
    <p>${escapeHtml(f.description)}</p>
  </div>`).join('');
        return `
<section class="features">
  <h2>${escapeHtml(block.content.title)}</h2>
  <p class="features__subtitle">${escapeHtml(block.content.subtitle)}</p>
  <div class="features__grid">${items}</div>
</section>`;
      }
      case 'text':
        return `
<section class="text">
  <h2>${escapeHtml(block.content.title)}</h2>
  <p>${escapeHtml(block.content.text)}</p>
</section>`;
      case 'contact':
        return `
<section class="contact">
  <h2>${escapeHtml(block.content.title)}</h2>
  <p>${escapeHtml(block.content.subtitle)}</p>
  <form>
    <input type="text" placeholder="Tu nombre" />
    <input type="email" placeholder="tu@email.com" />
    <textarea placeholder="Tu mensaje..."></textarea>
    <button type="submit">Enviar Mensaje</button>
  </form>
</section>`;
      case 'call-to-action':
        return `
<section class="cta">
  <h2>${escapeHtml(block.content.title)}</h2>
  <p>${escapeHtml(block.content.subtitle)}</p>
  <button>${escapeHtml(block.content.buttonText)}</button>
</section>`;
      case 'testimonials': {
        const items = (block.content.testimonials ?? []).map(t => `
  <div class="testimonial">
    <div class="testimonial__quote">"${escapeHtml(t.quote)}"</div>
    ${t.avatar ? `<img class="testimonial__avatar" src="${escapeHtml(t.avatar)}" alt="${escapeHtml(t.author)}"/>` : ''}
    <div class="testimonial__author">${escapeHtml(t.author)}</div>
    <div class="testimonial__role">${escapeHtml(t.role)}</div>
  </div>`).join('');
        return `
<section class="testimonials">
  <h2>${escapeHtml(block.content.title)}</h2>
  <p class="testimonials__subtitle">${escapeHtml(block.content.subtitle)}</p>
  <div class="testimonials__grid">${items}</div>
</section>`;
      }
      case 'image-text':
        return `
<section class="imageText ${block.content.imageRight ? 'imageText--right' : ''}">
  <div class="imageText__image"><img src="${escapeHtml(block.content.imageUrl)}" alt="${escapeHtml(block.content.imageAlt)}"/></div>
  <div class="imageText__content">
    <h2>${escapeHtml(block.content.title)}</h2>
    <p>${escapeHtml(block.content.text)}</p>
    ${block.content.buttonText ? `<button>${escapeHtml(block.content.buttonText)}</button>` : ''}
  </div>
</section>`;
      case 'pricing': {
        const plans = (block.content.plans ?? []).map(p => `
  <div class="plan ${p.highlight ? 'plan--highlight' : ''}">
    <h3>${escapeHtml(p.name)}</h3>
    <div class="plan__price">${escapeHtml(p.price)}</div>
    <p class="plan__freq">${escapeHtml(p.frequency)}</p>
    <ul class="plan__list">${(p.features ?? []).map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
    <button>${escapeHtml(p.buttonText)}</button>
  </div>`).join('');
        return `
<section class="pricing">
  <h2>${escapeHtml(block.content.title)}</h2>
  <p class="pricing__subtitle">${escapeHtml(block.content.subtitle)}</p>
  <div class="pricing__grid">${plans}</div>
</section>`;
      }
      case 'list':
        return `
<section class="list">
  <h2>${escapeHtml(block.content.title)}</h2>
  <ul>${(block.content.items ?? []).map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>
</section>`;
      case 'carousel':
        return `
<section class="carousel">
  <h2>${escapeHtml(block.content.title)}</h2>
  <div class="carousel__container">
    <div class="carousel__track" id="track-${block.id}">
      ${(block.content.images ?? []).map((src, i) => `<div class="carousel__slide"><img src="${escapeHtml(src)}" alt="Slide ${i+1}"/></div>`).join('')}
    </div>
    <button class="carousel__btn" data-carousel-id="track-${block.id}" data-direction="prev">&#10094;</button>
    <button class="carousel__btn" data-carousel-id="track-${block.id}" data-direction="next">&#10095;</button>
  </div>
</section>`;
      default:
        return `<div>Bloque no reconocido</div>`;
    }
  }).join('\n');

  const jsImports = blocks.some(b => b.type === 'carousel') ? '<script src="carousel.js"></script>' : '';

  return `<!doctype html><html lang="es"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${escapeHtml(siteName)}</title><link rel="stylesheet" href="style.css"/></head><body>${blocksHTML}${jsImports}</body></html>`;
};

export const generateCSS = () => `
/* Variables */
:root{--primary:#667eea;--secondary:#764ba2;--radius:16px;--shadow:0 8px 20px rgba(0,0,0,.08)}
body{font-family:system-ui,sans-serif;margin:0;line-height:1.6;color:#333;background:#f7f8fb}
button{padding:1rem 1.25rem;border:0;border-radius:12px;cursor:pointer}

/* HERO */
.hero{position:relative;min-height:100vh;display:grid;place-items:center;text-align:center;color:#fff;background-size:cover;background-position:center}
.hero{background-image:var(--bg)}
.hero__overlay{position:absolute;inset:0;background:rgba(0,0,0,.5)}
.hero__content{position:relative;padding:3rem;max-width:820px}
.hero__content h1{font-size:clamp(2rem,6vw,3.5rem);background:linear-gradient(90deg,#fff,#ddd);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero__content p{opacity:.9}
.hero__content button{background:linear-gradient(135deg,var(--primary),var(--secondary));color:#fff;box-shadow:var(--shadow)}

/* FEATURES */
.features{padding:5rem 1rem;background:#f8fafc;text-align:center}
.features__subtitle{color:#666;max-width:800px;margin:0 auto 2rem}
.features__grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem;max-width:1200px;margin:0 auto}
.feature{background:#fff;border-radius:16px;box-shadow:var(--shadow);padding:1.5rem}
.feature__icon{width:56px;height:56px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(135deg,var(--primary),var(--secondary));color:#fff;margin:0 auto 1rem}

/* TEXT */
.text{padding:5rem 1rem;text-align:center}
.text p{max-width:800px;margin:0 auto}

/* CONTACT */
.contact{padding:5rem 1rem;background:linear-gradient(135deg,#e0f2fe,#e8eaf6);text-align:center}
.contact form{max-width:620px;margin:2rem auto;background:#fff;border-radius:16px;box-shadow:var(--shadow);padding:2rem;display:flex;flex-direction:column;gap:1rem}
.contact input,.contact textarea{padding:1rem;border:1px solid #e5e7eb;border-radius:12px;font:inherit}
.contact button{background:linear-gradient(135deg,var(--primary),var(--secondary));color:#fff}

/* CTA */
.cta{padding:5rem 1rem;background:linear-gradient(90deg,var(--secondary),var(--primary));color:#fff;text-align:center}
.cta button{background:#fff;color:#4c51bf}

/* TESTIMONIALS */
.testimonials{padding:5rem 1rem;background:#f8fafc;text-align:center}
.testimonials__subtitle{color:#666;max-width:800px;margin:0 auto 2rem}
.testimonials__grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;max-width:1200px;margin:0 auto}
.testimonial{background:#fff;border-radius:16px;box-shadow:var(--shadow);padding:1.5rem;display:flex;flex-direction:column;align-items:center}
.testimonial__quote{font-style:italic;color:#555}
.testimonial__avatar{width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid var(--primary);margin:.75rem 0}

/* IMAGE + TEXT */
.imageText{padding:5rem 1rem;display:grid;grid-template-columns:1fr 1fr;gap:2rem;max-width:1200px;margin:0 auto}
.imageText--right{direction:rtl}
.imageText--right .imageText__content{direction:ltr}
.imageText__image img{width:100%;border-radius:16px;box-shadow:var(--shadow)}
.imageText__content h2{margin-top:0}
.imageText__content button{background:linear-gradient(135deg,var(--primary),var(--secondary));color:#fff}

/* PRICING */
.pricing{padding:5rem 1rem;background:linear-gradient(135deg,#e0f2fe,#e8eaf6);text-align:center}
.pricing__grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem;max-width:1200px;margin:0 auto}
.plan{background:#fff;border-radius:16px;box-shadow:var(--shadow);padding:2rem}
.plan--highlight{outline:3px solid var(--primary);transform:translateY(-4px)}
.plan__price{font-size:2.25rem;color:var(--primary);font-weight:800}
.plan__list{list-style:none;padding:0}
.plan__list li{display:flex;align-items:center;gap:.5rem}
.plan__list li::before{content:'✓';color:#16a34a;font-weight:700}

/* LIST */
.list{padding:5rem 1rem;text-align:center}
.list ul{list-style:none;padding:0;max-width:800px;margin:0 auto}
.list li{background:#f3f4f6;border-radius:12px;padding:1rem;margin:.5rem 0}

/* CAROUSEL */
.carousel{padding:5rem 1rem;background:#f0f4f8;text-align:center}
.carousel__container{position:relative;max-width:900px;margin:0 auto;overflow:hidden;border-radius:16px;box-shadow:var(--shadow)}
.carousel__track{display:flex;transition:transform .5s ease}
.carousel__slide{flex:0 0 100%}
.carousel__slide img{display:block;width:100%}
.carousel__btn{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.85);border:0;border-radius:999px;padding:.6rem 1rem;cursor:pointer}
.carousel__btn[data-direction="prev"]{left:1rem}
.carousel__btn[data-direction="next"]{right:1rem}

@media (max-width: 768px){
  .imageText{grid-template-columns:1fr}
}
`;

export const downloadAsZip = async (html: string, css: string, siteName = 'mi-sitio') => {
  const zip = new JSZip();
  zip.file('index.html', html);
  zip.file('style.css', css);

  if (html.includes('<script src="carousel.js"></script>')) {
    const js = `document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('.carousel__container').forEach(c=>{const t=c.querySelector('.carousel__track');if(!t)return;const slides=Array.from(t.children);let i=0;const up=()=>{(t as HTMLElement).style.transform=\`translateX(-\${i*100}%)\`;};const id=(t as HTMLElement).id;const prev=document.querySelector(\`[data-carousel-id="\${id}"][data-direction="prev"]\`);const next=document.querySelector(\`[data-carousel-id="\${id}"][data-direction="next"]\`);prev?.addEventListener('click',()=>{i=(i-1+slides.length)%slides.length;up();});next?.addEventListener('click',()=>{i=(i+1)%slides.length;up();});});});`;
    zip.file('carousel.js', js);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `${siteName.toLowerCase().replace(/\s+/g,'-')}.zip`;
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
};

export const useExport = (siteName: string) => {
  const exportZip = async (blocks: Block[]) => {
    const html = generateHTML(blocks, siteName);
    const css = generateCSS();
    await downloadAsZip(html, css, siteName);
  };
  return { exportZip };
};