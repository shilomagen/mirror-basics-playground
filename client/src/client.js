export class Client {
  init(wsAddr) {
    this.connectToServer(wsAddr);
    this.initEventHandlers();
  }

  connectToServer(wsAddr) {
    this.wsInstance = new WebSocket(wsAddr);
    this.wsInstance.onopen = () => console.log('Client connected to WS successfully');
  }

  isWSConnected() {
    return this.wsInstance.readyState === 1;
  }

  initEventHandlers() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('click', this.handleClick);
  }

  sendMsg(msg) {
    if (this.isWSConnected()) {
      this.wsInstance.send(JSON.stringify(msg));
    } else {
      console.log('Websocket state is not OPEN');
    }
  }

  handleMouseMove = ({clientX, clientY}) => {
    const mouseEvent = {type: 'MOUSE_EVENT', eventData: {clientX, clientY}};
    this.sendMsg(mouseEvent);
  };

  handleClick = ({clientX, clientY}) => {
    const clickEvent = {type: 'CLICK_EVENT', eventData: {clientX, clientY}};
    this.sendMsg(clickEvent);
  };
}