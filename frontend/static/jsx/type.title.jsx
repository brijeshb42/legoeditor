//var APP = APP || {};
(function(window) {
  var APP = window.APP || {};

  var TitlePlaceholder = '<span class="placeholder">Title</span>';
  var Title = React.createClass({

    componentDidMount() {
      this.focus();
    },

    escapeKeyPress(event) {
      if(event.keyCode == APP.Keys.ENTER) {
        event.preventDefault();
      }
    },

    focus() {
      var node = React.findDOMNode(this.refs.text);
      if(node.innerHTML == TitlePlaceholder) {
        node.innerHTML = '';
      }
      node.focus();
    },

    blur(event) {
      if(event.target.innerHTML == '') {
        event.target.innerHTML = '<span class="placeholder">Title</span>';
      }
    },

    handleChange(event) {
      this.props.handleChange(event);
    },

    render() {
      return (
        <h1
          contentEditable="true"
          className="block-item"
          ref="text"
          type="text"
          value={this.props.text}
          placeholder='Title'
          onBlur={this.blur}
          onFocus={this.focus}
          onKeyDown={this.escapeKeyPress}
          onChange={this.props.handleChange}
          onKeyUp={this.props.handleChange} />
      );
    }
  });
  APP.Title = Title;
  window.APP = APP;

})(this);
