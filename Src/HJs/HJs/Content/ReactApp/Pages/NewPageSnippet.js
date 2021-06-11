class MyNewPage extends PageBase {

    constructor(props, children) { super(props, children); this.children = children }

    render() {
        return React.createElement('div', {}, this.children);
    }

}