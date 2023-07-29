export default (options: quality[], roomID: string) => {
  return (art: patchedArtplayer) => {
    art.storage.name = roomID;
    const storageQuality = art.storage.get('quality') as string;
    art.controls.add({
      position: 'right',
      html: storageQuality || options[0].html,
      selector: storageQuality
        ? options.map((option) => {
            if (storageQuality === option.html) {
              return Object.assign(option, { default: true });
            } else return option;
          })
        : options.map((option, index) => {
            if (index === 0) {
              return Object.assign(option, { default: true });
            } else return option;
          }),
      onSelect: function (item: quality) {
        void art.switchQuality(item.url, item.html);
        art.storage.name = roomID;
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
};
