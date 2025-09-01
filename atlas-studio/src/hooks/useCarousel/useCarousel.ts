import { useEffect, useRef } from 'react';


export const useCarousel = (enabled: boolean, carouselId: string) => {
const containerRef = useRef<HTMLDivElement | null>(null);


useEffect(() => {
if (!enabled || !containerRef.current) return;
const container = containerRef.current;
const track = container.querySelector<HTMLElement>('.carouselTrack');
if (!track) return;
const slides = Array.from(track.children);
let idx = 0;
const prevBtn = container.querySelector(`[data-carousel-id="${carouselId}"][data-direction="prev"]`);
const nextBtn = container.querySelector(`[data-carousel-id="${carouselId}"][data-direction="next"]`);


const update = () => { track.style.transform = `translateX(-${idx * 100}%)`; };
const prev = () => { idx = (idx - 1 + slides.length) % slides.length; update(); };
const next = () => { idx = (idx + 1) % slides.length; update(); };


prevBtn?.addEventListener('click', prev);
nextBtn?.addEventListener('click', next);
update();


return () => {
prevBtn?.removeEventListener('click', prev);
nextBtn?.removeEventListener('click', next);
};
}, [enabled, carouselId]);


return { containerRef };
};