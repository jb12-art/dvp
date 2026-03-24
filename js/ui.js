// js/ui.js
export function displayMessage(container, messageType, message) {
  let parent = container;

  if (typeof container === 'string') {
    parent = document.querySelector(container);
  }

  const messageClasses = {
    error: 'message message--error',
    success: 'message message--success',
    warning: 'message message--warning',
    info: 'message message--info',
  };

  const classes = messageClasses[messageType] || messageClasses.info;

  parent.innerHTML = `<div class="${classes}">${message}</div>`;
}
