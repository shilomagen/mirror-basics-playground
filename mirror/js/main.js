class Mirror {
  init(wsAddr) {
    this.cursor = Utils.createCursorElementOn(document.body);
    this.connectToWS(wsAddr);
    this.eventDispatcher = {
      MOUSE_EVENT: (eventData) => this.handleMouseMove(eventData),
      CLICK_EVENT: (eventData) => this.handleClick(eventData)
    }
  }

  connectToWS(wsAddr) {
    this.wsInstance = new WebSocket(wsAddr);
    this.wsInstance.onopen = () => console.log('Mirror connected to WS successfully');
    this.wsInstance.onmessage = (msg) => this.handleSocketMsg(msg);
  }

  handleSocketMsg({data}) {
    const {type, eventData} = JSON.parse(data);
    if (this.eventDispatcher[type]) {
      this.eventDispatcher[type](eventData);
    } else {
      console.log('Sorry, there is no handler for type: ' + type);
    }
  }

  handleMouseMove({pageX, pageY}) {
    this.cursor.style.top = pageY;
    this.cursor.style.left = pageX;
  }

  handleClick({clientX, clientY}) {
    Utils.simulateClickOn(document.body, {clientY, clientX});
  }

}

const mirror = new Mirror();
mirror.init('ws://localhost:4000/mirror');
