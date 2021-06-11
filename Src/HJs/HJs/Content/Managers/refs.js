window.refs = [
    "Managers/SecurityManager.js",
];

class ManagersDependecies {

    /**
     * 
     * @param {DependencyContainer} dependencyContainer
     */
    registerDependencies(dependencyContainer) {
        dependencyContainer.registerFactoryAsSingleton(() => new SecurityManager());
    }

}