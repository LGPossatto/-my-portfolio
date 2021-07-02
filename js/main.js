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
projectsFilter.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
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
  const createCard = (project, cardsElement) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    /* cardDiv child */
    const cardContentDiv = document.createElement("div");
    cardContentDiv.classList.add("card__content");
    /* cardDiv child */

    /* cardContentDiv child */
    const cardFrontDiv = document.createElement("div");
    cardFrontDiv.classList.add("card__front");

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
  //const projectsData = await fetch("http://localhost:5000/api/projects").json();
  const projectsData = data.data;

  for (let project of projectsData) {
    createCard(project, projectsCards);
  }
});
