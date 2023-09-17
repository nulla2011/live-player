import { useParams } from 'react-router-dom';
import artplayerPluginHlsQuality from 'artplayer-plugin-hls-quality';
import artplayPluginQuality from '../plugin/artplayPluginQuality';
import { isFlv, isHls } from '../utils';
import { playFlv, playHls } from '../utils/initVideoCore';

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
        html: key.split('_')[3],
        url: env[key] as string,
      });
    });
  let url = '';
  let singleStream = false;
  if (keyList.includes('VITE_URL_' + id!)) {
    url = env['VITE_URL_' + id!] as string;
    singleStream = true;
  }
  if (quality.length > 0) {
    quality.sort((a, b) => parseInt(b.html) - parseInt(a.html));
    url = quality[0].url;
    // quality[0].default = true;
  }
  const option = {
    url,
    // ...(quality.length > 0 ? { quality } : {}),
    // type: isHls(url) ? 'm3u8' : isFlv(url) ? 'flv' : '',
    customType: isHls(url) ? { m3u8: playHls } : isFlv(url) ? { flv: playFlv } : {},
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
    flip: true,
    isLive: true,
    // moreVideoAttr: {
    //   crossOrigin: 'anonymous',
    // },
    plugins: [
      artplayerPluginHlsQuality({
        // Show quality in control
        control: singleStream,
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
      ...(quality.length > 0 ? [artplayPluginQuality(quality, id!)] : []),
    ],
  };
  return option;
};
