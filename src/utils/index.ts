export const isHls = (url: string) => {
  return /\.m3u8/.test(url);
};
export const isFlv = (url: string) => {
  return /\.flv/.test(url);
};
