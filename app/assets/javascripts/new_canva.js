var StartupAssist = StartupAssist || {};
var nInterval = null;

StartupAssist.getCanva = function(canva_id){
  var $content_div = $('#canvas'),
      $new_canva_div = $('<div id="new-canva">'),
      $save_canva_div = $('<div id="save-canva">'),
      $save_canva_button = $('<button id="save-canva-button" class="btn btn-primary btn-lg">Save Canva</button>'),
      $create_tag_button = $('<button id="create-tag" class="btn btn-primary btn-lg">New Tag</button>'),
      $add_contributor_button = $('<button id="add-contributor" class="btn btn-primary btn-lg">Add Co-Founder</button>'),
      $canva_svg = $('<svg id="canva-svg" width="1200" height="500" xmlns="http://www.w3.org/2000/svg">');
  $content_div.text("");
  $new_canva_div.append($canva_svg);
  $save_canva_div.append($add_contributor_button, $create_tag_button, $save_canva_button);
  $content_div.append($new_canva_div, $save_canva_div);

  StartupAssist.drawCanva();

  $add_contributor_button.click(function(){
    StartupAssist.assignContributor(canva_id);
  });

  $save_canva_button.click(function(){
    StartupAssist.updateTagInit(canva_id);
    StartupAssist.updateCanva();
    clearInterval(nInterval);
  });

  $create_tag_button.click(function(){
    StartupAssist.tagHandler(canva_id);
  });

  StartupAssist.getTags(canva_id);
  nInterval = setInterval(StartupAssist.getTags, 3000, canva_id);
  StartupAssist.drawPanel();
};

StartupAssist.assignContributor = function(canva_id){
  var contributor = prompt("Please input the contributor's name:");
  $.ajax({
    url: 'canvas/' + canva_id + '',
    type: 'PUT',
    dataType: 'json',
    data: { canva_id: canva_id, contributor: contributor },
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

StartupAssist.drawCanva = function(){
  var $canva = d3.select('#canva-svg'),
      column_width = 180,
      canva_height = 500,
      font_height = 13,
      y2 = 380,
      x_offset = 5,
      y_offset = 15,
      frame_offset = 5;
  // Append the frame rect
  $canva.append('g')
       .attr('class', 'frame')
       .append('rect')
       .attr('class', 'frame-rect')
       .attr('x', 0)
       .attr('y', 0)
       .attr('width', 900)
       .attr('height', 490)
       .attr('rx', 10)
       .attr('ry', 10)
       .attr('transform', 'translate(' + frame_offset + ', ' + frame_offset + ')');
  // Append the frame lines
  $canva.append('g')
       .attr('class', 'line')
       .append('line')
       .attr('x1', 0)
       .attr('y1', y2 - frame_offset * 2)
       .attr('x2', column_width * 5)
       .attr('y2', y2 - frame_offset * 2)
       .attr('transform', 'translate(' + frame_offset + ', ' + frame_offset + ' )');

  $canva.append('g')
       .attr('class', 'line')
       .append('line')
       .attr('x1', column_width * 2.5)
       .attr('y1', y2 - frame_offset * 2)
       .attr('x2', column_width * 2.5)
       .attr('y2', canva_height - frame_offset * 2)
       .attr('transform', 'translate(' + frame_offset + ', ' + frame_offset + ' )');

  $canva.append('g')
       .attr('class', 'line')
       .append('line')
       .attr('x1', column_width)
       .attr('y1', 0)
       .attr('x2', column_width)
       .attr('y2', y2 - frame_offset * 2)
       .attr('transform', 'translate(' + frame_offset + ', ' + frame_offset + ' )');

  $canva.append('g')
       .attr('class', 'line')
       .append('line')
       .attr('x1', column_width * 2)
       .attr('y1', 0)
       .attr('x2', column_width * 2)
       .attr('y2', y2 - frame_offset * 2)
       .attr('transform', 'translate(' + frame_offset + ', ' + frame_offset + ' )');

  $canva.append('g')
       .attr('class', 'line')
       .append('line')
       .attr('x1', column_width * 3)
       .attr('y1', 0)
       .attr('x2', column_width * 3)
       .attr('y2', y2 - frame_offset * 2)
       .attr('transform', 'translate(' + frame_offset + ', ' + frame_offset + ' )');

  $canva.append('g')
       .attr('class', 'line')
       .append('line')
       .attr('x1', column_width * 4)
       .attr('y1', 0)
       .attr('x2', column_width * 4)
       .attr('y2', y2 - frame_offset * 2)
       .attr('transform', 'translate(' + frame_offset + ', ' + frame_offset + ' )');

  $canva.append('g')
       .attr('class', 'line')
       .append('line')
       .attr('x1', column_width)
       .attr('y1', y2 / 2 - frame_offset)
       .attr('x2', column_width * 2)
       .attr('y2', y2 / 2 - frame_offset)
       .attr('transform', 'translate(' + frame_offset + ', ' + frame_offset + ' )');


  $canva.append('g')
       .attr('class', 'line')
       .append('line')
       .attr('x1', column_width * 3)
       .attr('y1', y2 / 2 - frame_offset)
       .attr('x2', column_width * 4)
       .attr('y2', y2 / 2 - frame_offset)
       .attr('transform', 'translate(' + frame_offset + ', ' + frame_offset + ' )');


  // Append the Categories
  $canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Key Partners')
       .attr('transform', 'translate(' + (x_offset + frame_offset) + ', ' + (y_offset + frame_offset) +')');

  $canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Key Activities')
       .attr('transform', 'translate(' + (x_offset + frame_offset + column_width) + ', ' + (y_offset + frame_offset) + ')');

  $canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Key Resources')
       .attr('transform', 'translate(' + (x_offset + frame_offset + column_width) + ', ' + (y_offset + y2 / 2) + ')');

  $canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Value')
       .attr('transform', 'translate(' + (x_offset + frame_offset + column_width * 2) + ', ' + (y_offset + frame_offset) + ')')

  $canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Propositions')
       .attr('transform', 'translate(' + (x_offset + frame_offset + column_width * 2) + ', ' + (y_offset + frame_offset + font_height) + ')');

  $canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Customer')
       .attr('transform', 'translate(' + (x_offset + frame_offset + column_width * 3) + ', ' + (y_offset + frame_offset) + ')');

  $canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Relationships')
       .attr('transform', 'translate(' + (x_offset + frame_offset + column_width * 3) + ', ' + (y_offset + frame_offset + font_height) + ')');

  $canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Channels')
       .attr('transform', 'translate(' + (x_offset + frame_offset + column_width * 3) + ', ' + (y_offset + y2 / 2) +')');

  $canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Customer')
       .attr('transform', 'translate(' + (x_offset + frame_offset +column_width * 4) + ', ' + (y_offset + frame_offset) + ')');

  $canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Segments')
       .attr('transform', 'translate(' + (x_offset + frame_offset + column_width * 4) + ', ' + (y_offset + frame_offset + font_height) + ')');

  $canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Cost Structure')
       .attr('transform', 'translate(' + (x_offset + frame_offset) + ', ' + (y_offset - frame_offset + y2) + ')');

  $canva.append('g')
       .attr('class', 'category')
       .append('text')
       .text('Revenue Streams')
       .attr('transform', 'translate(' + (x_offset + frame_offset + column_width * 2.5) + ', ' + (y_offset - frame_offset + y2) + ')');

  $canva.append('g')
       .attr('class', 'icon')
       .append("svg:image")
       // .attr("xlink:href", "http://www.clker.com/  cliparts/1/4/5/a/1331068897296558865Sitting%20Racoon.svg")
       .attr("width", 20)
       .attr("height", 20)
       .attr("x", 228)
       .attr("y",53);

  // svg input element

  $canva.append('g')
       .attr('class', 'input')
       .append("textArea")
       .attr({
         x: 200,
         y: 500,
         width: 150,
         height: 20,
         editable: 'simple',
         focusable: 'true',
       })
       .style('font-size', '18');
};




