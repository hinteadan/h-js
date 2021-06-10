window.ref = async () => {

    const libs = [
        "ReactApp/App.js",

    ];

    async function referenceLibs(url) {
        for (var i in libs) {
            await referenceLib(libs[i]);
        }
    }

    await tryRun(async () => {
        await measure(x => console.log(`Loaded React App in ${(x / 1000)} second(s)`), async () => {

            await referenceLibs(libs);

        });
    });

    delete window.ref;
};

class ReactAppDependecies {

    /**
     * 
     * @param {DependencyContainer} dependencyContainer
     */
    registerDependencies(dependencyContainer) {
        //dependencyContainer.registerFactoryAsSingleton(() => new HttpClient());
    }

}