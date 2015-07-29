(function(window) {
  var APP = window.APP || {};

  var Toolbar = React.createClass({
    getInitialState() {
      return {
        visible: false
      };
    },

    toggleState(event) {
      //this.props.showToolbar();
      var visible = this.state.visible;
      this.setState({
        visible: !visible
      });
    },

    render() {
      if(!this.state.visible) {
        return (
          <div
            className="toolbar">
            <button
              onClick={this.toggleState}
              title="Change Type">+</button>
          </div>
        );
      }
      return (
        <div
          className="toolbar">
          <button
            onClick={this.toggleState}
            title="Close">&times;</button>
          <button>+</button>
          <button>I</button>
          <button>V</button>
        </div>
      );
    }
  });

  APP.Toolbar = Toolbar;
  window.APP = APP;

})(this);
