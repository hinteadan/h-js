(function (window, jQuery) {

    function nameOf(obj) {
        return Object.keys(obj)[0];
    }

    async function tryRun(promiseOrAction) {
        try { await Promise.resolve(promiseOrAction()); }
        catch (ex) { console.error(ex); }
    }

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



    function HJs() {

        this.initialize = () => {
            mainAsync();
            return this;
        }


        async function mainAsync() {
            await tryRun(async () => {
                measure(x => console.log(`H Js initialized in ${(x / 1000)} second(s)`), async () => {

                    await referenceLibs();

                });
            });
        }



        async function referenceLibs(url) {
            jQuery
                .ajaxSetup(
                    {
                        Cache: true,
                    }
                );

            await referenceLib("HJs/react.production.min.js");
            await referenceLib("HJs/react-dom.production.min.js");
        }

        async function referenceLib(url) {
            await new Promise((yey, ney) => {
                try {
                    jQuery.getScript(url, (response, jqXHR) => yey(response),);
                }
                catch (x) {
                    ney(x);
                }
            });
        }
    }

    new HJs().initialize();

})(window, jQuery);