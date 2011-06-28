(function($){
  // **liveQuery** is a convenient way to filter a list of items in a performant way
  //
  // USAGE:
  //
  //     $('list').liveQuery();
  //
  // liveQuery returns a jQuery object with a connectTo method that
  // enables you to connect the list to a filter. Filtered out elements
  // get the class 'hidden' that needs to be styled in an appropriate way
  //
  // Example:
  //
  //     $('list').liveQuery().connectTo('filter');
  //
  //

  // Application globals to manage state of the shown and hidden entries
  var liveQuery = {
    text: '',
    shownRows: {},
    hiddenRows: {},
    shownContent: {},
    hiddenContent: {},

    // react on user input
    //
    // if no search is active the term is sent to the filter function to show/hide rows
    handleInput: function (){
      if(typeof(liveQuery.active)=='number') { clearTimeout(liveQuery.active); }
      var $this = $(this);
      liveQuery.active = setTimeout( function(){
        liveQuery.filter( $.trim($this.val().toLowerCase()));
      }, 250);
    },

    // filter the list with the given term
    filter: function (term){
      liveQuery.text = term;

      if (term.length <= 1){
        moveToShown(term, true);
        return;
      }

      if(term.search(liveQuery.text)!=-1){
        moveToHidden(term);
      }
      else{
        moveToShown(term);
        moveToHidden(term);
      }
    },

    // provides a way to connect the list to an input field
    // or any other object the triggers a change event
    connectTo: function(object){
      $object = $(object);
      if($object.prop('tagName') === 'INPUT'){
        $object.keyup(liveQuery.handleInput).parents('form').submit(function(){return false;});
      } else {
        $object.bind('change', liveQuery.handleInput);
      }
    }
  };

  // the plugin function initializes the inner arrays for displaying rows
  // and for searching the text
  $.fn.liveQuery = function(options){
    if(this.length){
      liveQuery.shownRows = this;
      liveQuery.shownContent = liveQuery.shownRows.map(function(){return $(this).text().toLowerCase();});
      // adds to connectTo function to the returned jQuery object
      this.connectTo = liveQuery.connectTo;

      // bind liveQuery event to the body that can be used to filter the result set
      //
      // Usage:
      //
      //     $('body').trigger('liveQuery','lorem');
      $('body').bind('liveQuery', function(event, term) { liveQuery.filter(term || '');});
    }

    // return the enhanced jQuery object for chainability
    return this;
  };

  // moves entries that do not match the term to the hidden list
  function moveToHidden(term){
    $.each(liveQuery.shownContent,function(i){
      if(liveQuery.shownContent[i] && liveQuery.shownContent[i].search(term) == -1){
        liveQuery.hiddenRows[i]=liveQuery.shownRows[i];
        liveQuery.hiddenContent[i]=liveQuery.shownContent[i];
        $(liveQuery.shownRows[i]).addClass('hidden');
        delete liveQuery.shownRows[i];
        delete liveQuery.shownContent[i];
      }
    });
  }

  // moves entries that match the term to the shown list
  // if the force parameter is set all the list is reset
  function moveToShown(term, force){
    $.each(liveQuery.hiddenContent,function(i){
      if(force || (liveQuery.hiddenContent[i] && liveQuery.hiddenContent[i].search(term) != -1)){
        liveQuery.shownRows[i]=liveQuery.hiddenRows[i];
        liveQuery.shownContent[i]=liveQuery.hiddenContent[i];
        $(liveQuery.hiddenRows[i]).removeClass('hidden');
        delete liveQuery.hiddenRows[i];
        delete liveQuery.hiddenContent[i];
      }
    });
  }
})(jQuery);
