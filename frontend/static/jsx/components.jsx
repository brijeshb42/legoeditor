var initialState = {
  title: '',
  description: '',
  tags: [],
  blocks: []
};

var Article = React.createClass({
  getInitialState() {
    return initialState;
  },

  // componentDidMount() {
  // },

  handleTitleChange(event) {
    if(event.type == 'keydown' && event.keyCode == 13) {
      this.refs.description.focus();
      return;
    }
    this.setState({
      title: event.target.value
    });
  },

  handleDescriptionChange(event) {
    if(event.type == 'keydown' && event.keyCode == 13) {
      this.refs.tags.focus();
      return;
    }
    this.setState({
      description: event.target.value
    });
  },

  handleTagChange(newTag) {
    var tags = this.state.tags;
    var newTags = tags.concat([newTag]);
    this.setState({
      tags: newTags
    });
  },

  removeTag(text) {
    var tags = this.state.tags;
    var newTags = [];
    tags.map(function(tag) {
      if(tag !== text) {
        newTags.push(tag)
      }
    });
    this.setState({
      tags: newTags
    });
  },

  render() {
    return (
      <div className='form-field'>
        <Title
          ref="title"
          text={this.state.title}
          handleChange={this.handleTitleChange} />
        <Description
          ref="description"
          text={this.state.description}
          handleChange={this.handleDescriptionChange} />
        <Tags
          ref="tags"
          tags={this.state.tags}
          handleChange={this.handleTagChange}
          onRemove={this.removeTag} />
      </div>
    );
  }
});

var article = <Article />
React.render(article, document.getElementById('editor-content'));
