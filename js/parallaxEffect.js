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
