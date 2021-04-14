import React from 'react';

export default function asyncComponent(getComponent, loadingComponent) {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { Component: null };
    }

    componentDidMount() {
      const { Component } = this.state;
      if (!Component) {
        getComponent()
          .then((Comp) => {
            this.setState({ Component: Comp });
          });
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Component {...this.props} />;
      }
      return loadingComponent || <div>Loading...</div>;
    }
  }

  return AsyncComponent;
}
