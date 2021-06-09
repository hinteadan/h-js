window.ref = async () => {

    const libs = [
        "Models/SecurityContext.js",
    ];

    async function referenceLibs(url) {
        for (var i in libs) {
            await referenceLib(libs[i]);
        }
    }

    await tryRun(async () => {
        await measure(x => console.log(`Loaded Models in ${(x / 1000)} second(s)`), async () => {

            await referenceLibs(libs);



        });
    });

    delete window.ref;
};