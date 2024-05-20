const template = document.createElement("template");

template.innerHTML = `
    <link type="text/css" rel="stylesheet" href="./public/stylesheets/components/navbar.css" />

    <div class="nav-bar">
        <div class="nav-bar__menu_mobile">
        moooooo
        </div>
        <div class="nav-bar__logo">
          <slot name="logo"></slot>
        </div>
        <div class="nav-bar__menu">
        </div>
        <div class="nav-bar__end-items">
          <div class="nav-bar__cart">
            <slot name="cart"></slot>
          </div>
          <div class="nav-bar__user">
            <slot name="user-pic"></slot>
          </div>
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
  static observedAttributes = ["mobile"];

  constructor() {
    super();

    const menuItems = ["Collections", "Men", "Women", "About", "Contact"];

    const shadow = this.attachShadow({ mode: "open" });

    shadow.append(template.content.cloneNode(true));

    this.addMenuItems(menuItems);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "mobile") {
      const trueValue = newValue === "true";
      this.updateMenuVisibility(trueValue);
    }
  }

  addMenuItems(menuItems) {
    const menu = this.shadowRoot.querySelector(".nav-bar__menu");
    menuItems.forEach((item) => {
      const menuItem = document.createElement("div");
      menuItem.classList.add("nav-bar__menu-item");
      menuItem.textContent = item;
      menu.appendChild(menuItem);
    });
  }

  updateMenuVisibility(isMobile) {
    const mobileMenu = this.shadowRoot.querySelector(".nav-bar__menu_mobile");
    const desktopMenu = this.shadowRoot.querySelector(".nav-bar__menu");

    if (isMobile) {
      mobileMenu.style.display = "block";
      desktopMenu.style.display = "none";
    } else {
      mobileMenu.style.display = "none";
      desktopMenu.style.display = "flex";
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
