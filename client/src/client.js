export class Client {
  init(wsAddr) {
    this.connectToServer(wsAddr);
  }

  connectToServer(wsAddr) {
    this.wsInstance = new WebSocket(wsAddr);
    this.wsInstance.onopen = () => console.log('Client connected to WS successfully');
  }

  isWSConnected() {
    return this.wsInstance.readyState === 1;
  }

}