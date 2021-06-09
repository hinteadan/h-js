class DependencyFactory {

    /**
     * 
     * @param {DependencyContainer} dependencyContainer
     */
    constructor(dependencyContainer, instanceOrFactory, isAlwaysNew = false) {

        var isFactory = jQuery.isFunction(instanceOrFactory);

        this.dependencyContainer = dependencyContainer;
        this.instance = isFactory ? null : instanceOrFactory;
        this.factory = isFactory ? instanceOrFactory : () => instanceOrFactory;
        this.isAlwaysNew = isAlwaysNew;
    }

    getInstance() {
        this.ensureInstance();
        return this.instance;
    }

    ensureInstance() {
        if (this.instance && !this.isAlwaysNew)
            return;

        this.instance = this.factory();
        if (jQuery.isFunction(this.instance.ReferDependencies)) {
            this.instance.ReferDependencies(this.dependencyContainer);
        }
    }

}