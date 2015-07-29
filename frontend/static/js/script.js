(function(window) {
  var APP = window.APP || {};

  APP.ArticleStructure = {
      type: 'article',
      title: '',
      description: '',
      tags: [''],
      author: '',
      image: {
          thumbnail: '',
          carousel: '',
          article: '',
          facebook: ''
      },
      blocks: {
          normal: '',
          image: {
              url: '',
              caption: '',
              credits: ''
          },
          list: [''],
          embed: '',
          quote: '',
          video: ''
      }
  };

  APP.uuid = function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + '-' + s4();
    // return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    //   s4() + '-' + s4() + s4() + s4();
  };

  APP.Keys = {
    ENTER: 13,
    ESC: 27,
    BACKSPACE: 8
  };

  window.APP = APP;

})(this);
