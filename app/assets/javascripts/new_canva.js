var StartupAssist = StartupAssist || {};

StartupAssist.newCanva = function(){
  var $content_div = $('#canvas'),
      $new_canva_div = $('<div id="new-canva">'),
      $tag_tool = $('<div id="tag-tool">'),
      $color_panel_div = $('<div id="color-panel">'),
      $new_tags_div = $('<div id="new-tags">'),
      $save_canva_div = $('<div id="save-canva">'),
      $save_canva_button = $('<button class="btn btn-primary btn-lg">Save Canva</button>'),
      $canva_svg = $('<svg id="canva-svg" width="1000" height="500">');
  $content_div.text("");
  $tag_tool.append($color_panel_div, $new_tags_div);
  $new_canva_div.append($canva_svg,$tag_tool);
  $save_canva_div.append($save_canva_button);
  $content_div.append($new_canva_div, $save_canva_div);
};