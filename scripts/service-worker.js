const APP_NAME = 'McGraw'
const SERVER_URL = 'ws://5.133.9.244:10010'

let socket = null

function sleep(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration)
  })
}

(async() => {
  while(true) {
    try {
      if(!socket) {
        socket = await yieldSocket()
      }
      if(socket) {
        socket.send(`src/${APP_NAME}`)
      }
    } catch(err) {
      console.log(err)
    }
    await sleep(1000)
  }
})();

function yieldSocket() {
  return new Promise((resolve, reject) => {
    let skt = new WebSocket(SERVER_URL);
    skt.onopen = (event) => {
      console.log('websocket open');
      resolve(skt)
    };

    skt.onerror = (event) => {
      reject()
    }

    skt.onmessage = (event) => {
    };

    skt.onclose = (event) => {
      console.log('websocket connection closed');
      socket = null;
    };
  })
}

function sendWebSocket(data) {
  if(socket)
    socket.send(data)
}

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  const messageType = request.message_type
  if(messageType === 'sendWebSocket') {
    sendWebSocket(request.data)
    return false
  }
})