(function(window) {
  var APP = window.APP || {};

  var Description = React.createClass({
    // getInitialState() {
    //   return {
    //     text: ''
    //   };
    // },

    //componentDidMount() {
    //  React.findDOMNode(this.refs.text).focus();
    //},

    focus() {
      var node = React.findDOMNode(this.refs.text);
      var strLength= node.value.length * 2;
      node.focus();
      node.setSelectionRange(strLength, strLength);
    },

    handleChange(event) {
      this.props.handleChange(event);
    },

    escapeReturn(event) {
      if(event.keyCode == 13) {
        event.preventDefault();
      }
    },

    render() {
      return (
        <textarea
          className="block-description"
          ref="text"
          value={this.props.text}
          placeholder='Description'
          onChange={this.handleChange}
          onKeyUp={this.handleChange}
          onKeyDown={this.escapeReturn} />
      );
    }
  });

  APP.Description = Description;
  window.APP = APP;

})(this);
