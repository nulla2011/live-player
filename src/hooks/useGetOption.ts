import Artplayer from 'artplayer';
import flvjs from 'flv.js';
import Hls from 'hls.js';
import artplayerPluginHlsQuality from 'artplayer-plugin-hls-quality';
import { isFlv, isHls } from '../utils';
import { useParams } from 'react-router-dom';

interface patchedArtplayer extends Artplayer {
  flv: { destroy: () => void };
  hls: { destroy: () => void };
}
interface quality {
  html: string;
  url: string;
  default?: boolean;
}

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

export default () => {
  const { id } = useParams();
  const env = import.meta.env;
  const keyList: string[] = [];
  for (const key in env) {
    if (Object.prototype.hasOwnProperty.call(env, key) && key.startsWith('VITE_URL_' + id!)) {
      keyList.push(key);
    }
  }
  const quality: quality[] = [];
  keyList
    .filter((key) => key.startsWith('VITE_URL_' + id! + '_'))
    .forEach((key) => {
      quality.push({
        html: key.split('_')[3] + 'P',
        url: env[key] as string,
      });
    });
  let url = '';
  if (keyList.includes('VITE_URL_' + id!)) {
    url = env['VITE_URL_' + id!] as string;
  }
  if (quality.length > 0) {
    quality.sort((a, b) => parseInt(b.html) - parseInt(a.html));
    url = quality[0].url;
    quality[0].default = true;
  }
  const option = {
    url,
    ...(quality.length > 0 ? { quality } : {}),
    // type: isHls(url) ? 'm3u8' : isFlv(url) ? 'flv' : '',
    customType: isHls(url) ? { m3u8: playM3u8 } : isFlv(url) ? { flv: playFlv } : {},
    pip: true,
    screenshot: true,
    setting: true,
    fullscreen: true,
    fullscreenWeb: true,
    theme: '#23ade5',
    volume: 1,
    lock: true,
    autoplay: true,
    lang: navigator.language.toLowerCase(),
    mutex: true,
    autoOrientation: true,
    backdrop: true,
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
        getResolution: (level) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const height = level.height as number;
          if (height && height > 0) {
            return String(height) + 'P';
          } else return 'Source';
        },
        // I18n
        title: 'Quality',
        auto: 'Auto',
      }),
    ],
  };
  return option;
};
