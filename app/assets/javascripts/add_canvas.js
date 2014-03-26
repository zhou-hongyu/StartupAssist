var StartupAssist = StartupAssist || {};

StartupAssist.saveCanvaInit = function(){
  $.ajax({
    url: '/canvas',
    type: 'POST',
    dataType: 'json',
  })
  .done(function(response) {
    console.log(response);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
  
};