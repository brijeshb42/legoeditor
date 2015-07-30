(function(window) {
  var APP = window.APP || {};

  var OListItem = React.createClass({

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
        //console.log(event);
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

  var OList = React.createClass({

    focus() {
      var key = this.props.identifier+(this.props.items.length-1);
      this.refs[key].focus();
    },

    render() {
      //console.log(this.props.items);
      var self = this;
      return (
        <ol className="block-list">
          {this.props.items.map(function(item, index) {
            var key = self.props.identifier+index;
            return (
              <OListItem
                index={index}
                pos={self.props.pos}
                key={key}
                text={item}
                handleChange={self.props.handleChange}
                addItem={self.props.addItem}
                addBlock={self.props.addBlock} />
            );
          })}
        </ol>
      );
    }

  });

  APP.OListItem = OListItem;
  APP.OList = OList;
  window.APP = APP;

})(this);
