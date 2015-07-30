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
      if (this.state.visible) {
        //console.log('focus parent');
        this.props.focusParent();
      };
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
          <button>--</button>
        </div>
      );
    }
  });

  APP.Toolbar = Toolbar;
  window.APP = APP;

})(this);
