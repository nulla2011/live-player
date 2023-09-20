import Spinner from 'react-spinner-material';
import Aplayer from './ArtPlayer.js';
import useGetOption from '../hooks/useGetOption.js';
import useFetch from '../hooks/useFetch.js';
import './LivePlayer.css';

export default function LivePlayer() {
  const { data, isLoading, error } = useFetch();
  const option = useGetOption(data);
  if (isLoading) {
    return (
      <div className="center fullPage">
        <Spinner color="#CCC" radius={50} />
      </div>
    );
  } else if (error) {
    console.error(error);
    return (
      <div className="center fullPage">
        <pre className="error">{error.message}</pre>
      </div>
    );
  } else if (data) {
    return (
      <Aplayer option={option!} className="fullPage" getInstance={(art) => console.info(art)} />
    );
  } else return null;
}
