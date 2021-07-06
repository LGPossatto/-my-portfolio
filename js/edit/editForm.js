const editform = document.getElementById("edit-form");
const editError = document.getElementById("edit-error");

// btns
const btnCreate = document.getElementById("btn-create");
const btnEdit = document.getElementById("btn-edit");

// inputs
const projectName = document.getElementById("project-name");
const projectDescription = document.getElementById("project-description");
const githubUrl = document.getElementById("github-url");
const siteUrl = document.getElementById("site-url");
const techList = document.getElementById("tech-list");
const radioStack = document.getElementById("radio-stack").children;

// on form submit
editform.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = projectName.value;
  const desc = projectDescription.value;
  const git_url = githubUrl.value;
  const site_url = siteUrl.value;

  let tech_list = techList.value.split(",");

  let stack = null;
  for (let radio of radioStack) {
    if (radio.nodeName === "INPUT" && radio.checked) {
      stack = radio.value;
    }
  }

  if (name && desc && git_url && site_url && tech_list && stack) {
    console.log(name, desc, git_url, site_url, tech_list, stack);
  } else {
    editError.innerHTML = "Please fill every field!";

    setTimeout(() => {
      editError.innerHTML = "";
    }, 3000);
  }
});

// btn utils
const changeBtn = (e) => {
  if (e.target.innerHTML.trim() === "Create") {
    btnCreate.classList.add("switch-btn-active");
    btnEdit.classList.remove("switch-btn-active");
  } else {
    btnCreate.classList.remove("switch-btn-active");
    btnEdit.classList.add("switch-btn-active");
  }
};

btnCreate.addEventListener("click", changeBtn);
btnEdit.addEventListener("click", (e) => {
  changeBtn(e);
});
