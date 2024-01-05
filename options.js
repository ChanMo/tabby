(async() => {
  // i18n
  document.title = chrome.i18n.getMessage("name");
  document.querySelector("h1").innerHTML = chrome.i18n.getMessage("option");
  document.querySelector("[for=id_api]").innerHTML = chrome.i18n.getMessage("api");;
  document.querySelector("#id_api+.help").innerHTML = chrome.i18n.getMessage("api_help");
  document.querySelector("[for=id_key]").innerHTML = chrome.i18n.getMessage("key");
  document.querySelector("#save-btn").innerHTML = chrome.i18n.getMessage("save");

  const data = await chrome.storage.local.get(["api", "key"]);
  let api = data.api??'https://api.openai.com/v1/completions';
  let key = data.key??'';
  const apiInput = document.querySelector("[name=api]");
  const keyInput = document.querySelector("[name=key]");
  apiInput.value = api;
  keyInput.value = key;

  document.getElementById("save-btn").addEventListener("click", async(e) => {
    //e.target.classList.add("is-loading");
    await chrome.storage.local.set({
      'api': apiInput.value,
      'key': keyInput.value
    })
    //e.target.classList.remove("is-loading");
  });
})();

