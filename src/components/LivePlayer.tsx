'use client';
import { useEffect } from 'react';
import Aplayer from './ArtPlayer';
import './LivePlayer.css';

export default function Page({ urls, id }: { urls: URLs; id: string }) {
  return (
    <Aplayer urls={urls} id={id} className="player" getInstance={(art) => console.info(art)} />
  );
}
