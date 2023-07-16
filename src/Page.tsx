import Artplayer from 'artplayer';
import Aplayer from './ArtPlayer.jsx';
import flvjs from 'flv.js';
import Hls from 'hls.js';
import artplayerPluginHlsQuality from 'artplayer-plugin-hls-quality';
import useUtils from './useUtils.js';
import { useParams } from 'react-router-dom';

const playFlv = (video: HTMLMediaElement, url: string, art: patchedArtplayer) => {
  if (flvjs.isSupported()) {
    if (art.flv) art.flv.destroy();
    const flv = flvjs.createPlayer({ type: 'flv', url }, { referrerPolicy: 'no-referrer' });
    flv.attachMediaElement(video);
    flv.load();
    art.flv = flv;
    art.on('destroy', () => flv.destroy());
  } else {
    art.notice.show = 'Unsupported playback format: flv';
  }
};
const playM3u8 = (video: HTMLMediaElement, url: string, art: patchedArtplayer) => {
  if (Hls.isSupported()) {
    if (art.hls) art.hls.destroy();
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    art.hls = hls;
    art.on('destroy', () => hls.destroy());
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = url;
  } else {
    art.notice.show = 'Unsupported playback format: m3u8';
  }
};
interface patchedArtplayer extends Artplayer {
  flv: { destroy: () => void };
  hls: { destroy: () => void };
}
export default function Page() {
  const { isFlv, isHls } = useUtils();
  const { id } = useParams();
  const env = import.meta.env;
  let url = '';
  for (const key in env) {
    if (Object.prototype.hasOwnProperty.call(env, key) && key == 'VITE_URL_' + id!) {
      url = env[key] as string;
    }
  }
  return (
    <div>
      <Aplayer
        option={{
          url,
          type: isHls(url) ? 'm3u8' : isFlv(url) ? 'flv' : '',
          customType: isHls(url) ? { m3u8: playM3u8 } : isFlv(url) ? { flv: playFlv } : {},
          pip: true,
          autoMini: true,
          screenshot: true,
          setting: true,
          fullscreen: true,
          fullscreenWeb: true,
          theme: '#23ade5',
          lock: true,
          autoplay: true,
          isLive: true,
          // moreVideoAttr: {
          //   crossOrigin: 'anonymous',
          // },
          plugins: [
            artplayerPluginHlsQuality({
              // Show quality in control
              control: true,
              // Show quality in setting
              setting: true,
              // Get the resolution text from level
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              getResolution: (level) => (level.height as string) + 'P',
              // I18n
              title: 'Quality',
              auto: 'Auto',
            }),
          ],
        }}
        style={{
          width: '100vw',
          height: '100vh',
          margin: '0',
          overflow: 'hidden',
        }}
        getInstance={(art) => console.info(art)}
      />
    </div>
  );
}
