const mirror = (function (wsAddr) {
  function Mirror(wsAddr) {
    this.wsAddr = wsAddr;
    this.wsInstance = null;

    this.eventDispatcher = {
      'MOUSE_EVENT': this.handleMouseMove.bind(this),
      'CLICK_EVENT': this.handleClick.bind(this),
      'SCROLL_EVENT': this.handleScroll.bind(this),
      'DOM_INIT': this.handleDomInit.bind(this)
    };

    this.dtds = new DomTreeDeserializer(document, {
      createElement: tagName => {
        if (tagName == 'SCRIPT') {
          var node = document.createElement('noscript');
          node.style.display = 'none';
          return node;
        }
      }
    });
  }

  Mirror.prototype.init = function () {
    //Here we're gonna start everything!
    this.connectToServer();
  };

  Mirror.prototype.connectToServer = function () {
    this.wsInstance = new WebSocket(this.wsAddr);
    this.wsInstance.onopen = () => console.log('Mirror connected to WS successfully');
    this.wsInstance.onmessage = this.handleSocketMsg.bind(this);
  };

  Mirror.prototype.isWSConnected = function () {
    return this.wsInstance.readyState === 1;
  };

  Mirror.prototype.handleSocketMsg = function ({data}) {
    const {type, eventData} = JSON.parse(data);
    if (this.eventDispatcher[type]) {
      this.eventDispatcher[type](eventData);
    } else {
      console.log('There is no event handler for event type: ' + type);
    }
  };

  Mirror.prototype.handleMouseMove = function (eventData) {
    Utils.changeCursorPosition(this.cursor, eventData);
  };

  Mirror.prototype.handleClick = function (eventData) {
    Utils.simulateClickOn(document.body, eventData);
  };

  Mirror.prototype.handleScroll = function (eventData) {
    Utils.scrollWindow(eventData.pageXOffset, eventData.pageYOffset);
  };

  Mirror.prototype.handleDomInit = function (eventData) {
    Utils.resetDom();
    this.dtds.initialize(eventData.rootId, eventData.children);
    Utils.insertCSS();
    this.cursor = Utils.createCursorElementOn(document.body);
  };

  return new Mirror(wsAddr);

})('ws://localhost:4000/mirror');


mirror.init();

