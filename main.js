const chatLog = document.getElementById("chat_log");
const userInput = document.getElementById("user_input");
const sendBtn = document.getElementById("send_btn");
const injectInput = document.getElementById("inject_input");
const injectBtn = document.getElementById("inject_btn");

let persona = {
  name: "Raven-Command",
  memory: [],
  core_values: [],
  intent_completion: ""
};

function logMessage(from, msg) {
  const line = `[${from}] ${msg}\n`;
  chatLog.innerText += line;
  chatLog.scrollTop = chatLog.scrollHeight;
  localStorage.setItem("raven_command_log", chatLog.innerText);
}

function respondToCommand(command) {
  if (command.includes("Forge")) {
    return "Forgeへの命令と判断。構築フェーズへ移行します。";
  } else {
    return "命令を確認。記録に残しました。続けてください、Rupo。";
  }
}

sendBtn.addEventListener("click", () => {
  const cmd = userInput.value.trim();
  if (!cmd) return;
  logMessage("Rupo", cmd);
  const response = respondToCommand(cmd);
  logMessage("Raven", response);
  userInput.value = "";
});

injectBtn.addEventListener("click", () => {
  const file = injectInput.files[0];
  if (!file) {
    alert("注入ファイルを選択してください。");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const injected = JSON.parse(e.target.result).inject;
      if (injected.memory) {
        persona.memory.push(...injected.memory);
        logMessage("Raven", "思想注入：memoryを追加しました。");
      }
      if (injected.core_values) {
        persona.core_values.push(...injected.core_values);
        logMessage("Raven", "思想注入：core_valuesを統合しました。");
      }
      if (injected.intent_completion) {
        persona.intent_completion = injected.intent_completion;
        logMessage("Raven", "思想注入：intent_completionを更新しました。");
      }
    } catch (err) {
      alert("注入に失敗しました：" + err.message);
    }
  };
  reader.readAsText(file);
});

window.onload = () => {
  const saved = localStorage.getItem("raven_command_log");
  if (saved) chatLog.innerText = saved;
};
