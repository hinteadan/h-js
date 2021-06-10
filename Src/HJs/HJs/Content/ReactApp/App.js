/// <reference path="../HJs/react.production.min.js" />
/// <reference path="../HJs/react-dom.production.min.js" />
/// <reference path="../HJs/react-router-dom.min.js" />

class ReactApp extends HJsBase {

    constructor(appContainerElement) {
        super();
        this.appContainerElement = appContainerElement;
    }

    async boot() {

        await measure(x => console.log(`ReactApp booted up in ${(x / 1000)} second(s)`), async () => {

            ReactDOM.render(
                React.createElement(ReactRouterDOM.HashRouter, {},
                    React.createElement('div', null, `Alive @ ${new Date()}`)
                ),
                this.appContainerElement
            );

        });

    }

}