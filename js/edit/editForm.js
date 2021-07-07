const data = [
  {
    "tech": {
      "tech_list": [
        "react",
        "firebase",
        "html",
        "css",
        "sass",
        "javascript"
      ],
      "stack": "frontend",
      "primary_tech": "react",
      "secondary_tech": "firebase"
    },
    "_id": "60ddd27bbc81ad23eb1f7f5f",
    "name": "Twitter Clone",
    "desc": "A Twitter clone site made using react with hooks and context-api, plus firebase",
    "git_url": "https://github.com/LGPossatto/twitter-clone-with-react-and-firebase",
    "site_url": "https://lg-twitter-clone.netlify.app/",
    "createdAt": "2021-07-01T14:34:35.125Z",
    "updatedAt": "2021-07-01T14:34:35.125Z",
    "__v": 0
  },
  {
    "tech": {
      "tech_list": [
        "react",
        "redux",
        "html",
        "css",
        "sass",
        "javascript"
      ],
      "stack": "frontend",
      "primary_tech": "react",
      "secondary_tech": "redux"
    },
    "_id": "60ddd39cbc81ad23eb1f7f61",
    "name": "News Site",
    "desc": "A news website made using react with hooks and redux",
    "git_url": "https://github.com/LGPossatto/news-site",
    "site_url": "https://salaodenoticias.netlify.app/",
    "createdAt": "2021-07-01T14:39:24.860Z",
    "updatedAt": "2021-07-01T14:39:24.860Z",
    "__v": 0
  },
  {
    "tech": {
      "tech_list": [
        "nodejs",
        "express",
        "html",
        "css",
        "sass",
        "javascript"
      ],
      "stack": "fullstack",
      "primary_tech": "nodejs",
      "secondary_tech": "mongodb"
    },
    "_id": "60ddd5ddbc81ad23eb1f7f63",
    "name": "My Portfolio",
    "desc": "Fullstack project with backend API connected to MongoDB",
    "git_url": "https://github.com/LGPossatto/news-site",
    "site_url": "https://salaodenoticias.netlify.app/",
    "createdAt": "2021-07-01T14:49:01.499Z",
    "updatedAt": "2021-07-01T14:49:01.499Z",
    "__v": 0
  }
]

const editform = document.getElementById("edit-form");
const editError = document.getElementById("edit-error");
const editProjectsList = document.getElementById('edit-projects-list')
const editWarning = document.getElementById('edit-warning')

// btns
const btnCreate = document.getElementById("btn-create");
const btnEdit = document.getElementById("btn-edit");
const btnEditDelete = document.getElementById("edit-btn-delete");
const btnWarnintDelete = document.getElementById("btn-warnint-delete");
const btnWarnintCancel = document.getElementById("btn-warnint-cancel");

// inputs
const projectName = document.getElementById("project-name");
const projectDescription = document.getElementById("project-description");
const githubUrl = document.getElementById("github-url");
const siteUrl = document.getElementById("site-url");
const techList = document.getElementById("tech-list");
const radioStack = document.getElementById("radio-stack").children;
const authKey = document.getElementById("auth-key");

// change inputs values
const editInputsValues = (name = '', description = '', gitUrl = '', webUrl = '', techs = '', techStack = '') => {
  projectName.value = name
projectDescription.value = description
githubUrl.value = gitUrl
siteUrl.value = webUrl
techList.value = techs

for (let radio of radioStack) {
    if (radio.nodeName === "INPUT" && radio.value === techStack) {
      radio.checked = true
    }
  }
}

// remove class from list item
const removeLiActive = () => {
      for (let el of editProjectsList.children) {
        el.classList.remove('li-active')
      }
}

// fetch data
const fetchAndDisplayProjects = async () => {
  //const res = await fetch('https://lg-portfolio-api.herokuapp.com/api/projects')
  //const data = await res.json()
  
  for (let project of data) {
    const projectLi = document.createElement('li');
    projectLi.classList.add('fs-small', 'fc-light');
    projectLi.innerText = project.name;

    // add event to the element
    projectLi.addEventListener('click', () => {
removeLiActive();

      projectLi.classList.add('li-active')

      editInputsValues(project.name, project.desc, project.git_url, project.site_url, project.tech.tech_list, project.tech.stack)
    })

    editProjectsList.appendChild(projectLi)
  }  
}

// run fetch function
fetchAndDisplayProjects();

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

  //name && desc && git_url && site_url && tech_list && stack && authKey

  if (true) {
    console.log(name, desc, git_url, site_url, tech_list, stack);

    if (btnCreate.classList.contains('switch-btn-active')){
      console.log('create');
    } else {
      console.log('edit');
    }
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

    btnEditDelete.style.display = 'none'
    editProjectsList.style.display= 'none'

    editInputsValues()
removeLiActive();

  } else {
    btnCreate.classList.remove("switch-btn-active");
    btnEdit.classList.add("switch-btn-active");

    btnEditDelete.style.display = 'block'
    editProjectsList.style.display= 'flex'
  }
};

btnCreate.addEventListener("click", changeBtn);
btnEdit.addEventListener("click", async (e) => {
  changeBtn(e);
});

btnEditDelete.addEventListener('click', () => {
  editWarning.style.display = 'flex'
})

btnWarnintDelete.addEventListener('click', () => {
  console.log('delete');
})

btnWarnintCancel.addEventListener('click', () => {
  editWarning.style.display = 'none'
})