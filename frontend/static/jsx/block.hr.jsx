(function(window) {
  var APP = window.APP || {};

  var HorizontalRule = React.createClass({

    render() {
      return (
        <hr className="block-hr" />
      );
    }
  });

  APP.HorizontalRule = HorizontalRule;
  window.APP = APP;

})(this);
