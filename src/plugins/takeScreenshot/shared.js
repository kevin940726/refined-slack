const { createEventListener } = require('../../utils');

const SCREENSHOT_EVENT_NAME = 'RS_takeScreenshot';

exports.screenshotEvent = createEventListener(SCREENSHOT_EVENT_NAME);
