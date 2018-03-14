export class Client {
  init(wsAddr) {
    this.connectToWS(wsAddr);
    document.addEventListener('mousemove', ({pageX, pageY}) => {
      if (this.isWSConnected()) {
        this.wsInstance.send(JSON.stringify({pageX, pageY}));
      }
    })
  }
  connectToWS(wsAddr) {
    this.wsInstance = new WebSocket(wsAddr);
    this.wsInstance.onopen = () => console.log('Client connected to WS successfully');
  }

  isWSConnected() {
    return this.wsInstance.readyState === 1;
  }

}
