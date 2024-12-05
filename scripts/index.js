const EXTENSION_ID = 'fhiigbdkohagojabdgnpicbhdhnmdhho'

const _send = WebSocket.prototype.send;
WebSocket.prototype.send = function (data) {
  _send.apply(this, arguments);
  chrome.runtime.sendMessage(
    EXTENSION_ID,
    {
      message_type: 'sendWebSocket',
      data: data,
    }
  );
};