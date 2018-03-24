export default class Navigation {
    constructor() {
        this.links = [...document.querySelectorAll(".navigation__link")];
        this.url = location.pathname;

        this.events();
    }
    events() {
        // console.log(this.links[0].attributes.href.value);
        this.highlightCurrentPath();
    }
    highlightCurrentPath() {
        this.links.map((link) => {
            const href = link.attributes.href.value;
            // if (href.includes("guide-me")) {
            //     link.classList.add("navigation__link--active");
            // }
            if (this.url === href) {
                link.classList.add("navigation__link--active");
            }
        });
    }
}
