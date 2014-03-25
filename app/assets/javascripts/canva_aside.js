var StartupAssist = StartupAssist || {};

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


StartupAssist.drawTags = function(){
  var tag_width = 100,
      tag_height = 80;

  console.log("success");
  tag_svg = d3.select('#canva-svg');



  // Append the rectangular
  tag_svg.append("g")
         .attr('class', 'new-tag')
         .append('rect')
           .attr('class', 'tag-rect')
           .attr('x', 20)
           .attr('y', 10)
           .attr('height', tag_height)
           .attr('width', tag_width)
           .attr('onmousedown', 'StartupAssist.selectElement(event)')
           .attr('transform', 'translate(1000, 350)')
           .style('fill', 'f1c40f');
  // Append the text field to the tag.

  var tag_content = d3.select('.new-tag');

  tag_content.append('text')
         .attr('class', 'tag-content')
         .attr('x', 20)
         .attr('y', 10)
         .attr('transform', 'translate(1050, 395)')
         .style('font-size', 15)
         .style('fill', 'black')
         .style('stroke', 'none')
         .style('text-anchor', 'middle')
         .text('Tag Contents')
         .attr('onmousedown', 'StartupAssist.editText(event)');

};


StartupAssist.editText = function(event){
  var textElement = event.target,
      editedText = prompt("Edit texual contents:", textElement.firstChild.data);

  if( editedText !== null){
    textElement.firstChild.data = editedText;
  }
};

var selectElement = 0,
    selectContent = 0,
    currentX = 0,
    currentY = 0,
    currentTranslate = 0,
    i = 0;

StartupAssist.selectElement = function(event){
  selectContent = event.target.parentElement.getElementsByClassName('tag-content')[0];
  selectElement = event.target;
  currentX = event.clientX;
  currentY = event.clientY;
  currentTranslate = selectElement.getAttributeNS(null, "transform").slice(10, -1).split(', ');
  currentContentTranslate = selectContent.getAttributeNS(null, "transform").slice(10, -1).split(', ');

  for(i = 0; i < currentTranslate.length; i++ ){
    currentTranslate[i] = parseFloat(currentTranslate[i]);
  }

  for(i = 0; i < currentContentTranslate.length; i++ ){
    currentContentTranslate[i] = parseFloat(currentContentTranslate[i]);
  }


  selectElement.addEventListener('mousemove', StartupAssist.moveElement);
  selectElement.addEventListener('mouseup', StartupAssist.mouseUpHandler);
  selectElement.addEventListener('mouseout', StartupAssist.mouseOutHandler);
  selectElement.removeEventListener('mousedown', StartupAssist.selectElement);
  event.preventDefault();
  return false;
};

StartupAssist.moveElement = function(event) {
  dx = event.clientX - currentX;
  dy = event.clientY - currentY;

  currentTranslate[0] = parseInt(currentTranslate[0]) + parseInt(dx);
  currentTranslate[1] = parseInt(currentTranslate[1]) + parseInt(dy);

  currentContentTranslate[0] = parseInt(currentContentTranslate[0]) + parseInt(dx);
  currentContentTranslate[1] = parseInt(currentContentTranslate[1]) + parseInt(dy);

  newTranslate = "translate(" + currentTranslate.join(', ') + ")";
  newContentTranslate = "translate(" + currentContentTranslate.join(', ') + ")";
  event.target.setAttributeNS(null, "transform", newTranslate);
  event.target.parentElement.getElementsByClassName('tag-content')[0].setAttributeNS(null, "transform", newTranslate);
  event.target.parentElement.getElementsByClassName('tag-content')[0].setAttributeNS(null, "x", "70");
  event.target.parentElement.getElementsByClassName('tag-content')[0].setAttributeNS(null, "y", "50");
  currentX = event.clientX;
  currentY = event.clientY;
    event.preventDefault();
    return false;

};

StartupAssist.mouseOutHandler = function(event) {

  if( selectElement !== 0 ){
    //selectElement = 0;
    event.target.removeEventListener('mousemove', StartupAssist.moveElement);
    event.target.addEventListener('mousedown', StartupAssist.selectElement);
  }
    event.preventDefault();
    return false;
};

StartupAssist.mouseUpHandler = function(event) {
  if( selectElement !== 0 ){
    // selectElement = 0;
    event.target.removeEventListener('mousemove', StartupAssist.moveElement);
    event.target.addEventListener('mousedown', StartupAssist.selectElement);
  }
  StartupAssist.drawTags();
    event.preventDefault();
    return false;
};

StartupAssist.changeColor = function(d){
  var tag_svg = d3.select('#canva-svg'),
      color_array = ["#ecf0f1", "#2ecc71", "#9b59b6", "#e74c3c", "#3498db", "#f1c40f"];

  tag_svg.selectAll(".new-tag rect")
         .transition()
         .style("fill", color_array[d]);
};