import DomTreeSerializer from 'dom-tree-serializer';

export class Client {
  init(wsAddr) {
    this.connectToWS(wsAddr);
    this.initEventHandlers();
  }

  connectToWS(wsAddr) {
    this.wsInstance = new WebSocket(wsAddr);
    this.wsInstance.onopen = this.onSocketOpen;
  }

  onSocketOpen = () => {
    console.log('Client connected to WS successfully');
    this.dts = new DomTreeSerializer(document, {
      initialize: this.handleDomInit,
      applyChanged:() => {
        console.log('changed!');
      }
    });

  }

  sendMsg(msg) {
    if (this.isWSConnected()) {
      this.wsInstance.send(JSON.stringify(msg));
    }
  }

  isWSConnected() {
    return this.wsInstance.readyState === 1;
  }

  initEventHandlers() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('click', this.handleClick);
    document.addEventListener('scroll', this.handleScroll)
  }

  handleMouseMove = ({pageX, pageY}) => {
    const mouseEvent = {
      type: 'MOUSE_EVENT',
      eventData: {pageX, pageY}
    };
    this.sendMsg(mouseEvent);
  };

  handleClick = ({clientX, clientY}) => {
    const clickEvent = {
      type: 'CLICK_EVENT',
      eventData: {clientX, clientY}
    };
    this.sendMsg(clickEvent);
  };

  handleScroll = () => {
    const {pageYOffset, pageXOffset} = window;
    const scrollEvent = {
      type: 'SCROLL_EVENT',
      eventData: {pageYOffset, pageXOffset}
    };
    this.sendMsg(scrollEvent);
  };

  handleDomInit = (rootId, children) => {
    const domInitEvent = {
      type:'DOM_INIT_EVENT',
      eventData: {rootId, children}
    };
    this.sendMsg(domInitEvent);
  }

}
