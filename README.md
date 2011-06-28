#jQuery LiveQuery

liveQuery is a convenient way to filter a list of items in a performant way

##Usage

    $('list').liveQuery();
  
liveQuery returns a jQuery object with a connectTo method that enables you to connect the list to a filter. Filtered out elements get the class 'hidden' that needs to be styled in an appropriate way

Example:

    $('list').liveQuery().connectTo('filter');


##Dependencies
jQuery 1.6.0 or higher

if you use jQuery < 1.6.0, you only have to change the only call of .prop() to .attr()
