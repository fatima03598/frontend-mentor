const template = document.createElement("template");

template.innerHTML = `
    <link type="css" rel="stylesheet" href="../public/stylesheets/components/navbar.css" />

    <div class="nav-bar">
        <div class="nav-bar__menu_mobile">
        moooooo
        </div>
        <div class="nav-bar__logo">
          <slot name="logo"></slot>
        </div>
        <div class="nav-bar__menu">
        mmmmmmm
        </div>
        <div class="nav-bar__cart">
          <slot name="cart"></slot>
        </div>
        <div class="nav-bar__user">
          <slot name="user-pic"></slot>
        </div>
    </div>
`;

const debounce = (func) => {
  let timer;

  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 100, event);
  };
};
class NavBar extends HTMLElement {
  constructor() {
    super();

    const menuItems = ["Collections", "Men", "Women", "About", "Contact"];

    const shadow = this.attachShadow({ mode: "open" });

    shadow.append(template.content.cloneNode(true));

    this.updateMenuVisibility();

    window.addEventListener(
      "resize",
      debounce((e) => {
        this.handleWindowResize();
      })
    );
  }

  updateMenuVisibility() {
    const isMobile = this.isMobile();

    const mobileMenu = this.shadowRoot.querySelector(".nav-bar__menu_mobile");
    const desktopMenu = this.shadowRoot.querySelector(".nav-bar__menu");

    if (isMobile) {
      mobileMenu.style.visibility = "visible";
      desktopMenu.style.visibility = "hidden";
    } else {
      mobileMenu.style.visibility = "hidden";
      desktopMenu.style.visibility = "visible";
    }
  }

  handleWindowResize() {
    this.updateMenuVisibility();
  }

  isMobile() {
    return (
      Math.min(window.screen.width, window.screen.height) < 768 ||
      navigator.userAgent.indexOf("Mobi") > -1
    );
  }
}

customElements.define("nav-bar", NavBar);
