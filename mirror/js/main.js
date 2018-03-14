class Mirror {
  init(wsAddr) {
    this.connectToWS(wsAddr);
  }

  connectToWS(wsAddr) {
    this.wsInstance = new WebSocket(wsAddr);
    this.wsInstance.onopen = () => console.log('Mirror connected to WS successfully');
  }

}

const mirror = new Mirror();
mirror.init('ws://localhost:4000/mirror');
