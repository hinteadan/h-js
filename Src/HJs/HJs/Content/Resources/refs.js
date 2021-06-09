window.ref = async () => {

    const libs = [
        
    ];

    async function referenceLibs(url) {
        for (var i in libs) {
            await referenceLib(libs[i]);
        }
    }

    await tryRun(async () => {
        await measure(x => console.log(`Loaded Resources in ${(x / 1000)} second(s)`), async () => {

            await referenceLibs(libs);



        });
    });

    delete window.ref;
};

class ResourcesDependecies {

    /**
     * 
     * @param {DependencyContainer} dependencyContainer
     */
    registerDependencies(dependencyContainer) {
        //dependencyContainer.registerFactoryAsSingleton(() => new HttpClient());
    }

}