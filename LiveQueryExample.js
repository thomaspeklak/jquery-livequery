$(function(){
	$('li').liveQuery().connectTo('#filter');
  $('#filter').focus();

  $('button').click(function(){
    $('body').trigger('liveQuery', 'lorem');
    $('#filter').val('lorem');
  });
});
