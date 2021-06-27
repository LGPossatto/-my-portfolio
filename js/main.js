// ------------------------- menu button ------------------------- //
const navHelper = document.getElementById("nav-helper");

navHelper.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    navHelper.classList.toggle("menu-active");
  }
});

// ------------------------- typewriter ------------------------- //
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

// ----------------------- projects cards ----------------------- //
const projectsCards = document.getElementById("projects-cards").children;

for (let i = 0; i < projectsCards.length; i++) {
  projectsCards[i].addEventListener("click", (el) => {
    if (el.target.nodeName !== "A" && el.target.nodeName !== "I") {
      projectsCards[i].classList.toggle("card-active");
    }
  });
}

// -------------------------- parallax --------------------------- //
document.addEventListener("scroll", () => {
  const parallaxElements = document.getElementById("parallax").children;

  for (let i = 0; i < parallaxElements.length; i++) {
    let pos = window.pageYOffset * parallaxElements[i].dataset.speed;

    parallaxElements[i].style.transform = `translate3d(0px, ${pos}px, 0px)`;
  }
});
