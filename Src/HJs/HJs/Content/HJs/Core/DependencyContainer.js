class DependencyContainer {

    dependenciesDictionary = {}

    registerFactoryAsSingleton(factory) {
        var instance = factory();
        if (jQuery.isFunction(instance.registerDependencies)) {
            instance.registerDependencies(this);
        }

        var dependencyFactory = new DependencyFactory(this, instance);

        instance.__proto__.typeID = instance.__proto__.typeID || newGuid();
        this.dependenciesDictionary[instance.__proto__.typeID] = dependencyFactory;
    }

    registerInstanceAsSingleton(instance) {
        registerFactoryAsSingleton(() => instance);
    }

    registerFactoryAsTransient(factory) {
        var instance = factory();

        var dependencyFactory = new DependencyFactory(this, factory, true);

        instance.__proto__.typeID = instance.__proto__.typeID || newGuid();
        this.dependenciesDictionary[instance.__proto__.typeID] = dependencyFactory;
    }

    resolve(typeID) {
        try {
            return this.dependenciesDictionary[typeID].getInstance();
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

}