class DependencyContainer {

    constructor() {
        
    }

    dependenciesDictionary = {}

    registerAsSingleton(instance) {
        instance.__proto__.typeID = instance.__proto__.typeID || newGuid();
        this.dependenciesDictionary[instance.__proto__.typeID] = instance;
    }

    resolve(typeID) {
        return this.dependenciesDictionary[typeID];
    }

}