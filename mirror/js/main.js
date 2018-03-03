const mirror = (function(wsAddr) {
  function Mirror(wsAddr) {
    this.wsAddr = wsAddr;
  }
  Mirror.prototype.init = function() {
    //Here we're gonna start everything!
  };

  return new Mirror(wsAddr);

})('ws://localhost:4000/mirror');

mirror.init();

