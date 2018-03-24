export default class Menu {
    constructor() {
        this.hamburger = document.querySelector("[class*=linework__menu]");
        this.window = document.querySelector(".menu__window");
        this.container = document.querySelector(".menu__window-container");
        this.menu = document.querySelector(".menu__window-container");
        this.close = document.querySelector(".menu__header-linework");

        this.showMenu = false;

        this.events();
    }
    events() {
        ["click", "touchstart", "keyup"].map((event) =>
            window.addEventListener(event, this.handleEvents.bind(this)),
        );
    }
    handleEvents(event) {
        if (
            event.target === this.hamburger ||
            event.target === this.menu ||
            event.target === this.close ||
            (event.keyCode === 27 && this.showMenu)
        ) {
            event.preventDefault();
            this.showMenu = !this.showMenu;
            this.handleMenu();
        }
    }
    handleMenu() {
        if (this.showMenu) {
            this.container.classList.add("menu__window-container--active");
            this.container.setAttribute("aria-hidden", "false");
            this.window.classList.add("menu__window--active");
        } else {
            this.container.classList.remove("menu__window-container--active");
            this.container.setAttribute("aria-hidden", "true");
            this.window.classList.remove("menu__window--active");
        }
    }
}
