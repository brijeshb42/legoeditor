(function(window) {
  var APP = window.APP || {};

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

    componentDidMount() {
      var self = this;
      setInterval(function() {
        console.log(self.state);
      }, 2000);
    },

    handleTitleChange(event) {
      if(event.type == 'keyup' && event.keyCode == 13) {
        //console.log(this.state);
        this.refs.description.focus();
        return;
      }
      this.setState({
        title: event.target.value
      });
    },

    handleDescriptionChange(event) {
      if(event.type == 'keyup' && event.keyCode == 13) {
        this.refs.tags.focus();
        return;
      }
      this.setState({
        description: event.target.value
      });
    },

    addBlock() {
      if(this.state.blocks.length > 0) {
        var prevBlock = this.state.blocks[this.state.blocks.length-1];
        if(prevBlock.type === 'ul') {
          if(prevBlock.items[prevBlock.items.length - 1] === '') {
            prevBlock.items.pop();
          }
        }
      }
      var newBlock = {
        type: 'default',
        text: '',
        key: APP.uuid()
      };
      var newBlocks = this.state.blocks.concat([newBlock]);
      this.setState({
        blocks: newBlocks
      });
    },

    addListItem(pos) {
      var block = this.state.blocks[pos];
      block.items.push('');
      this.setState({
        blocks: this.state.blocks
      });
    },

    handleListChange(pos, lpos, data) {
      var block = this.state.blocks[pos];
      block.items[lpos] = data;
      this.setState({
        blocks: this.state.blocks
      });
    },

    removeBlock(index) {
      if(index >=0 && index < this.state.blocks.length) {
        if(this.state.blocks.length == 1) {
          this.setState({
            blocks: []
          });
          this.refs["tags"].focus();
          return;
        } 
        this.state.blocks.splice(index, 1);
        this.setState({
          blocks: this.state.blocks
        });
        var key = this.state.blocks[this.state.blocks.length-1].key;
        this.refs[key].focus();
      }
    },

    handleTagChange(newTag) {
      if(newTag === '') {
        if(this.state.blocks.length < 1) {
          this.addBlock();
        } else {
          var key = this.state.blocks[0].key;
          this.refs[key].focus();
        }
        return;
      }
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

    convertTo(position, type) {
      var blocks = this.state.blocks;
      var key = blocks[position].key;
      blocks[position] = {
        type: type,
        key: key,
        items: ['']
      };
      this.setState({
        blocks: blocks
      });
    },

    syncData(position, data) {
      var blocks = this.state.blocks;
      blocks[position].text = data;
      this.setState({
        blocks: blocks
      });
    },

    renderBlocks() {
      var self = this;
      var rndr = this.state.blocks.map(function(block, index) {
        if(block.type === 'default') {
          return (
            <APP.BlockDefault
              pos={index}
              ref={block.key}
              key={block.key}
              text={block.text}
              addBlock={self.addBlock}
              removeBlock={self.removeBlock}
              convertTo={self.convertTo}
              handleChange={self.syncData} />
          );
        } else if(block.type === 'ul'){
          return (
            <APP.UList
              pos={index}
              ref={block.key}
              key={block.key}
              identifier={block.key}
              items={block.items}
              addBlock={self.addBlock}
              addItem={self.addListItem}
              handleChange={self.handleListChange} />
          );
        } else if(block.type === 'ol'){
          return (
            <APP.OList
              pos={index}
              ref={block.key}
              key={block.key}
              identifier={block.key}
              items={block.items}
              addBlock={self.addBlock}
              addItem={self.addListItem}
              handleChange={self.handleListChange} />
          );
        } else {
          return '';
        }
      });
      return rndr;
    },

    render() {
      return (
        <div className='form-field'>
          <APP.Title
            ref="title"
            text={this.state.title}
            handleChange={this.handleTitleChange} />
          <APP.Description
            ref="description"
            text={this.state.description}
            handleChange={this.handleDescriptionChange} />
          <APP.Tags
            ref="tags"
            tags={this.state.tags}
            handleChange={this.handleTagChange}
            onRemove={this.removeTag} />
          {this.renderBlocks()}
        </div>
      );
    }
  });
  
  APP.Editor = Article;
  window.APP = APP;

})(this);
var editor = <APP.Editor />
React.render(editor, document.getElementById('editor-content'));
