//var APP = APP || {};

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
        onChange={this.handleChange}
        onKeyDown={this.handleChange} />
    );
  }
});
