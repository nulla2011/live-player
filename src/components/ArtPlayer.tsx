'use client';
import { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';

interface playerProps {
  urls: URLs;
  id: string;
  getInstance: (a: unknown) => void;
  [key: string]: unknown;
}
export default function Player({ urls, id, getInstance, ...rest }: playerProps) {
  const artRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let art;
    const initArt = async () => {
      const { getOption } = await import('@/utils/getOption');
      const option = getOption(urls, id);
      art = new Artplayer({
        ...option,
        container: artRef.current!,
      });
      if (getInstance && typeof getInstance === 'function') {
        getInstance(art);
      }
    };
    initArt();

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={artRef} {...rest}></div>;
}
