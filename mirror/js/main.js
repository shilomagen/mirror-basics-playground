const mirror = (function (wsAddr) {
  function Mirror(wsAddr) {
    this.wsAddr = wsAddr;
    this.wsInstance = null;
  }

  Mirror.prototype.init = function () {
    this.connectToServer();
    //Here we're gonna start everything!
  };

  Mirror.prototype.connectToServer = function () {
    this.wsInstance = new WebSocket(this.wsAddr);
    this.wsInstance.onopen = () => console.log('Mirror connected to WS successfully');
  };

  Mirror.prototype.isWSConnected = function () {
    return this.wsInstance.readyState === 1;
  };

  return new Mirror(wsAddr);

})('ws://localhost:4000/mirror');


mirror.init();

