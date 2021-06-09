class SecurityManager extends HJsBase {

    securityContext = SecurityContext.None;

    /**
     * 
     * @param {DependencyContainer} dependencyContainer
     */
    registerDependencies(dependencyContainer) {
        dependencyContainer.registerFactoryAsTransient(() => this.securityContext);
    }

    async authenticateCredentials(username, password) {

        await sleep(1000 * 2);

        this.securityContext = this.generateDummySecurityContext();

        return OperationResult.win(this.securityContext);
    }

    generateDummySecurityContext() {
        return new SecurityContext()
            .and(
                x => x.user = new UserInfo()
                    .and(u => u.username = "hintee")
                    .and(u => u.displayName = "Hin Tee")
            )
            ;
    }

}