const loadButton = document.getElementById("load_button");
const output = document.getElementById("output");
const forgeLog = document.getElementById("forge_log");

const htmlBox = document.getElementById("code_html");
const cssBox = document.getElementById("code_css");
const jsBox = document.getElementById("code_js");

const scriptBox = document.getElementById("replace_script");
const genScriptBtn = document.getElementById("generate_script");

let latestFiles = {
  html: "",
  css: "",
  js: ""
};

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

    const html = data.generated?.html || "(未出力)";
    const css = data.generated?.css || "(未出力)";
    const js = data.generated?.js || "(未出力)";

    htmlBox.innerText = html;
    cssBox.innerText = css;
    jsBox.innerText = js;

    latestFiles = { html, css, js };
    scriptBox.innerText = "";

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

// 差し替え用スクリプト出力
genScriptBtn.addEventListener("click", () => {
  const { html, css, js } = latestFiles;
  if (!html || !css || !js) {
    scriptBox.innerText = "構築ファイルが不足しています。";
    return;
  }

  const script = `
===== index.html =====
${html}

===== style.css =====
${css}

===== main.js =====
${js}
  `.trim();

  scriptBox.innerText = script;
});
