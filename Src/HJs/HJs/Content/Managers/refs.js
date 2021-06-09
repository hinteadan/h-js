window.ref = async () => {

    const libs = [
        "Managers/SecurityManager.js",
    ];

    async function referenceLibs(url) {
        for (var i in libs) {
            await referenceLib(libs[i]);
        }
    }

    await tryRun(async () => {
        await measure(x => console.log(`Loaded Managers in ${(x / 1000)} second(s)`), async () => {

            await referenceLibs(libs);



        });
    });

    delete window.ref;
};

class ManagersDependecies {

    /**
     * 
     * @param {DependencyContainer} dependencyContainer
     */
    registerDependencies(dependencyContainer) {
        dependencyContainer.registerFactoryAsSingleton(() => new SecurityManager());
    }

}