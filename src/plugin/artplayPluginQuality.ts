export default function artplayerQuality(options: quality[], roomID: string) {
  return (art: patchedArtplayer) => {
    art.storage.name = roomID;
    const storageQuality = art.storage.get('quality') as string;
    let matched = false;
    options = options.map((option) => {
      if (storageQuality === option.html) {
        matched = true;
        return Object.assign(option, { default: true });
      } else return option;
    });
    if (!matched) options[0].default = true;
    art.controls.add({
      position: 'right',
      html: matched ? storageQuality : options[0].html,
      selector: options,
      onSelect: function (item: quality) {
        void art.switchQuality(item.url, item.html);
        art.storage.set('quality', item.html);
        return item.html;
      },
    });
    if (storageQuality) {
      const quality = options.find((item) => item.html === storageQuality);
      if (quality) {
        art.url = quality.url;
      } else {
        art.url = options[0].url;
      }
    } else {
      art.url = options[0].url;
    }
  };
}
