﻿/// <reference path="core/dependency.js" />

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

            "HJs/Core/refs.js",

            "Models/refs.js",

            "Resources/refs.js",
            "Engines/refs.js",
            "Managers/refs.js",
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

                });
            });
        }

        function constructDependencyContainer() {
            dependencyContainer = new DependencyContainer();
            window.get = type => dependencyContainer.resolve(type.prototype.typeID);
        }

        async function referenceLibs(url) {
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