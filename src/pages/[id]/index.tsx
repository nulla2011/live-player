import Head from 'next/head';
import { useRouter } from 'next/router';
import Aplayer from '../../components/ArtPlayer';
import getOption from './getOption';
import c from './player.module.css';

export default function Page() {
  const router = useRouter();
  const option = getOption(router.query!.id as string);
  return (
    <>
      <Head>
        <title>Live</title>
        <meta name="description" content="A simple live stream player" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Aplayer option={option} className={c.player} getInstance={(art) => console.info(art)} />
      </body>
    </>
  );
}
