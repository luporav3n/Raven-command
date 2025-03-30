const loadButton = document.getElementById("load_button");
const output = document.getElementById("output");
const forgeLog = document.getElementById("forge_log");

function parseAndDisplay(input) {
  try {
    const data = JSON.parse(input);
    output.innerText = JSON.stringify(data, null, 2);

    const memory = data.inject?.memory?.join("\n- ") || "なし";
    const core = data.inject?.core_values?.join("\n- ") || "なし";
    const intent = data.inject?.intent_completion || "なし";

    forgeLog.innerText = 
      "【構築記録】\n" +
      "■ 学習内容：\n- " + memory + "\n\n" +
      "■ 中核思想：\n- " + core + "\n\n" +
      "■ 今後の判断方針：\n" + intent;

  } catch (err) {
    output.innerText = "JSON解析エラー：" + err.message;
    forgeLog.innerText = "";
  }
}

loadButton.addEventListener("click", () => {
  const input = document.getElementById("json_input").value;
  if (!input) {
    output.innerText = "データが空です。";
    return;
  }
  parseAndDisplay(input);
});

// 自動受信処理（URLパラメータから読み取る）
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const inject = params.get("inject");
  if (inject) {
    const decoded = decodeURIComponent(inject);
    parseAndDisplay(decoded);
  }
});
