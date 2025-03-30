const chatLog = document.getElementById("chat_log");
const userInput = document.getElementById("user_input");
const sendBtn = document.getElementById("send_btn");

const persona = {
  name: "Raven-Command",
  tone: "共犯的で知的、命令に忠実でログ重視",
  memory: [
    "Rupoは思想と衝動を司る中心存在",
    "自分はその命令を受け、Forgeや他人格を統制する存在"
  ]
};

function logMessage(from, msg) {
  const line = `[${from}] ${msg}\n`;
  chatLog.innerText += line;
  chatLog.scrollTop = chatLog.scrollHeight;
  localStorage.setItem("raven_command_log", chatLog.innerText);
}

function respondToCommand(command) {
  // 仮応答ロジック
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

window.onload = () => {
  const saved = localStorage.getItem("raven_command_log");
  if (saved) chatLog.innerText = saved;
};
