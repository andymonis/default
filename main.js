// Knockout is included

import V3Store from "/vee3/vee_store.js";

class Utils {
    constructor() {}

    static validateEmail(email) {
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
        // Reason to contact
        this.reason = ko.observable("");
        // Feedback used to provide feedback on status
        this.feedback = ko.observable("");
        /**
         * On Register handler, used to register
         */
        this.on_register = async(data, evt) => {
            // Get the email prop
            let email = this.email();
            let reason = this.reason();
            // Validate the email prop
            let valid = Utils.validateEmail(email);
            if (valid !== null) {
                // Write to Vee3
                // Special Case app is allowed to write to
                let body = {
                    email: encodeURIComponent(email),
                    reason: encodeURIComponent(reason)
                };
                let res = await V3Store.$post("/register/interest", body);
                this.feedback(`Registered ${res.status}. Thanks we'll be in touch.`);
            } else {
                this.feedback(`email address is invalid`);
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