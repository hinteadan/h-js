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

    resolve(typeOrTypeID) {
        try {
            var id = typeOrTypeID?.prototype?.typeID || typeOrTypeID?.__proto__?.typeID || typeOrTypeID;
            return this.dependenciesDictionary[id].getInstance();
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

}