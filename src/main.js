import "./style.css";
import { throttle } from "./throttle";
import { checkUrlOnServer } from "./mockServer";

const input = document.getElementById("urlInput");
const formatStatus = document.getElementById("formatStatus");
const existStatus = document.getElementById("existStatus");

function isValidUrlFormat(text) {
  try {
    const u = new URL(text);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

let lastRequestId = 0;

async function doExistenceCheck(url) {
  const requestId = ++lastRequestId;

  if (input.value.trim() === url) {
    existStatus.textContent = "checking";
  }

  const result = await checkUrlOnServer(url);

  if (requestId !== lastRequestId) return;
  if (input.value.trim() !== url) return;
  if (!isValidUrlFormat(url)) return;

  if (!result.ok) {
    existStatus.textContent = "server error (fake)";
    return;
  }

  if (result.exists) {
    existStatus.textContent = `exists (${result.kind})`;
  } else {
    existStatus.textContent = `does not exist  (looks like: ${result.kind})`;
  }
}

const throttledExistenceCheck = throttle((url) => {
  doExistenceCheck(url);
}, 400);

input.addEventListener("input", () => {
  const value = input.value.trim();

  lastRequestId++;
  throttledExistenceCheck.cancel();

  if (!value) {
    formatStatus.textContent = "-";
    existStatus.textContent = "-";
    return;
  }

  const okFormat = isValidUrlFormat(value);

  if (!okFormat) {
    formatStatus.textContent = "invalid (needs http/https)";
    existStatus.textContent = "-";
    return;
  }

  formatStatus.textContent = "valid";
  throttledExistenceCheck(value);
});
