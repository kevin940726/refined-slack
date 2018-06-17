const { createEventListener } = require('../utils');

const SET_PLUGIN_EVENT = '__REFINED_SLACK_STORE/SET_PLUGIN_EVENT__';

exports.setPluginEvent = createEventListener(SET_PLUGIN_EVENT);

exports.STORE_NAME = '__REFINED_SLACK_STORE__';
