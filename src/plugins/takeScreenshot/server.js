const path = require('path');
const jimp = require('jimp');
const opn = require('opn');
const downloadsFolder = require('downloads-folder');
const sanitizeFileName = require('sanitize-filename');
const { addEventListener } = require('../../utils');

const SCREENSHOT_EVENT_NAME = 'RS_takeScreenshot';
const DOWNLOADS_FOLDER = downloadsFolder();

const takeScreenshot = ({ Page, Emulation }) => async box => {
  const fitHeight = Math.max(
    box.windowHeight,
    box.windowHeight + box.height - box.scrollAreaHeight
  );

  const scale = box.windowHeight / fitHeight;

  await Emulation.setDeviceMetricsOverride({
    height: 0,
    width: 0,
    deviceScaleFactor: 0,
    mobile: false,
    scale,
  });

  const { data: base64 } = await Page.captureScreenshot({
    fromSurface: false,
  });

  const image = await jimp.read(Buffer.from(base64, 'base64'));
  const filePath = path.join(
    DOWNLOADS_FOLDER,
    `${sanitizeFileName(box.fileName)}-${Date.now()}.${image.getExtension()}`
  );

  await new Promise((resolve, reject) => {
    image
      .crop(
        ...['x', 'y', 'width', 'height'].map(
          key => box[key] * box.ratio * scale
        )
      )
      .write(filePath, err => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
  });

  // set back to original dimension
  await Emulation.clearDeviceMetricsOverride();

  await opn(filePath);
};

module.exports = async Protocol => {
  await addEventListener(Protocol)(
    SCREENSHOT_EVENT_NAME,
    takeScreenshot(Protocol)
  );
};
