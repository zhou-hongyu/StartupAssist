var StartupAssist = StartupAssist || {};

StartupAssist.buildHomepage = function(){
  var $content_div = $('#content'),
      $img_div = $('<div class="img-bg">'),
      $registration_div = $('<div class="jumbotron-words">'),
      $registration_memo = $('<h2>High Effiency Business Model Generation Tool<h2>'),
      $registration_p = $('<p>'),
      $registration_button = $('<a class="btn btn-primary btn-lg" role="button" href="/users/sign_up" >Sign Up Now!</a>'),
      $registration_text = $('<h3>"Systematically understand, design & differentiate your business model."</h3>'),
      $sign_up_div = $('<div class="jumbotron-words">'),
      $sign_up_memo = $("<h2>Sign Up<h2>");
  
  $content_div.text("");
  $sign_up_div.append($sign_up_memo);
  $registration_p.append($registration_button, $registration_text);
  $registration_div.append($registration_memo, $registration_p);
  $img_div.append($registration_div);
  $content_div.append($img_div);
};