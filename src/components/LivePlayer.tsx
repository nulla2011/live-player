'use client';
import Aplayer from './ArtPlayer';
import getOption from '@/utils/getOption';
import './LivePlayer.css';

export default function Page({ urls, id }: { urls: URLs; id: string }) {
  const option = getOption(urls, id);
  return <Aplayer option={option} className="player" getInstance={(art) => console.info(art)} />;
}
