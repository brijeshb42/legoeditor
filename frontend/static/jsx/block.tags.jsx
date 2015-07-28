var TagItem = React.createClass({
  remove(tag) {
    this.props.onRemove(tag);
  },
  render() {
    return (
      <li className="tag-item">
        <span>{this.props.text}</span>
        <button onClick={this.remove.bind(this, this.props.text)}>&times;</button>
      </li>
    );
  }
});


var TagList = React.createClass({
  render() {
    var onRemove = this.props.onRemove;
    return (
      <ul className="tag-list">
        {this.props.tags.map(function(tag) {
          return (
            <TagItem
              onRemove={onRemove}
              key={tag}
              text={tag} />
            );
        })}
      </ul>
    );
  }
});


var Tags = React.createClass({
  getInitialState() {
    return {
      value: ''
    };
  },

  focus() {
    React.findDOMNode(this.refs.text).focus();
  },

  handleTag(str, fromEnter) {
    if(str.length < 1) {
      return;
    }
    str = str.toLowerCase();
    if(fromEnter || str[str.length-1] == ',') {
      var newStr = fromEnter ? str : (str.substr(0, str.length-1));
      this.props.handleChange(newStr);
      this.setState({
        value: '',
      });
    }
  },

  handleChange(event) {
    var str = event.target.value;
    this.setState({
      value: str
    });
    this.handleTag(str, false);  
  },

  handleKey(event) {
    if(event.keyCode == 13) {
      this.handleTag(event.target.value, true);
    }
  },

  render() {
    return (
      <div className="block-tags">
        <TagList
          onRemove={this.props.onRemove}
          tags={this.props.tags} />
        <input
          className="block-item"
          placeholder="Enter tags and press enter or comma"
          ref="text"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleKey} />
      </div>
    );
  }
});
