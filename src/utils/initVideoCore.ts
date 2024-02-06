import flvjs from 'flv.js';
import Hls from 'hls.js';
import { getQuery } from '../utils';

export const playFlv = (video: HTMLMediaElement, url: string, art: patchedArtplayer) => {
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
export const playHls = (video: HTMLMediaElement, url: string, art: patchedArtplayer) => {
  if (Hls.isSupported()) {
    if (art.hls) art.hls.destroy();
    const hls = new Hls(
      url.startsWith('https://stream.live.epl')
        ? {
            xhrSetup: (xhr, xhrUrl) => {
              if (!xhrUrl.includes('?')) {
                xhr.open('GET', xhrUrl + getQuery(url));
              } else if (/\.ts\?m=/.test(xhrUrl)) {
                xhr.open('GET', xhrUrl.split('?')[0] + getQuery(url));
              }
            },
          }
        : {}
    );
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
