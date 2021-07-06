//import { data } from "./data.js";

// -------------------------------------------------------------- //
// ---------------------- crt/add projects ---------------------- //
// -------------------------------------------------------------- //
document.addEventListener("DOMContentLoaded", async () => {
  const projectsCards = document.getElementById("projects-cards");
  const filterItems = document.getElementById("filter-items");
  const sadFace = document.getElementById("sad-face");
  const loading = document.getElementById("loading");

  const fetchRes = await fetch("http://localhost:5000/api/projects");
  const projectsData = (await fetchRes.json()).data;
  //const projectsData = data.data;
  const techSet = new Set();
  const filterList = [];

  const getTechColor = (tech) => {
    const techColors = window.getComputedStyle(document.body);
    const frontend = [
      "frontend",
      "html",
      "css",
      "sass",
      "react",
      "redux",
      "gulp",
    ];
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
    // create item div
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item", "fs-med", "fc-light");
    itemDiv.innerText = tech;
    itemDiv.style.backgroundImage = "none";

    // add event to div
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

    // append div
    filterItems.appendChild(itemDiv);
  };

  const addTech = (techList) => {
    for (let tech of techList) {
      techSet.add(tech);
    }
  };

  // remove loading
  loading.style.display = "none";

  // start projects display
  for (let project of projectsData) {
    addTech(project.tech.tech_list);
    createCard(project, projectsCards);
  }

  for (let tech of techSet) {
    createListItem(tech);
  }
});
