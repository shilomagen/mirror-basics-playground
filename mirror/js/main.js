class Mirror {
  init(wsAddr) {
    this.cursor = Utils.createCursorElementOn(document.body);
    this.connectToWS(wsAddr);
  }

  connectToWS(wsAddr) {
    this.wsInstance = new WebSocket(wsAddr);
    this.wsInstance.onopen = () => console.log('Mirror connected to WS successfully');
    this.wsInstance.onmessage = ({data}) => {
      const {pageX, pageY} = JSON.parse(data);
      this.cursor.style.top = pageY;
      this.cursor.style.left = pageX;
    }
  }
}

const mirror = new Mirror();
mirror.init('ws://localhost:4000/mirror');
