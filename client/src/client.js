export class Client {
  init(wsAddr) {
    this.connectToServer(wsAddr);
    document.addEventListener('mousemove', ({pageX, pageY}) => {
      if (this.isWSConnected()) {
        this.wsInstance.send(JSON.stringify({pageX, pageY}));
      }
    });
  }

  connectToServer(wsAddr) {
    this.wsInstance = new WebSocket(wsAddr);
    this.wsInstance.onopen = () => console.log('Client connected to WS successfully');
  }

  isWSConnected() {
    return this.wsInstance.readyState === 1;
  }


}