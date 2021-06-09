(function (rootContext, jQuery) {

    function HJs() {

        let isInitializing = false;

        function constructor() {

        }



        this.Main = () => {
            MainAsync();
            return this;
        }

        this.NameOf = x => NameOf(x);
        this.IsInitializing = () => isInitializing;




        async function MainAsync() {
            try {
                isInitializing = true;
                await Promise.resolve(true);
            }
            finally {
                isInitializing = false;
            }
        }

        function NameOf(obj) {
            return Object.keys(obj)[0];
        }

        async function ReferenceLibs(url) {
            jQuery
                .ajaxSetup(
                    {
                        Cache: true,
                    }
                );

            await ReferenceLib("react.production.min.js");
            await ReferenceLib("react-dom.production.min.js");
        }

        async function ReferenceLib(url) {
            await new Promise((yey, ney) => {
                try {
                    jQuery.getScript(url, (response, jqXHR) => yey(response),);
                }
                catch (x) {
                    ney(x);
                }
            });
        }


        constructor();
    }

    rootContext.HJs = new HJs().Main();

})(window, jQuery);