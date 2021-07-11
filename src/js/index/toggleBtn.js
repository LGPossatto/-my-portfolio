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
