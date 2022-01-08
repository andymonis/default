// Knockout is included

import V3Store from "/vee3/vee_store.js";

class Utils {
    static validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
}

class Model {
    constructor(api) {
        this.visible = ko.observable(true);
        // Email Address used in registration
        this.email = ko.observable("");
        /**
         * On Register handler, used to register
         */
        this.on_register = async(data, evt) => {
            // Check the email is valid
            let valid = Utils.validateEmail(this.email());
            if (valid !== undefined) {
                // Write to Vee3
                let res = await V3Store.$post("/register/interest", {
                    email: this.email()
                });
            } else {
                console.log("email address is invalid");
            }
        }
    }
}

export default class Main {
    constructor(config) {
        this.$api = config.api;
        // Set app instanceId into store
        V3Store.instanceId(config.app.instancedid);

        this.model = new Model(this.api);
        window.model = this.model;

        ko.applyBindings(this.model);
    }

    async init(config) {}
}