document.addEventListener('DOMContentLoaded', () => {
  const ws = new WebSocket('ws://localhost:4000/master');
  ws.onmessage = ({data}) => {
    window.document = JSON.parse(data);
  }
});