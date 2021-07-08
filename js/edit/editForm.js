const editform = document.getElementById("edit-form");
const editProjectsList = document.getElementById("edit-projects-list");
const editError = document.getElementById("edit-error");
const editSuccess = document.getElementById("edit-success");
const editWarning = document.getElementById("edit-warning");

// btns
const btnCreate = document.getElementById("btn-create");
const btnEdit = document.getElementById("btn-edit");
const btnSubmit = document.getElementById("btn-submit");
const btnDelete = document.getElementById("btn-delete");
const btnWarnintDelete = document.getElementById("btn-warnint-delete");
const btnWarnintCancel = document.getElementById("btn-warnint-cancel");

// inputs
const projectId = document.getElementById("project-id");
const projectName = document.getElementById("project-name");
const projectDescription = document.getElementById("project-description");
const githubUrl = document.getElementById("github-url");
const siteUrl = document.getElementById("site-url");
const techList = document.getElementById("tech-list");
const radioStack = document.getElementById("radio-stack").children;
const authKey = document.getElementById("auth-key");

// display error message
const displayErr = (msg) => {
  editError.innerHTML = msg;

  setTimeout(() => {
    editError.innerHTML = "";
  }, 3000);
};

const displaySucc = (msg) => {
  editSuccess.innerHTML = msg;

  setTimeout(() => {
    editSuccess.innerHTML = "";
  }, 3000);
};

// change inputs values
const editInputsValues = (
  id = "",
  name = "",
  description = "",
  gitUrl = "",
  webUrl = "",
  techs = "",
  techStack = ""
) => {
  projectId.value = id;
  projectName.value = name;
  projectDescription.value = description;
  githubUrl.value = gitUrl;
  siteUrl.value = webUrl;
  techList.value = techs;
  authKey.value = "";

  for (let radio of radioStack) {
    if (radio.nodeName === "INPUT" && radio.value === techStack) {
      radio.checked = true;
    }
  }
};

// get values from inputs
const getInputsData = () => {
  let stack = null;
  for (let radio of radioStack) {
    if (radio.nodeName === "INPUT" && radio.checked) {
      stack = radio.value;
    }
  }

  return {
    name: projectName.value,
    desc: projectDescription.value,
    git_url: githubUrl.value,
    site_url: siteUrl.value,
    tech: {
      tech_list: techList.value.split(","),
      stack,
    },
  };
};

// remove class from list item
const removeLiActive = () => {
  for (let el of editProjectsList.children) {
    el.classList.remove("li-active");
  }
};

// fetch data
const fetchAndDisplayProjects = async () => {
  try {
    const res = await fetch(
      "https://lg-portfolio-api.herokuapp.com/api/projects"
    );
    const data = await res.json();

    for (let project of data.data) {
      const projectLi = document.createElement("li");
      projectLi.classList.add("fs-small", "fc-light");
      projectLi.innerText = project.name;

      // add event to the element
      projectLi.addEventListener("click", () => {
        removeLiActive();

        projectLi.classList.add("li-active");

        editInputsValues(
          project._id,
          project.name,
          project.desc,
          project.git_url,
          project.site_url,
          project.tech.tech_list,
          project.tech.stack
        );
      });

      editProjectsList.appendChild(projectLi);
    }
  } catch (err) {
    console.error(err);
    displayErr(err.message);
  }
};

// run fetch function
fetchAndDisplayProjects();

// on form submit
editform.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputsData = getInputsData();
  console.log(inputsData, authKey.value);

  if (
    inputsData.name &&
    inputsData.desc &&
    inputsData.git_url &&
    inputsData.site_url &&
    inputsData.tech.tech_list &&
    inputsData.tech.stack &&
    authKey.value
  ) {
    if (btnCreate.classList.contains("switch-btn-active")) {
      // if create
      try {
        const res = await fetch(
          `https://lg-portfolio-api.herokuapp.com/api/projects/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authKey.value}`,
            },
            body: JSON.stringify(inputsData),
          }
        );
        const data = await res.json();
        console.log(data);

        if (!data.success) {
          throw new Error(data.error);
        } else {
          changeBtn(btnCreate);
          displaySucc("Project Created!");
        }
      } catch (err) {
        console.error(err);
        displayErr(err.message);
      }
    } else {
      // if edit
      try {
        const res = await fetch(
          `https://lg-portfolio-api.herokuapp.com/api/projects/${projectId.value}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authKey.value}`,
            },
            body: JSON.stringify(inputsData),
          }
        );
        const data = await res.json();
        console.log(data);

        if (!data.success) {
          throw new Error(data.error);
        } else {
          changeBtn(btnCreate);
          displaySucc("Project Edited!");
        }
      } catch (err) {
        console.error(err);
        displayErr(err.message);
      }
    }
  } else {
    displayErr("Please fill every field!");
  }
});

// btn utils
const changeBtn = (e) => {
  if (e.innerHTML.trim() === "Create") {
    btnCreate.classList.add("switch-btn-active");
    btnEdit.classList.remove("switch-btn-active");

    btnSubmit.firstElementChild.innerText = "Create Project";
    btnDelete.style.display = "none";
    editProjectsList.style.display = "none";

    editInputsValues();
    removeLiActive();
  } else {
    btnCreate.classList.remove("switch-btn-active");
    btnEdit.classList.add("switch-btn-active");

    btnSubmit.firstElementChild.innerText = "Edit Project";
    btnDelete.style.display = "block";
    editProjectsList.style.display = "flex";
  }
};

btnCreate.addEventListener("click", (e) => {
  changeBtn(e.target);
});
btnEdit.addEventListener("click", (e) => {
  changeBtn(e.target);
});

btnDelete.addEventListener("click", () => {
  if (authKey.value) {
    editWarning.style.display = "flex";
  } else {
    displayErr("Authorization field must be provided!");
  }
});

btnWarnintDelete.addEventListener("click", async () => {
  try {
    const res = await fetch(
      `https://lg-portfolio-api.herokuapp.com/api/projects/${projectId.value}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authKey.value}`,
        },
      }
    );
    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error);
    } else {
      editWarning.style.display = "none";
      changeBtn(btnCreate);
      displaySucc("Project Deleted!");
    }
  } catch (err) {
    console.error(err);
    displayErr(err.message);
  }
});

btnWarnintCancel.addEventListener("click", () => {
  editWarning.style.display = "none";
});
