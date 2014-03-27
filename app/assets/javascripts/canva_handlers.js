var StartupAssist = StartupAssist || {};

StartupAssist.saveCanva = function(){
  $.ajax({
    async: false,
    url: '/canvas',
    type: 'POST',
    dataType: 'json',
  })
  .done(function(response) {
    StartupAssist.getCanva(response.id);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
};

StartupAssist.updateCanva = function(){
  $.ajax({
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
};