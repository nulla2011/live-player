interface patchedArtplayer extends Artplayer {
  flv: { destroy: () => void };
  hls: { destroy: () => void };
  switchQuality(url: string, html?: string): Promise<void>;
}
interface quality {
  html: string;
  url: string;
  default?: boolean;
}
interface api {
  [key: string | number]: string | Record<string, string>;
}
