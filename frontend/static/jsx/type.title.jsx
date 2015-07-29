//var APP = APP || {};
(function(window) {
  var APP = window.APP || {};
  var Title = React.createClass({

    componentDidMount() {
      this.focus();
    },

    focus() {
      React.findDOMNode(this.refs.text).focus();
    },

    handleChange(event) {
      this.props.handleChange(event);
    },

    render() {
      return (
        <input
          className="block-item"
          ref="text"
          type="text"
          value={this.props.text}
          placeholder='Title'
          onChange={this.props.handleChange}
          onKeyUp={this.props.handleChange} />
      );
    }
  });
  APP.Title = Title;
  window.APP = APP;

})(this);
