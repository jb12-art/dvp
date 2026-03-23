// js/ui.js
export function displayMessage(container, messageType, message) {
  let parent = container;

  if (typeof container === 'string') {
    parent = document.querySelector(container);
  }

  const messageClassess = {
    error: 'message message--error',
    success: 'message message--success',
    warning: 'message message--warning',
    info: 'message message--info',
  };

  const classes = messageClassess[messageType] || messageClassess.info;

  parent.innerHTML = `<div class="${classes}">${message}</div>`;
}
