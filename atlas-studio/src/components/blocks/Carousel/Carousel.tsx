import React from 'react';
import s from '../blocks.module.scss';
import type { CarouselContent } from '@/types/blocks';
import { useCarousel } from '@/hooks/useCarousel/useCarousel';

const Carousel: React.FC<{ idForButtons: string; content: CarouselContent }> = ({ idForButtons, content }) => {
  const { containerRef } = useCarousel(true, `track-${idForButtons}`);
  return (
    <section className={s.carousel}>
      <div className={s.container}>
        <h2>{content.title ?? 'Nuestra Galería de Imágenes'}</h2>
        <div className={s.carouselContainer} ref={containerRef}>
          <div className={`${s.carouselTrack} carouselTrack`} id={`track-${idForButtons}`}>
            {(content.images ?? [
              'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&h=500&fit=crop',
              'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=500&fit=crop',
              'https://images.unsplash.com/photo-1465146344425-ad4358294f7e?w=800&h=500&fit=crop',
            ]).map((src, i) => (
              <div key={i} className={s.slide}><img src={src} alt={`Slide ${i + 1}`} /></div>
            ))}
          </div>
          <button className={`${s.carouselBtn} ${s.carouselBtnPrev}`} data-carousel-id={`track-${idForButtons}`} data-direction="prev">‹</button>
          <button className={`${s.carouselBtn} ${s.carouselBtnNext}`} data-carousel-id={`track-${idForButtons}`} data-direction="next">›</button>
        </div>
      </div>
    </section>
  );
};

export default Carousel;