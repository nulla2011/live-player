'use client';
import { useEffect, useState } from 'react';
import Aplayer from './ArtPlayer';
import Warn from './Warn';
import './LivePlayer.css';

export default function Page({ urls, id }: { urls: URLs; id: string }) {
  const [warn, setWarn] = useState(false);
  useEffect(() => {
    document.addEventListener('ios-not-supported', () => {
      setWarn(true);
    });
  }, []);
  return (
    <>
      {warn && <Warn text="此直播暂时无法使用 iOS 观看" close={() => setWarn(false)} />}
      <Aplayer className="a-player" urls={urls} id={id} getInstance={(art) => console.info(art)} />
    </>
  );
}
