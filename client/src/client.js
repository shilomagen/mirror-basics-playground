export class Client {
  init(wsAddr) {

    this.connectToWS(wsAddr);
  }
  connectToWS(wsAddr) {
    this.wsInstance = new WebSocket(wsAddr);
    this.wsInstance.onopen = () => console.log('Client connected to WS successfully');
  }

  isWSConnected() {
    return this.wsInstance.readyState === 1;
  }

}