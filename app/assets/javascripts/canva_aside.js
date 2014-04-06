var StartupAssist = StartupAssist || {};

var current_tag_id,
    current_canva_id;

StartupAssist.drawPanel = function(){
  var color_panel = d3.select('#canva-svg'),
      width = 220,
      height = 300,
      outerRadius = Math.min(width, height) * 0.45;

  var matrix = [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1]
  ];
  var chord = d3.layout.chord()
      .sortSubgroups(d3.descending)
      .matrix(matrix);

  var fill = d3.scale.ordinal()
      .domain(d3.range(6))
      .range(["#ecf0f1", "#2ecc71", "#9b59b6", "#e74c3c", "#3498db", "#f1c40f"]);

  color_panel.append("g")
      .attr('class', 'color-panel')
      .selectAll("path")
      .data(chord.groups)
      .enter()
        .append("path")
        .style("fill", function(d) { return fill(d.index); })
        .style("stroke", function(d) { return fill(d.index); })
        .attr("d", d3.svg.arc().outerRadius(outerRadius))
        .attr("transform", "translate(" + (960 + width / 2) + ", " + height / 2 + ")")
        .on("click", function(d) {
          return StartupAssist.changeColor(d.index);
        });

};

StartupAssist.changeTagIndex = function(tag_id){
  current_tag_id = tag_id;
};

StartupAssist.changeColor = function(d){
  var tag_svg = d3.select('#canva-svg'),
      color_array = ["#ecf0f1", "#2ecc71", "#9b59b6", "#e74c3c", "#3498db", "#f1c40f"];

  tag_svg.select('#new-tag-' + current_tag_id + ' rect')
         // .transition()
         .style("fill", color_array[d])
         .each('end', StartupAssist.updateTagInit(current_tag_id));
};


StartupAssist.tagHandler = function(canva_id){
  $.ajax({
    url: '/canvas/' + canva_id + '/tags',
    type: 'POST',
    dataType: 'json',
    data: {canva_id: canva_id},
  })
  .done(function(response) {
    StartupAssist.drawTags(response, response.canva_id);
    tag_index = response.id;
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
};

StartupAssist.drawTags = function(callback, canva_id){
  var tag_width = 75,
      tag_height = 60;
  tag_svg = d3.select('#canva-svg');

  current_tag_id = callback.id;

  // Append the rectangular
  tag_svg.append("g")
         .attr('id', 'new-tag-' + callback.id + '')
         .attr('class', 'tag')
         .append('rect')
           .attr('class', 'tag-rect')
           .attr('x', 20)
           .attr('y', 11)
           .attr('height', tag_height)
           .attr('width', tag_width)
           .attr('onmousedown', 'StartupAssist.OnMouseDown(event)')
           .attr('onmouseup', 'StartupAssist.OnMouseUp(event)')
           .attr('transform', 'translate(1011, 357)')
           .style('fill', 'f1c40f')
           .style('left', '200px');
  // Append the text field to the tag.

  var tag_content = d3.select('#new-tag-' + callback.id + '');



  tag_content.append('text')
             .attr('class', 'tag-content')
             .attr('x', 20)
             .attr('y', 10)
             .attr('width', 20)
             .attr('transform', 'translate(1050, 395)')
             .style('font-size', 12)
             .style('font-family', '"Comic Sans MS", cursive, sans-serif')
             .style('fill', 'black')
             .style('stroke', 'none')
             .style('text-anchor', 'middle')
             .text('Contents')
             .attr('onmousedown', 'StartupAssist.editText(event)');

  tag_content.append('circle')
             .attr('class', 'tag-delete')
             .attr('r', 5)
             .attr('cx', 20)
             .attr('cy', 11)
             .attr('transform', 'translate(1086, 357)')
             .style('fill', 'black')
             .style('stroke', '1px')
             .style('opacity', 0.3)
             .style('stroke-color', 'black')
             .attr('onmousedown', 'StartupAssist.deleteTag(event)');


  StartupAssist.updateTagInit(canva_id);
};

StartupAssist.getTags = function(canva_id){
  $.ajax({
    url: '/canvas/' + canva_id ,
    type: 'GET',
    dataType: 'json',
    data: { canva_id: canva_id },
  })
  .done(function(response) {
    console.log(response);
    StartupAssist.redrawTags(response);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function(response) {
  });
};

StartupAssist.redrawTags = function(tags) {
  var tag_width = 75,
      tag_height = 60;
  tag_svg = d3.select('#canva-svg');
  for(i = 0; i < tags.length; i++) {
    tag_svg.append("g")
           .attr('id', tags[i].properties.tag_id)
           .attr('class', 'tag')
           .append('rect')
             .attr('class', 'tag-rect')
             .attr('x', 20)
             .attr('y', 11)
             .attr('height', tag_height)
             .attr('width', tag_width)
             .attr('onmousedown', 'StartupAssist.OnMouseDown(event)')
             .attr('onmouseup', 'StartupAssist.OnMouseUp(event)')
             .attr('transform', tags[i].properties.rect_transform)
             .style('fill', tags[i].properties.rect_style.slice(7, -1));
             // .on('click', function(event){
             //   StartupAssist.selectElement(event);
             // });

    var tag_content = d3.select('#' + tags[i].properties.tag_id);

    tag_content.append('text')
           .attr('class', 'tag-content')
           .attr('x', tags[i].properties.txt_x)
           .attr('y', tags[i].properties.txt_y)
           .attr('width', 20)
           .attr('transform', tags[i].properties.txt_transform)
           .style('font-size', 12)
           .style('font-family', '"Comic Sans MS", cursive, sans-serif')
           .style('fill', 'black')
           .style('stroke', 'none')
           .style('text-anchor', 'middle')
           .text(tags[i].properties.txt_inner)
           .attr('onmousedown', 'StartupAssist.editText(event)');

    tag_content.append('circle')
               .attr('class', 'tag-delete')
               .attr('r', 5)
               .attr('cx', tags[i].properties.circle_cx)
               .attr('cy', tags[i].properties.circle_cy)
               .attr('transform', tags[i].properties.circle_transform)
               .style('fill', 'black')
               .style('stroke', '1px')
               .style('opacity', 0.3)
               .style('stroke-color', 'black')
               .attr('onmousedown', 'StartupAssist.deleteTag(event)');
  }
};

StartupAssist.deleteTag = function(event){
  var $delete_target = $('#' + event.target.parentElement.id),
      tag_id = parseInt(event.target.parentElement.id.split('-')[2]);

  $delete_target.fadeOut("slow");

  $.ajax({
    url: '/canvas/' + current_canva_id + '/tags/' + tag_id,
    type: 'DELETE',
    dataType: 'json',
    data: { tag_id: tag_id },
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

};

StartupAssist.editText = function(event){
  var textElement = event.target,
      editedText = prompt("Edit texual contents:", textElement.firstChild.data);

  if( editedText !== null){
    textElement.firstChild.data = editedText;
  }
};

// var selectElement = 0,
//     selectContent = 0,
//     currentX = 0,
//     currentY = 0,
//     currentTranslate = 0,
//     currentContentTranslate = 0,
//     i = 0;

// StartupAssist.selectElement = function(event){
//   selectContent = event.target.parentElement.getElementsByClassName('tag-content')[0];
//   selectElement = event.target;
//   selectCircle = event.target.parentElement.getElementsByClassName('tag-delete')[0];
//   currentX = event.clientX;
//   currentY = event.clientY;
//   currentTranslate = selectElement.getAttributeNS(null, "transform").slice(10, -1).split(', ');
//   currentContentTranslate = selectContent.getAttributeNS(null, "transform").slice(10, -1).split(', ');
//   currentCircleTranslate = selectCircle.getAttributeNS(null, "transform").slice(10, -1).split(', ');

//   for(i = 0; i < currentTranslate.length; i++ ){
//     currentTranslate[i] = parseFloat(currentTranslate[i]);
//     currentContentTranslate[i] = parseFloat(currentContentTranslate[i]);
//     currentCircleTranslate[i] = parseFloat(currentCircleTranslate[i]);
//   }

//   selectElement.addEventListener('mouseup', StartupAssist.changeTagIndex(parseInt(event.target.parentElement.id.split('-')[2])));

//   selectElement.addEventListener('mousemove', StartupAssist.InitDragDrop);
//   // selectElement.addEventListener('mouseup', StartupAssist.mouseUpHandler);
//   // selectElement.addEventListener('mouseout', StartupAssist.mouseOutHandler);
//   selectElement.removeEventListener('mousedown', StartupAssist.selectElement);
//   event.preventDefault();
//   return false;
// };


var _startX = 0,
    _startY = 0,
    _offsetX = 0,
    _offsetY = 0,
    _dragElement,
    _oldZIndex = 0,
    _debug = $('debug');

StartupAssist.OnMouseDown = function(e) {

  var target = e.target !== null ? e.target : e.srcElement;
      // _debug.innerHTML = target.className == 'drag' ? 'draggable element clicked' : 'NON-draggable element clicked';
  // for Chrom & Firefox, left click == 0, for IE left click == 1
  if ((e.button === 0 && window.event !== null || e.button === 0) && target.getAttributeNS(null, 'class') === 'tag-rect') {
  // grab the mouse position
    _startX = e.clientX;
    _startY = e.clientY;
    // grab the clicked element's position
    _offsetX = parseInt(target.getAttributeNS(null, 'x'));
    _offsetY = parseInt(target.getAttributeNS(null, 'y'));
    // bring the clicked element to the front while it is being dragged
    _oldZIndex = target.style.zIndex;
    target.style.zIndex = 10000;
    // we need to access the element in OnMouseMove
    _dragElement = target;
    // tell our code to start moving the element with the mouse
    target.onmousemove = StartupAssist.OnMouseMove(event);
    // cancel out any text selections
    target.body.focus();
    // prevent text selection in IE
    target.onselectstart = function () { return false; };
    // prevent IE from trying to drag an image
    target.ondragstart = function() { return false; };
    // prevent text selection (except IE)
    return false;
  }

  StartupAssist.updateTagInit(current_canva_id);
};


StartupAssist.OnMouseMove = function(e) {
  if (e === null) {
    e = window.event;
  }

  // this is the actual "drag code"
  _startX = (_offsetX + e.clientX - _startX);
  _startY = (_offsetY + e.clientY - _startY);
  _debug.innerHTML = '(' + _dragElement.style.left + ', ' + _dragElement.style.top + ')';
};

StartupAssist.OnMouseUp = function(e) {
  if (_dragElement !== null) {
    _dragElement.style.zIndex = _oldZIndex;

    // we're done with these events until the next OnMouseDown
    document.onmousemove = null;
    document.onselectstart = null;
    _dragElement.ondragstart = null;

    // this is how we know we're not dragging
    _dragElement = null;
    _debug.innerHTML = 'mouse up';
  }
};

StartupAssist.ExtractNumber = function(value) {
  var n = parseInt(value);

  return n === null || isNaN(n) ? 0 : n;
};

// this is simply a shortcut for the eyes and fingers
StartupAssist.$ = function(id) {
  return document.getElementById(id);
};



// StartupAssist.mouseOutHandler = function(event) {

//   if( selectElement !== 0 ){
//     //selectElement = 0;
//     event.target.removeEventListener('mousemove', StartupAssist.moveElement);
//     event.target.addEventListener('mousedown', StartupAssist.selectElement);
//     StartupAssist.updateTagInit(current_canva_id);

//   }
//     event.preventDefault();
//     return false;
// };

// StartupAssist.mouseUpHandler = function(event) {
//   if( selectElement !== 0 ){
//     // selectElement = 0;
//     event.target.removeEventListener('mousemove', StartupAssist.moveElement);
//     event.target.addEventListener('mousedown', StartupAssist.selectElement);
//     StartupAssist.updateTagInit(current_canva_id);
//   }
//     event.preventDefault();
//     return false;
// };


