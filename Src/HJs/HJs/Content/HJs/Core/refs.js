window.ref = async () => {

    const libs = [
        "HJs/Core/DependencyContainer.js",
        "HJs/Core/DependencyFactory.js",
        "HJs/Core/HttpClient.js",
    ];

    async function referenceLibs(url) {
        for (var i in libs) {
            await referenceLib(libs[i]);
        }
    }

    await tryRun(async () => {
        await measure(x => console.log(`Loaded HJs Core in ${(x / 1000)} second(s)`), async () => {

            await referenceLibs(libs);



        });
    });

    delete window.ref;
};

class CoreDependecies {

    /**
     * 
     * @param {DependencyContainer} dependencyContainer
     */
    registerDependencies(dependencyContainer) {
        dependencyContainer.registerFactoryAsSingleton(() => new HttpClient());
    }

}