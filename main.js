// Knockout is included

class Model {
    constructor(api) {
        this.apps = ko.observableArray([]);
        this.views = {
            home: ko.observable(true),
            build: ko.observable(false),
            run: ko.observable(false)
        }

        /**
         * Start any App as found by the search
         * @param {*} data 
         * @param {*} evt 
         */
        this.on_play = (data, evt) => {
            let redirect = window.location.origin + "/app/" + data.name;
            // console.log(redirect)

            window.location.href = redirect;
        }

        /**
         * Shortcut for running the ME app, which is used to start developing
         */
        this.on_play_me = () => {
            this.on_play({ name: "me" });
        }

        this.on_show = function(data, evt) {
            let name = evt.srcElement.name;
            for (let key in this.views) {
                if (key === name) {
                    this.views[key](true);
                } else {
                    this.views[key](false);
                }
            }
        }
    }
}

export default class Main {
    constructor(config) {
        this.$api = config.api;

        this.model = new Model(this.api);

        ko.applyBindings(this.model);
    }

    async init(config) {
        // let res = await this.$api.$post("/open/apps/list", {});
        // Commented as I don't want to do this on the default anymore
        // for (let i = 0; i < res.apps.length; i++) {
        //     res.apps[i].app_icon = "url(/packages/" + res.apps[i].id + "/icons/mask-192.png)";
        // }

        // this.model.apps(res.apps)
    }
}