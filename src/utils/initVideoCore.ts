import { getQuery } from '../utils';

export const playFlv = async (video: HTMLMediaElement, url: string, art: patchedArtplayer) => {
  const flvjs = await import('flv.js').then((flv) => flv.default);
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
export const playHls = async (video: HTMLMediaElement, url: string, art: patchedArtplayer) => {
  const Hls = await import('hls.js').then((hls) => hls.default);
  const isEp = url.startsWith('https://stream.live.epl');
  if (Hls.isSupported()) {
    if (art.hls) art.hls.destroy();
    const hls = new Hls(
      isEp
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
    if (isEp) {
      document.dispatchEvent(new Event('ios-not-supported'));
    }
  } else {
    art.notice.show = 'Unsupported playback format: m3u8';
  }
};
