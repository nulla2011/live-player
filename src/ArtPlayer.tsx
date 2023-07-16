import { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';

interface playerProps {
  option: { url: string; [key: string]: unknown };
  getInstance: (a: unknown) => void;
  [key: string]: unknown;
}
export default function Player({ option, getInstance, ...rest }: playerProps) {
  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const art = new Artplayer({
      ...option,
      container: artRef.current!,
    });

    if (getInstance && typeof getInstance === 'function') {
      getInstance(art);
    }

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={artRef} {...rest}></div>;
}
