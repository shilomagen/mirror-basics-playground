class Mirror {
  init(wsAddr) {
    console.log('Waiting started...');
  }
}

const mirror = new Mirror();
mirror.init('ws://localhost:4000/mirror');
