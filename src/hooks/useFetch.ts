import useSWR from 'swr';
import Axios from 'axios';

const apiUrl = import.meta.env.VITE_API;
const fetcher = (link: string): Promise<api> => Axios.get(link).then((res) => res.data);

export default function useFetch() {
  const { data, error, isLoading } = useSWR(apiUrl, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
  return {
    data,
    isLoading,
    error,
  };
}
