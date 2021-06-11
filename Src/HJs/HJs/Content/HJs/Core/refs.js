window.refs = [
    "HJs/Core/DependencyContainer.js",
    "HJs/Core/DependencyFactory.js",
    "HJs/Core/HttpClient.js",

    "HJs/Core/Model/HJsBase.js",
    "HJs/Core/Model/OperationResult.js",
];

class CoreDependecies {

    /**
     * 
     * @param {DependencyContainer} dependencyContainer
     */
    registerDependencies(dependencyContainer) {
        dependencyContainer.registerFactoryAsSingleton(() => new HttpClient());
    }

}