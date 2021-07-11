const copyText = document.getElementById("email-copy");
const iconCopy = document.getElementById("icon-copy");

const copyToClipboard = () => {
  const range = document.createRange();
  range.selectNode(document.getElementById("email-copy"));
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
};

const showMsg = (el) => {
  clearTimeout(timeOut);

  el.getElementsByTagName("span")[0].style.opacity = 1;
  var timeOut = setTimeout(() => {
    el.getElementsByTagName("span")[0].style.opacity = 0;
  }, 1000);
};

copyText.addEventListener("click", () => {
  copyToClipboard();
  showMsg(copyText);
});
iconCopy.addEventListener("click", () => {
  copyToClipboard();
  showMsg(iconCopy);
});
