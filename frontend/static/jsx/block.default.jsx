(function(window) {
  var APP = window.APP || {};

  var BlockDefault = React.createClass({

    getInitialState() {
      return {
        showBlockBar: true
      };
    },

    componentDidMount() {
      this.focus();
    },

    focus() {
      React.findDOMNode(this.refs.text).focus();
    },

    showBlockBar() {
      this.setState({
        showBlockBar: true
      });
    },

    blur() {
    },

    handleChange(event) {
      //console.log(event);
      if(event.target.innerHTML == '* ' || event.target.innerHTML == '*&nbsp;') {
        this.props.convertTo(this.props.pos, 'ul');
        return;
      } else if(event.target.innerHTML == '1.') {
        this.props.convertTo(this.props.pos, 'ol');
        return;
      }
      this.props.handleChange(this.props.pos, event.target.innerHTML);
    },

    escapeKeyPress(event) {
      if(event.keyCode == APP.Keys.ENTER) {
        event.preventDefault();
      } else if(event.keyCode == APP.Keys.BACKSPACE) {
        if(event.target.innerHTML.length < 1) {
          event.preventDefault();
          this.props.removeBlock(this.props.pos);
        }
      }
    },

    checkKey(event) {
      if(event.keyCode == APP.Keys.ENTER && event.target.innerHTML != '') {
        this.props.addBlock();
      } else if(event.target.innerHTML.length > 0) {
        //console.log('text and bar');
        if(this.state.showBlockBar) {
          this.setState({
            showBlockBar: false
          });
        }
      } else if(event.target.innerHTML == '' && this.state.showBlockBar == false) {
        //console.log(event);
        this.setState({
          showBlockBar: true
        });
      }
    },

    clearExtraTags() {
      //console.log(this.props.text);
    },

    handlePaste(event) {
      var self = this;
      setTimeout(function() {
        console.log(event.target);
        self.clearExtraTags(event.target.innerHTML);
      }, 20);
    },

    render() {
      var toolbar;
      if(this.state.showBlockBar) {
        toolbar = <APP.Toolbar showBlockBar={this.showBlockBar} />;
      }
      return (
        <div
          className="block-default">
          {toolbar}
          <div
            className="block-div"
            ref="text"
            contentEditable="true"
            dangerouslySetInnerHTML={{__html: this.props.text}}
            onKeyDown={this.escapeKeyPress}
            onKeyUp={this.checkKey}
            onInput={this.handleChange} />
        </div>
      );
    }
  });

  APP.BlockDefault = BlockDefault;
  window.APP = APP;

})(this);
