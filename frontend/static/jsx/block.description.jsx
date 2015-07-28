var Description = React.createClass({
  getInitialState() {
    return {
      text: ''
    };
  },

  componentDidMount() {
    //React.findDOMNode(this.refs.text).focus();
  },

  focus() {
    React.findDOMNode(this.refs.text).focus();
  },

  handleChange(event) {
    this.props.handleChange(event);
  },

  render() {
    return (
      <textarea
        className="block-description"
        ref="text"
        value={this.props.text}
        placeholder='Description'
        onChange={this.handleChange}
        onKeyDown={this.handleChange} />
    );
  }
});
