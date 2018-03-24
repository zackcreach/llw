import config from "./config";
import { apiRequest } from "./api";
import utilities from "./utilities";
import { get } from "lodash";

export default class EmailForm {
    constructor() {
        this.form = document.querySelector(".post__module-form");
        this.modal = document.querySelector(".modal");
        this.outer = document.querySelector(".modal__outer");
        this.close = document.querySelector(".modal__close-x");

        this.showModal = false;

        this.events();
    }
    events() {
        ["click", "touchstart", "keyup"].map((event) =>
            window.addEventListener(event, this.handleEvents.bind(this)),
        );
        window.addEventListener("submit", this.handleSubmit.bind(this));
    }
    handleEvents(event) {
        if (
            event.target === this.outer ||
            event.target === this.close ||
            event.keyCode === 27
        ) {
            event.preventDefault();
            this.showModal = !this.showModal;
            this.handleMenu();
        }
    }
    handleSubmit(event) {
        event.preventDefault();

        const emailInput = document.querySelector("[name='email']");
        let emailValue = emailInput.value;

        const params = {
            email: emailValue,
            brandId: config.custom.brand_id,
            referralId: _.get(window, "initialProps.referralId") || `N/A`,
            source:
                _.get(window, "initialProps.source") ||
                `Discoverer Blog – ${location.pathname}`,
        };

        apiRequest(
            "/public/subscribers",
            "POST",
            params,
            null,
            (response, success, error) => {
                // Errors
                if (error) {
                    var error =
                        "An error occured trying to subscribe to The Discoverer, please try again";
                    if (response && response.message) error = response.message;
                    console.log("Error subscribing: " + error);

                    emailInput.value = "";
                    this.handleMenu();
                    return;
                }

                console.log("Submitted successfully!");
                emailInput.setAttribute("disabled", "true");
                emailInput.value = "";
                this.handleMenu();
                return;
            },
        );
    }
    handleMenu() {
        if (!this.showModal) {
            this.modal.classList.add("modal--active");
            this.modal.setAttribute("aria-hidden", "false");
        } else {
            this.modal.classList.remove("modal--active");
            this.modal.setAttribute("aria-hidden", "true");
            this.showModal = false;
        }
    }
}
