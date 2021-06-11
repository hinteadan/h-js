class ComponentBase extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.children = props.children;
        this.props = props;
    };

}