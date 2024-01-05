chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.storage.local.get(['api', 'key']).then(res => {
    fetch(res.api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + res.key,
      },
      body: JSON.stringify({
        'prompt': request.text
      })
    }).then(res => res.json()).then(res => {
      sendResponse(res['choices'][0]['text']);
    }).catch(err => {
      sendResponse("Something Error");
      console.log(err);
    });
  });
  return true;
});
