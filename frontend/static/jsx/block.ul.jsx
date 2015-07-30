(function(window) {
  var APP = window.APP || {};

  var UListItem = React.createClass({

    componentDidMount() {
      this.focus();
    },

    focus() {
      React.findDOMNode(this.refs.text).focus();
    },

    handleChange(event) {
      //console.log(event);
      this.props.handleChange(this.props.pos, this.props.index, event.target.innerHTML);
    },

    escapeKeyPress(event) {
      if(event.keyCode == APP.Keys.ENTER) {
        event.preventDefault();
      } /*else if(event.keyCode == APP.Keys.BACKSPACE) {
        if(event.target.innerHTML.length == 0) {
          this.props.removeBlock(this.props.pos);
        }
      }*/
    },

    // checkKey(event) {
    //   if(event.keyCode == APP.Keys.ENTER && event.target.innerHTML != '') {
    //     this.props.addBlock();
    //   } else if(event.target.innerHTML.length > 0) {
    //     //console.log('text and bar');
    //     if(this.state.showBlockBar) {
    //       this.setState({
    //         showBlockBar: false
    //       });
    //     }
    //   } else if(event.target.innerHTML == '' && this.state.showBlockBar == false) {
    //     //console.log(event);
    //     this.setState({
    //       showBlockBar: true
    //     });
    //   }
    // },

    checkKey(event) {
      if(event.keyCode == APP.Keys.ENTER && event.target.innerHTML !== '') {
        this.props.addItem(this.props.pos);
      } else if(event.keyCode == APP.Keys.BACKSPACE && event.target.innerHTML === '') {
        event.preventDefault();
        console.log(event);
        //console.log(this.props.pos);
        this.props.addBlock(this.props.index);
      }
    },

    render() {
      //console.log(this.props.text);
      return (
        <li
          ref="text"
          className="block-div block-list-item"
          contentEditable="true"
          onKeyDown={this.escapeKeyPress}
          onKeyUp={this.checkKey}
          onInput={this.handleChange}
          dangerouslySetInnerHTML={{__html: this.props.text}} />
      );
    }
  });

  var UList = React.createClass({

    focus() {
      var key = this.props.identifier+(this.props.items.length-1);
      this.refs[key].focus();
    },

    addBlock(pos) {
      //console.log(this.props.items[pos]);
      if(pos === this.props.items.length-1) {
        this.props.addBlock();
      } else if(this.props.items[pos] === '') {
        console.log(pos);
        this.props.items.splice(pos, 1);
      }
    },

    render() {
      var self = this;
      return (
        <ul className="block-list">
          {this.props.items.map(function(item, index) {
            var key = self.props.identifier+index;
            return (
              <UListItem
                ref={key}
                index={index}
                pos={self.props.pos}
                key={key}
                text={item}
                handleChange={self.props.handleChange}
                addItem={self.props.addItem}
                addBlock={self.addBlock} />
            );
          })}
        </ul>
      );
    }

  });

  APP.UListItem = UListItem;
  APP.UList = UList;
  window.APP = APP;

})(this);
