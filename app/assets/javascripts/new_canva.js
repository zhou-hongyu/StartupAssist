var StartupAssist = StartupAssist || {};

StartupAssist.newCanva = function(){
  var $content_div = $('#canvas'),
      $new_canva_div = $('<div id="new-canva">'),
      $tag_tool = $('<div id="tag-tool">'),
      $color_panel_div = $('<div id="color-panel">'),
      $new_tags_div = $('<div id="new-tags">'),
      $save_canva_div = $('<div id="save-canva">'),
      $save_canva_button = $('<button class="btn btn-primary btn-lg">Save Canva</button>'),
      $canva_svg = $('<svg id="canva-svg" width="900" height="500">'),
      $color_panel_svg = $('<svg id="color-panel-svg" width="220" height="300">');

  $content_div.text("");
  $color_panel_div.append($color_panel_svg);
  $tag_tool.append($color_panel_div, $new_tags_div);
  $new_canva_div.append($canva_svg,$tag_tool);
  $save_canva_div.append($save_canva_button);
  $content_div.append($new_canva_div, $save_canva_div);

  StartupAssist.drawCanva();
  StartupAssist.drawPanel();
  StartupAssist.drawTags();
};

StartupAssist.drawCanva = function(){
  var canva = d3.select('#canva-svg'),
      column_width = 180,
      canva_height = 500,
      font_height = 13,
      y2 = 380,
      x_offset = 5,
      y_offset = 15;

  canva.append('g')
       .attr('class', 'line')
       .append('line')
       .attr('x1', 0)
       .attr('y1', y2)
       .attr('x2', column_width * 5)
       .attr('y2', y2);

  canva.append('g')
       .attr('class', 'line')
       .append('line')
       .attr('x1', column_width * 2.5)
       .attr('y1', y2)
       .attr('x2', column_width * 2.5)
       .attr('y2', canva_height);

  canva.append('g')
       .attr('class', 'line')
       .append('line')
       .attr('x1', column_width)
       .attr('y1', 0)
       .attr('x2', column_width)
       .attr('y2', y2);

  canva.append('g')
       .attr('class', 'line')
       .append('line')
       .attr('x1', column_width * 2)
       .attr('y1', 0)
       .attr('x2', column_width * 2)
       .attr('y2', y2);

  canva.append('g')
       .attr('class', 'line')
       .append('line')
       .attr('x1', column_width * 3)
       .attr('y1', 0)
       .attr('x2', column_width * 3)
       .attr('y2', y2);

  canva.append('g')
       .attr('class', 'line')
       .append('line')
       .attr('x1', column_width * 4)
       .attr('y1', 0)
       .attr('x2', column_width * 4)
       .attr('y2', y2);

  canva.append('g')
       .attr('class', 'line')
       .append('line')
       .attr('x1', column_width)
       .attr('y1', y2 / 2)
       .attr('x2', column_width * 2)
       .attr('y2', y2 / 2);

  canva.append('g')
       .attr('class', 'line')
       .append('line')
       .attr('x1', column_width * 3)
       .attr('y1', y2 / 2)
       .attr('x2', column_width * 4)
       .attr('y2', y2 / 2);

  canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Key Partners')
       .attr('transform', 'translate(5, 15)');

  canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Key Activities')
       .attr('transform', 'translate(' + (x_offset + column_width) + ', ' + y_offset + ')');

  canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Key Resources')
       .attr('transform', 'translate(' + (x_offset + column_width) + ', ' + (y_offset + y2 / 2) + ')');

  canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Value')
       .attr('transform', 'translate(' + (x_offset + column_width * 2) + ', ' + y_offset + ')');

  canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Propositions')
       .attr('transform', 'translate(' + (x_offset + column_width * 2) + ', ' + (y_offset + font_height) + ')');

  canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Customer')
       .attr('transform', 'translate(' + (x_offset + column_width * 3) + ', ' + y_offset + ')');

  canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Relationships')
       .attr('transform', 'translate(' + (x_offset + column_width * 3) + ', ' + (y_offset + font_height) + ')');

  canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Channels')
       .attr('transform', 'translate(' + (x_offset + column_width * 3) + ', ' + (y_offset + y2 / 2) +')');

  canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Customer')
       .attr('transform', 'translate(' + (x_offset + column_width * 4) + ', ' + y_offset + ')');

  canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Segments')
       .attr('transform', 'translate(' + (x_offset + column_width * 4) + ', ' + (y_offset + font_height) + ')');

  canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Cost Structure')
       .attr('transform', 'translate(' + x_offset + ', ' + (y_offset + y2) + ')');

  canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Revenue Streams')
       .attr('transform', 'translate(' + (x_offset + column_width * 2.5) + ', ' + (y_offset + y2) + ')');

  canva.append('g')
       .attr('class', 'icon')
       .append("svg:image")
       .attr("xlink:href", "http://www.clker.com/cliparts/1/4/5/a/1331068897296558865Sitting%20Racoon.svg")
       .attr("width", 20)
       .attr("height", 20)
       .attr("x", 228)
       .attr("y",53);
};




