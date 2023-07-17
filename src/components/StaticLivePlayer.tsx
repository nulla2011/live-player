import Aplayer from './ArtPlayer.js';
import useGetOption from '../hooks/useGetOption.js';
import './StaticLivePlayer.css';

export default function Page() {
  const option = useGetOption();
  return <Aplayer option={option} className="player" getInstance={(art) => console.info(art)} />;
}
