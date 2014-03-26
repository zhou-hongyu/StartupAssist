var StartupAssist = StartupAssist || {};

StartupAssist.saveCanva = function(){
  $.ajax({
    url: '/canvas',
    type: 'POST',
    dataType: 'json',
  })
  .done(function(response) {
    StartupAssist.saveTagInit(response[0].id);
    StartupAssist.showAllCanvas(response);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
};