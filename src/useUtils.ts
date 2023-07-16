export default () => {
  const isHls = (url: string) => {
    return /\.m3u8/.test(url);
  };
  const isFlv = (url: string) => {
    return /\.flv/.test(url);
  };
  return { isFlv, isHls };
};
