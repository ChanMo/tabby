var pending = false; // global

document.addEventListener('keydown', async function(event) {
  if (event.keyCode === 9 && !pending) {
    const srcElement = event.srcElement;
    if(['INPUT', 'TEXTAREA'].indexOf(srcElement.tagName) <= -1 && !srcElement.hasAttribute("contenteditable")) {
      return;
    }
    const isInput = ['INPUT', 'TEXTAREA'].indexOf(srcElement.tagName) > -1;
    const value = (isInput ? srcElement.value : srcElement.textContent).trim();
    if(!value) {
      return;
    }
    event.preventDefault();
    pending = true;
    if(isInput) {
      srcElement.value += '...';
    } else {
      srcElement.textContent += '...';
    }
    const res = await chrome.runtime.sendMessage({'text':value});
    if(isInput) {
      srcElement.value = srcElement.value.substring(0, srcElement.value.length - 3) + res;
    } else {
      srcElement.textContent = srcElement.textContent.substring(0, srcElement.textContent.length - 3) + res;
    }
    pending = false;
  }
});
