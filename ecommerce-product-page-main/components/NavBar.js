const template = document.createElement("template");

template.innerHTML = `
    <link type="text/css" rel="stylesheet" href="./public/stylesheets/components/navbar.css" />

    <div class="nav-bar">
        <div class="overflow"></div> 
        <div class="nav-bar__menu_mobile">
          <slot name="mobile-menu-icon"></slot>
        </div>
        <div class="nav-bar__full_menu_mobile">
          <div class="nav-bar__full_menu_mobile_close_icon">
            <slot name="mobile-menu-close-icon"></slot>
          </div>
        </div>
        <div class="nav-bar__logo">
          <slot name="logo"></slot>
        </div>
        <div class="nav-bar__menu">
        </div>
        <div class="nav-bar__end-items">
          <div class="nav-bar__cart">
            <slot name="cart"></slot>
            <div class="nav-bar__cart__popup"></div>
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

    const shadow = this.attachShadow({ mode: "open" });

    shadow.append(template.content.cloneNode(true));

    this.addMenuItems("nav-bar__menu", "nav-bar__menu-item");

    this.mobileMenuMenuSetup();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "mobile") {
      const trueValue = newValue === "true";
      this.updateMenuVisibility(trueValue);
      this.mobileMenuMenuSetupEvents(trueValue);
    } else if (name === "cart-items-number") {
      console.log("cart items number changed");
      console.log(newValue);
    }
  }

  addMenuItems(parentElementSelector, itemClass) {
    const menuItems = ["Collections", "Men", "Women", "About", "Contact"];

    const menu = this.shadowRoot.querySelector("." + parentElementSelector);
    menuItems.forEach((item) => {
      const menuItem = document.createElement("div");
      menuItem.classList.add(itemClass);
      menuItem.textContent = item;
      menu.appendChild(menuItem);
    });
  }

  mobileMenuMenuSetup() {
    const expandedMenu = this.shadowRoot.querySelector(
      ".nav-bar__full_menu_mobile"
    );
    const mobileMenuItems = document.createElement("div");
    mobileMenuItems.classList.add("mobile-menu-items");

    expandedMenu.appendChild(mobileMenuItems);

    this.addMenuItems("mobile-menu-items", "mobile-menu-item");
  }

  mobileMenuMenuSetupEvents(isMobile) {
    // hide expanded menu
    const expandedMenu = this.shadowRoot.querySelector(
      ".nav-bar__full_menu_mobile"
    );

    const overflow = this.shadowRoot.querySelector(".overflow");

    if (!isMobile) {
      expandedMenu.style.display = "none";
    } else {
      expandedMenu.style.display = "flex";
      expandedMenu.classList.remove("active");
    }

    // add event listener to mobile menu icon
    const mobileMenuIcon = this.shadowRoot.querySelector(
      ".nav-bar__menu_mobile"
    );

    mobileMenuIcon.addEventListener("click", () => {
      expandedMenu.classList.add("active");
      overflow.classList.add("active");
    });

    // add event listener to close icon
    const closeIcon = this.shadowRoot.querySelector(
      ".nav-bar__full_menu_mobile_close_icon"
    );

    closeIcon.addEventListener("click", () => {
      expandedMenu.classList.remove("active");
      overflow.classList.remove("active");
    });
  }

  updateMenuVisibility(isMobile) {
    const mobileMenu = this.shadowRoot.querySelector(".nav-bar__menu_mobile");
    const desktopMenu = this.shadowRoot.querySelector(".nav-bar__menu");

    if (isMobile) {
      mobileMenu.style.display = "flex";
      desktopMenu.style.display = "none";
    } else {
      mobileMenu.style.display = "none";
      desktopMenu.style.display = "flex";
    }
  }
}

customElements.define("nav-bar", NavBar);
