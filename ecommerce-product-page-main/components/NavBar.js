import stylesheet from "../public/stylesheets/components/navbar.css";
import logo from "../images/logo.svg";

const template = document.createElement("template");

template.innerHTML = `
    <div class="nav-bar">
        <div class="nav-bar__logo">
        <slot name="logo"></slot>
        </div>
    </div>
`;

class NavBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [stylesheet];

    shadow.append(template.content.cloneNode(true));

    const logoEl = shadow.querySelector(".nav-bar__logo");
    const img = document.createElement("img");
    img.src = logo;
    img.alt = "Sneakers Logo";
    logoEl.appendChild(img);
  }
}

customElements.define("nav-bar", NavBar);
