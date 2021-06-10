/// <reference path="core/dependency.js" />

(function (window, jQuery) {

    function nameOf(obj) {
        return Object.keys(obj)[0];
    }
    window.nameOf = nameOf;

    function newGuid() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if (d > 0) {//Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    window.newGuid = newGuid;

    async function tryRun(promiseOrAction) {
        try { await Promise.resolve(promiseOrAction()); }
        catch (ex) { console.error(ex); }
    }
    window.tryRun = tryRun;

    async function using(onStart, onEnd, promiseOrAction) {
        try {
            await tryRun(onStart);
            await Promise.resolve(promiseOrAction());
        }
        catch (ex) { console.error(ex); }
        finally {
            await tryRun(onEnd);
        }
    }
    window.using = using;

    async function measure(onEnd, promiseOrAction) {
        var startedAt, endedAt, durationInMilliseconds;
        await using(
            _ => startedAt = new Date(),
            async _ => {
                endedAt = new Date();
                durationInMilliseconds = endedAt.getTime() - startedAt.getTime();
                await tryRun(() => onEnd(durationInMilliseconds));
            },
            promiseOrAction
        );
        return durationInMilliseconds;
    }
    window.measure = measure;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    window.sleep = sleep;

    async function referenceLib(url) {
        await new Promise((yey, ney) => {
            try {
                jQuery.getScript(url, (response, jqXHR) => {
                    console.info(`Loaded lib ${url}`);
                    yey(response);
                });
            }
            catch (x) {
                ney(x);
            }
        });
    }
    window.referenceLib = referenceLib;

    function HJs() {

        const libs = [
            "HJs/react.production.min.js",
            "HJs/react-dom.production.min.js",
            "HJs/react-router-dom.min.js",
            "HJs/Branding.js",

            "HJs/Core/refs.js",

            "Models/refs.js",

            "Resources/refs.js",
            "Engines/refs.js",
            "Managers/refs.js",

            "ReactApp/refs.js",
        ];

        let dependencyContainer;

        this.initialize = () => {
            mainAsync();
            return this;
        }


        async function mainAsync() {
            await tryRun(async () => {
                await measure(x => console.log(`H Js initialized in ${(x / 1000)} second(s)`), async () => {

                    await referenceLibs();

                    constructDependencyContainer();

                    await wireupDependencies();

                    setGlobalStyling();

                    await new ReactApp(createAppContainer()).boot();

                });
            });
        }

        function createAppContainer() {
            let appContainer = document.createElement('div');
            appContainer.id = "AppContainer";
            appContainer.style.height = "100%";
            appContainer.style.width = "100%";
            document.body.appendChild(appContainer);
            return appContainer;
        }

        function setGlobalStyling() {
            disableMobileResize();
            setAppIconLinksInHeader();
            referenceAndSetGlobalCssAndStyles();
            referenceFonts();
            setGlobalFontStyle();
        }

        function setGlobalFontStyle() {
            $('body').css({
                color: Branding.TextColor,
                backgroundColor: Branding.BackgroundColor,
                fontFamily: Branding.FontFamily,
                fontSize: Branding.FontSize,
            });
        }

        function referenceAndSetGlobalCssAndStyles() {
            let $head = jQuery('head');

            $head.append('<link href="/HJs/fabric.min.css" rel="stylesheet"/>');

            $("html, body").css({
                width: "100%",
                height: "100%",
                margin: 0,
                padding: 0,
            });

            $head.append(`
<style>
a:link, a:visited, a:hover, a:active, a:focus {
    color: inherit;
    cursor: pointer;
    text-decoration: underline;
}

a:focus, a:hover {
    opacity: 0.8;
}

input, select, textarea, button {
    font-family: ${Branding.FontFamily};
    padding: ${Branding.SizingUnit / 2}px;
    font-size: ${Branding.FontSiz};
    border-radius: ${Branding.SizingUnit / 5}px;
    border: solid 1px rgba(0, 0, 0, 0.45);
    background-color: rgba(0, 0, 0, 0);
    margin: ${Branding.SizingUnit / 2}px;
}

button {
    cursor: pointer;
}

.mouse-highlight:hover {
    background-color: ${Branding.BackgroundColorHighlight}!important;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

table th, table td {
    padding: ${Branding.SizingUnit / 2}px;
}

table thead th {
    background-color: ${Branding.PrimaryColor};
}

table tbody tr:nth-child(even) td {
    background-color: ${Branding.PrimaryColorFaded};
}

table tbody tr:hover td {
    background-color: ${Branding.PrimaryColorTranslucent};
}
</style>
`);
        }

        function referenceFonts() {
            let $head = jQuery('head');
            $head.append('<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap&subset=latin-ext" rel="stylesheet" />');
        }

        function disableMobileResize() {
            let $head = jQuery('head');

            $head.append('<meta name="viewport" content="width=device-width, user-scalable=no" />');
        }

        function setAppIconLinksInHeader() {
            let $head = jQuery('head');

            $head.append('<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180"/>');
            $head.append('<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16"/>');
            $head.append('<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32"/>');
            $head.append('<link rel="manifest" href="/site.webmanifest" />');
        }

        function constructDependencyContainer() {
            dependencyContainer = new DependencyContainer();
            window.resolve = typeOrTypeID => dependencyContainer.resolve(typeOrTypeID);
        }

        async function referenceLibs() {
            jQuery
                .ajaxSetup(
                    {
                        Cache: true,
                    }
                );


            for (var i in libs) {
                await referenceLib(libs[i]);
                if (window.ref)
                    await ref();
            }
        }

        async function wireupDependencies() {

            await tryRun(async () => {
                await measure(x => console.log(`Wired up dependencies in ${(x / 1000)} second(s)`), async () => {

                    dependencyContainer.registerFactoryAsSingleton(() => new CoreDependecies());
                    dependencyContainer.registerFactoryAsSingleton(() => new ResourcesDependecies());
                    dependencyContainer.registerFactoryAsSingleton(() => new EnginesDependecies());
                    dependencyContainer.registerFactoryAsSingleton(() => new ManagersDependecies());

                });
            });
        }

    }

    new HJs().initialize();


})(window, jQuery);