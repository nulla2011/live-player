import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
// import Script from 'next/script';
import LivePlayer from '@/components/LivePlayer';
// import { isFlv, isHls } from '@/utils';

async function getData() {
  const rooms: Promise<Record<string, URLs>> = fetch(process.env.URL_LIVE!, {
    next: { revalidate: 5 },
  }).then((res) => res.json());
  return rooms;
}
export async function generateStaticParams() {
  const rooms = await getData();
  return Object.keys(rooms).map((k) => ({ id: k }));
}
export default async function Room({ params }: { params: { id: string } }) {
  const { id } = params;
  const rooms = await getData();
  const urls = rooms[id];
  revalidatePath('/[id]', 'page');
  if (!urls) {
    return notFound();
  } else {
    // let includesFlv: boolean;
    // let includesHls: boolean;
    // if (typeof urls === 'string') {
    //   includesHls = isHls(urls);
    //   includesFlv = isFlv(urls);
    // } else {
    //   includesHls = Object.values(urls).some((url) => isHls(url));
    //   includesFlv = Object.values(urls).some((url) => isFlv(url));
    // }
    return (
      // <>
      //   <Script
      //     src="https://cdn.staticfile.org/artplayer/5.0.9/artplayer.js"
      //     strategy="beforeInteractive"
      //   />
      //   {includesHls && (
      //     <Script
      //       src="https://cdn.staticfile.org/hls.js/1.4.9/hls.min.js"
      //       strategy="beforeInteractive"
      //     />
      //   )}
      //   {includesFlv && (
      //     <Script
      //       src="https://cdn.staticfile.org/flv.js/1.6.2/flv.min.js"
      //       strategy="beforeInteractive"
      //     />
      //   )}
      <LivePlayer urls={urls} id={id} />
      // </>
    );
  }
}
