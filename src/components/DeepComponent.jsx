import React from "react";

class DeepComponent extends React.Component {

    constructor(props: Object) {
        super(props);
    }

    render(): string {
        return this.props.children;
    }

    shouldComponentUpdate(nextProps: Object, nextState: Object): boolean {
        let propsUpdated = JSON.stringify(this.props) === JSON.stringify(nextProps);
        let stateUpdated = JSON.stringify(this.state) === JSON.stringify(nextState);
        return propsUpdated || stateUpdated;
    }
}

module.exports = DeepComponent;
