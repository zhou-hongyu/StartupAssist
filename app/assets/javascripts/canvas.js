$(document).ready(function(){
  $.ajax({
    async: false,
    url: '/canvas',
    type: 'GET',
    dataType: 'json',
  })
  .done(function(response) {
    StartupAssist.showAllCanvas(response);

  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
});

var StartupAssist = StartupAssist || {};

StartupAssist.showAllCanvas = function(callback){

  var $content_div = $("#canvas"),
      $all_canvas_div = $('<div class="all-canvas">'),
      $all_canvas_ul = $('<ul class="list-inline">'),
      $create_canva_div = $('<div class="new-canvas">'),
      $new_canva_button = $('<button id="assign-name" class="btn btn-primary btn-lg">Create New Canva</button>')[0];

  $content_div.text("");

  $new_canva_button.addEventListener('click', StartupAssist.assignName);
  $new_canva_button.addEventListener('click', StartupAssist.clearFlash);

  for(i = 0; i < callback.length; i++){
    var $li = $('<li>');
    canva_button_id = 'id="canva-' + callback[i].id + '"';
    $canva_show_button = $('<button class ="btn btn-primary btn-lg show-canva"' + canva_button_id + '>' + callback[i].business_name + '</button>');
    $li.append($canva_show_button);
    $all_canvas_ul.append($li);
    $all_canvas_div.append($all_canvas_ul);
  }
  $create_canva_div.append($new_canva_button);
  $content_div.append($all_canvas_div, $create_canva_div);

  var $show_the_canva_button = $('.show-canva');
  $show_the_canva_button.click(function(event){
    StartupAssist.clearFlash();
    current_canva_id = parseInt(event.target.id.split('-')[1]);
    StartupAssist.getCanva(parseInt(event.target.id.split('-')[1]));
  });
};

StartupAssist.assignName = function(){

  var start_up = prompt("Please enter your Start up name");

  if (start_up !== null){
    document.getElementById("assign-name").innerHTML = start_up;
  }
  document.getElementById("assign-name").removeEventListener('click', StartupAssist.assignName);
  document.getElementById("assign-name").addEventListener('click', StartupAssist.saveCanva(start_up));

};

StartupAssist.clearFlash = function(){
  var $flash_div = $(".flash");

  $flash_div.text("");
};
