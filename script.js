var pending = false; // global variable
document.querySelectorAll("[contenteditable=true]").forEach(ele => {
  ele.addEventListener("focus", (e) => {
    document.addEventListener('keydown', async function(event) {
      if (ele.textContent.trim() != '' && event.keyCode === 9 && !pending) {
        event.preventDefault();
        pending = true;
        const res = await chrome.runtime.sendMessage({'text':ele.textContent});
        ele.textContent += res;
        pending = false;
      }
    });
  })
})
document.querySelectorAll("input, textarea").forEach(ele => {
  ele.addEventListener("focus", (e) => {
    document.addEventListener('keydown', async function(event) {
      if (ele.value.trim() != '' && event.keyCode === 9 && !pending) {
        event.preventDefault();
        pending = true;
        const res = await chrome.runtime.sendMessage({'text':ele.value});
        ele.value += res;
        pending = false;
      }
    });
  })
})
