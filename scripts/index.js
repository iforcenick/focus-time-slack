const EXTENSION_ID = 'fhiigbdkohagojabdgnpicbhdhnmdhho'

const _send = WebSocket.prototype.send;
WebSocket.prototype.send = function (data) {
  _send.apply(this, arguments);
  if(data instanceof Uint8Array || data instanceof Int8Array) {

    chrome.runtime.sendMessage(
      EXTENSION_ID,
      {
        message_type: 'sendWebSocket',
        unsigned: data instanceof Uint8Array,
        data: data.map(byte => byte.toString()).join(','),
      }
    );
  }
};