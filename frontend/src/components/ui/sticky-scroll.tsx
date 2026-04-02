import { ReactLenis } from 'lenis/react';
import { forwardRef } from 'react';

const propertyImages = [
  { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', alt: 'Lake View Villa' },
  { src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', alt: 'Modern City Apartment' },
  { src: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800', alt: 'Mountain Retreat Cottage' },
  { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800', alt: 'Riverside Bungalow' },
  { src: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800', alt: 'Heritage Townhouse' },
  { src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', alt: 'Sunset Penthouse' },
  { src: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800', alt: 'Garden Estate' },
  { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', alt: 'Hilltop Haven' },
  { src: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800', alt: 'Cozy Studio Flat' },
  { src: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800', alt: 'Luxury Farmhouse' },
  { src: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800', alt: 'Tropical Garden Villa' },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', alt: 'Glass Wall Residence' },
  { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800', alt: 'Pagoda Style Home' },
];

const StickyScroll = forwardRef<HTMLElement>((_props, ref) => {
  const left = propertyImages.slice(0, 5);
  const center = propertyImages.slice(5, 8);
  const right = propertyImages.slice(8, 13);

  return (
    <ReactLenis root>
      <main className='bg-black' ref={ref}>
        <div className='wrapper'>
          <section className='text-white h-screen w-full bg-slate-950 grid place-content-center sticky top-0'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
            <h1 className='2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]'>
              Find Your Dream Property
              <br />
              Browse Our Collection <br />
              Scroll down!
            </h1>
          </section>
        </div>

        <section className='text-white w-full bg-slate-950'>
          <div className='grid grid-cols-12 gap-2'>
            <div className='grid gap-2 col-span-4'>
              {left.map((img, i) => (
                <figure className='w-full' key={i}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                  />
                </figure>
              ))}
            </div>
            <div className='sticky top-0 h-screen w-full col-span-4 gap-2 grid grid-rows-3'>
              {center.map((img, i) => (
                <figure className='w-full h-full' key={i}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-md'
                  />
                </figure>
              ))}
            </div>
            <div className='grid gap-2 col-span-4'>
              {right.map((img, i) => (
                <figure className='w-full' key={i}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <footer className='group bg-slate-950'>
          <h1 className='text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear'>
            BuyerPortal
          </h1>
          <div className='bg-black h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'></div>
        </footer>
      </main>
    </ReactLenis>
  );
});

StickyScroll.displayName = 'StickyScroll';

export default StickyScroll;
