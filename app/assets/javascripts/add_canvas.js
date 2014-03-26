var StartupAssist = StartupAssist || {};

StartupAssist.saveCanva = function(){
  $.ajax({
    url: '/canvas',
    type: 'POST',
    dataType: 'json',
  })
  .done(function(response) {
    console.log(response);
    StartupAssist.showAllCanvas(response);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
};