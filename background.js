chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  fetch('http://192.168.31.246:5000/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'prompt': request.text
    })
  }).then(res => res.text()).then(res => {
    sendResponse(res);
  }).catch(err => {
    sendResponse("Something Error");
    console.log(err);
  });
  return true;
});

// chrome.contextMenus.create({
//   title: 'Demo',
//   contexts: ['selection'],
//   id: 'demo'
// });
