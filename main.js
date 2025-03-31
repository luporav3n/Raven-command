function getInjectData() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("inject");
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch (e) {
    console.error("Parse error:", e);
    return null;
  }
}

function updateUI(data) {
  document.getElementById("html").textContent = data.html || "(none)";
  document.getElementById("css").textContent = data.css || "(none)";
  document.getElementById("js").textContent = data.js || "(none)";
}

function sendToMemory(data) {
  const encoded = new URLSearchParams(data).toString();
  const url = "https://luporav3n.github.io/raven-memory-app/log.html?" + encoded;
  fetch(url)
    .then(res => {
      document.getElementById("status").textContent = "Memoryへ中継完了";
    })
   