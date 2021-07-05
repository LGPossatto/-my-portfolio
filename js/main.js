import { data } from "./data.js";

// -------------------------------------------------------------- //
// ---------------------- toggle btn class ---------------------- //
// -------------------------------------------------------------- //
const navHelper = document.getElementById("nav-helper");
navHelper.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    navHelper.classList.toggle("menu-active");
  }
});

const projectsFilter = document.getElementById("projects-filter");
projectsFilter.addEventListener("click", (el) => {
  if (window.innerWidth <= 768 && el.target.nodeName === "H2") {
    projectsFilter.classList.toggle("filter-active");
  }
});

// -------------------------------------------------------------- //
// ----------------------- parallax effect ---------------------- //
// -------------------------------------------------------------- //
document.addEventListener("scroll", () => {
  const parallaxElements = document.getElementById("parallax").children;

  for (let i = 0; i < parallaxElements.length; i++) {
    let pos = window.pageYOffset * parallaxElements[i].dataset.speed;

    parallaxElements[i].style.transform = `translate3d(0px, ${pos}px, 0px)`;
  }
});

// -------------------------------------------------------------- //
// ------------------------- typewriter ------------------------- //
// -------------------------------------------------------------- //
document.addEventListener("DOMContentLoaded", () => {
  const headerTitle = document.getElementById("title-helper").children;

  const inicialText = ["Olá,", "me chamo Luiz Gustavo", "e sou um"];
  const textArray = ["desenvolvedor web", "progamador"];

  const typeWriter = (text, element, revert = false) => {
    let textIndex = 0;
    if (revert) {
      textIndex = text.length;
    }

    return new Promise((resolve) => {
      const addLetterLoop = setInterval(() => {
        if (revert) {
          textIndex--;
        } else {
          textIndex++;
        }

        element.innerText = `${text.substring(0, textIndex)}`;

        if (textIndex >= text.length || textIndex < 0) {
          clearInterval(addLetterLoop);
          resolve();
        }
      }, 75);
    });
  };

  const writeFunction = async () => {
    // wait for first text to finish adding and removing animation class
    headerTitle[0].classList.add("animate-title");
    await typeWriter(inicialText[0], headerTitle[0]);
    headerTitle[0].classList.remove("animate-title");
    headerTitle[1].classList.add("animate-title");
    await typeWriter(inicialText[1], headerTitle[1]);
    headerTitle[1].classList.remove("animate-title");
    headerTitle[2].classList.add("animate-title");
    await typeWriter(inicialText[2], headerTitle[2]);
    headerTitle[2].classList.remove("animate-title");
    headerTitle[3].classList.add("animate-title");

    // loop through array printing and deleting text
    let arrayIndex = 0;
    const waitLoop = async () => {
      // print text
      await typeWriter(textArray[arrayIndex], headerTitle[3]);

      // wait 3s to delete text and call function again
      setTimeout(async () => {
        await typeWriter(textArray[arrayIndex], headerTitle[3], true);

        if (arrayIndex >= textArray.length - 1) {
          arrayIndex = 0;
        } else {
          arrayIndex++;
        }

        waitLoop();
      }, 3000);
    };

    // start loop
    waitLoop();
  };

  // start writing function
  // writeFunction();
});

// -------------------------------------------------------------- //
// ---------------------- crt/add projects ---------------------- //
// -------------------------------------------------------------- //
document.addEventListener("DOMContentLoaded", async () => {
  const getTechColor = (tech) => {
    const techColors = window.getComputedStyle(document.body);
    const frontend = ["frontend", "html", "css", "sass", "react", "redux"];
    const backend = [
      "backend",
      "nodejs",
      "deno",
      "express",
      "mongodb",
      "firebase",
      "postgresql",
    ];
    const fullstack = [
      "fullstack",
      "javascript",
      "typescript",
      "graphql",
      "apollo",
    ];

    const getColor = (propertyValue) => {
      return techColors.getPropertyValue(`${propertyValue}`);
    };

    if (frontend.includes(tech)) {
      return `${getColor("--color-blue")}, ${getColor("--color-purple")}`;
    } else if (backend.includes(tech)) {
      return `${getColor("--color-mint")}, ${getColor("--color-green")}`;
    } else if (fullstack.includes(tech)) {
      return `${getColor("--color-orange")}, ${getColor("--color-pink")}`;
    } else {
      return `${getColor("--color-steel")}, ${getColor("--color-grey")}`;
    }
  };

  const createCard = (project, cardsElement) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.dataset.techList = project.tech.tech_list;

    /* cardDiv child */
    const cardContentDiv = document.createElement("div");
    cardContentDiv.classList.add("card__content");
    /* cardDiv child */

    /* cardContentDiv child */
    const cardFrontDiv = document.createElement("div");
    cardFrontDiv.classList.add("card__front");
    cardFrontDiv.style.backgroundImage = `linear-gradient(to bottom right, ${getTechColor(
      project.tech.stack
    )})`;

    /* cardFrontDiv child */
    const cardTitleh3 = document.createElement("h3");
    cardTitleh3.classList.add("fs-big", "fc-light");
    cardTitleh3.innerText = project.name;

    const cardFrontHelperDiv = document.createElement("div");
    cardFrontHelperDiv.classList.add("front-card-helper", "flex", "ai-c");
    /* parrent ^ */
    const cardDescP = document.createElement("p");
    cardDescP.classList.add("fs-med", "fc-light");
    cardDescP.innerText = project.desc;
    /* cardFrontDiv child */

    const cardBackDiv = document.createElement("div");
    cardBackDiv.classList.add("card__back", "flex", "jc-se", "ai-c");
    cardBackDiv.style.backgroundImage = `linear-gradient(to bottom left, ${getTechColor(
      project.tech.stack
    )})`;

    /* cardBackDiv child */
    const cardGitA = document.createElement("a");
    cardGitA.classList.add("card__btn");
    cardGitA.href = project.git_url;
    cardGitA.target = "_blank";
    // parent ^
    const cardGitI = document.createElement("i");
    cardGitI.classList.add("fab", "fa-github-alt", "fs-biggest");

    const cardSiteA = document.createElement("a");
    cardSiteA.classList.add("card__btn");
    cardSiteA.href = project.site_url;
    cardSiteA.target = "_blank";
    // parent ^
    const cardSiteI = document.createElement("i");
    cardSiteI.classList.add("fas", "fa-eye", "fs-biggest");
    /* cardBackDiv child */
    /* cardContentDiv child */

    // mount card
    // cardBackDiv
    cardGitA.appendChild(cardGitI);
    cardSiteA.appendChild(cardSiteI);
    cardBackDiv.appendChild(cardGitA);
    cardBackDiv.appendChild(cardSiteA);

    // cardFrontDiv
    cardFrontHelperDiv.appendChild(cardDescP);
    cardFrontDiv.appendChild(cardTitleh3);
    cardFrontDiv.appendChild(cardFrontHelperDiv);

    // cardContentDiv
    cardContentDiv.appendChild(cardFrontDiv);
    cardContentDiv.appendChild(cardBackDiv);

    // cardDiv
    cardDiv.appendChild(cardContentDiv);

    // add animation
    cardDiv.addEventListener("click", (el) => {
      if (el.target.nodeName !== "A" && el.target.nodeName !== "I") {
        cardDiv.classList.toggle("card-active");
      }
    });

    // cardsElement
    cardsElement.appendChild(cardDiv);
  };

  const projectsCards = document.getElementById("projects-cards");
  const filterItems = document.getElementById("filter-items");
  const sadFace = document.getElementById("sad-face");
  //const projectsData = await fetch("http://localhost:5000/api/projects").json();
  const projectsData = data.data;
  const techSet = new Set();
  const filterList = [];

  const filterFunc = (tech) => {
    if (filterList.includes(tech)) {
      const techIndex = filterList.indexOf(tech);
      if (techIndex > -1) {
        filterList.splice(techIndex, 1);
      }
    } else {
      filterList.push(tech);
    }

    for (let card of projectsCards.children) {
      if (filterList.length <= 0) {
        card.style.display = "block";
      } else {
        const dataSetList = card.dataset.techList.split(",");
        const contains = filterList.every((value) =>
          dataSetList.includes(value)
        );
        if (!contains) {
          card.style.display = "none";
        } else {
          card.style.display = "block";
        }
      }
    }

    if (
      Array.from(projectsCards.children).some(
        (child) => child.style.display !== "none"
      )
    ) {
      sadFace.style.display = "none";
    } else {
      sadFace.style.display = "block";
    }
  };

  const createListItem = (tech) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item", "fs-med", "fc-light");
    itemDiv.innerText = tech;
    itemDiv.style.backgroundImage = "none";

    itemDiv.addEventListener("click", () => {
      filterFunc(tech);
      if (itemDiv.style.backgroundImage === "none") {
        itemDiv.style.backgroundImage = `linear-gradient(to left, ${getTechColor(
          tech
        )})`;
      } else {
        itemDiv.style.backgroundImage = "none";
      }
    });

    filterItems.appendChild(itemDiv);
  };

  const addTech = (techList) => {
    for (let tech of techList) {
      techSet.add(tech);
    }
  };

  for (let project of projectsData) {
    addTech(project.tech.tech_list);
    createCard(project, projectsCards);
  }

  for (let tech of techSet) {
    createListItem(tech);
  }
});
