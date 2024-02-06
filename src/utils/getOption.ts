import artplayerPluginHlsQuality from 'artplayer-plugin-hls-quality';
import artplayPluginQuality from '../plugin/artplayPluginQuality';
import { isFlv, isHls } from '../utils';
import { playFlv, playHls } from '../utils/initVideoCore';

export const getOption = (urls: URLs, id: string) => {
  const quality: quality[] = [];
  let url = '';
  let singleM3u8 = false;
  if (typeof urls === 'object') {
    Object.entries(urls).forEach(([k, v]) => {
      quality.push({
        html: k,
        url: v,
      });
    });
    quality.sort((a, b) => parseInt(b.html) - parseInt(a.html));
    url = quality[0].url;
    // quality[0].default = true;
  } else {
    url = urls;
    singleM3u8 = true;
  }
  let customType = {};
  if (isHls(url)) {
    customType = { m3u8: playHls };
  } else if (isFlv(url)) {
    customType = { flv: playFlv };
  }
  const option = {
    url,
    // ...(quality.length > 0 ? { quality } : {}),
    // type: isHls(url) ? 'm3u8' : isFlv(url) ? 'flv' : '',
    customType,
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
        control: singleM3u8,
        // Show quality in setting
        setting: true,
        // Get the resolution text from level
        getResolution: (level) => {
          const height = level.height as number;
          if (height && height > 0) {
            return String(height) + 'P';
          } else return 'Source';
        },
        // I18n
        title: 'Quality',
        auto: 'Auto',
      }),
      ...(quality.length > 0 ? [artplayPluginQuality(quality, id)] : []),
    ],
  };
  return option;
};
