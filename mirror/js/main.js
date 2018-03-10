const mirror = (function (wsAddr) {
  function Mirror(wsAddr) {
    this.wsAddr = wsAddr;
    this.wsInstance = null;
  }

  Mirror.prototype.init = function () {
    //Here we're gonna start everything!
    this.cursor = Utils.createCursorElementOn(document.body);
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

  Mirror.prototype.handleSocketMsg = function({data}) {
    const {pageX, pageY} = JSON.parse(data);
    Utils.changeCursorPosition(this.cursor, {pageX, pageY});
  };

  return new Mirror(wsAddr);

})('ws://localhost:4000/mirror');


mirror.init();

