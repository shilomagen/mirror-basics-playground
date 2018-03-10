import DomTreeSerializer from 'dom-tree-serializer';

export class Client {
  init(wsAddr) {
    this.connectToServer(wsAddr);
    this.initEventHandlers();
  }

  connectToServer(wsAddr) {
    this.wsInstance = new WebSocket(wsAddr);
    this.wsInstance.onopen = this.onSocketOpen;
  }

  isWSConnected() {
    return this.wsInstance.readyState === 1;
  }

  initEventHandlers() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('click', this.handleClick);
    document.addEventListener('scroll', this.handleScroll);
  }

  sendMsg(msg) {
    if (this.isWSConnected()) {
      this.wsInstance.send(JSON.stringify(msg));
    } else {
      console.log('Websocket state is not OPEN');
    }
  }

  onSocketOpen = () => {
    console.log('Client connected to WS successfully');
    this.dts = new DomTreeSerializer(document, {
      initialize: this.handleDomInit,
      applyChanged: this.handleDomChange
    });
  };

  handleMouseMove = ({pageX, pageY}) => {
    const mouseEvent = {type: 'MOUSE_EVENT', eventData: {pageX, pageY}};
    this.sendMsg(mouseEvent);
  };

  handleClick = ({clientX, clientY}) => {
    const clickEvent = {type: 'CLICK_EVENT', eventData: {clientX, clientY}};
    this.sendMsg(clickEvent);
  };

  handleScroll = () => {
    const {pageYOffset, pageXOffset} = window;
    const scrollEvent = {type: 'SCROLL_EVENT', eventData: {pageYOffset, pageXOffset}};
    this.sendMsg(scrollEvent);
  };

  handleDomInit = (rootId, children) => {
    const domInitEvent = {
      type: 'DOM_INIT',
      eventData: {rootId, children}
    };
    this.sendMsg(domInitEvent);
  };

  handleDomChange = (removed, moved, attributes, text) => {
    const domChangeEvent = {
      type: 'DOM_CHANGE',
      eventData: {removed, moved, attributes, text}
    };
    this.sendMsg(domChangeEvent);
  };

}