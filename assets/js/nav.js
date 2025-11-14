document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(
    'nav a[href="javascript:void(0)"]',
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const parentLi = link.parentNode;
      const childrenUl = parentLi.querySelector("ul");
      if (childrenUl) {
        childrenUl.classList.toggle("active");
      }
    });
  });
});
