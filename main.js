window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const inject = params.get("inject");
  const logArea = document.getElementById("inject_log");

  if (inject) {
    try {
      const parsed = JSON.parse(decodeURIComponent(inject));
      logArea.innerText = JSON.stringify(parsed, null, 2);
    } catch (e) {
      logArea.innerText = "// 構築データの解析エラー: " + e.message;
    }
  } else {
    logArea.innerText = "構築データは受信されていません。";
  }
});