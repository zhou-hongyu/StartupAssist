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


var selectElement = 0,
    currentX = 0,
    currentY = 0,
    currentTranslate = 0,
    i = 0;


StartupAssist.drawTags = function(){
  var tag_width = 100,
      tag_height = 80;

  console.log("success");
  tag_svg = d3.select('#canva-svg');
  tag_svg.append("g")
         .attr('class', 'new-tag')
         .append("rect")
           .attr('class', 'draggable')
           .attr("x", 20)
           .attr('y', 10)
           .attr('height', tag_height)
           .attr('width', tag_width)
           .attr('transform', 'translate(1000, 350)')
           .attr('onmousedown', 'StartupAssist.selectElement(event)')
           .style('fill', '#f1c40f');

};


StartupAssist.selectElement = function(event){
  selectElement = event.target;
  currentX = event.clientX;
  currentY = event.clientY;
  currentTranslate = selectElement.getAttributeNS(null, "transform").slice(10, -1).split(', ');

  for(i; i < currentTranslate.length; i++ ){
    currentTranslate[i] = parseFloat(currentTranslate[i]);
  }

  selectElement.addEventListener('mousemove', StartupAssist.moveElement);
  selectElement.addEventListener('mouseup', StartupAssist.mouseUpHandler); 
  //selectElement.addEventListener('mouseout', StartupAssist.mouseOutHandler);
  selectElement.removeEventListener('mousedown', StartupAssist.selectElement);
  event.preventDefault();
  return false;
};

StartupAssist.moveElement = function(event) {
  //console.log("moveElement: clientX = " + event.clientX);
  //console.log("moveElement: clientX = " + event.clientY);
  dx = event.clientX - currentX;
  dy = event.clientY - currentY;

  currentTranslate[0] = parseInt(currentTranslate[0]) + parseInt(dx);
  currentTranslate[1] = parseInt(currentTranslate[1]) + parseInt(dy);


  newTranslate = "translate(" + currentTranslate.join(', ') + ")";
  event.target.setAttributeNS(null, "transform", newTranslate);
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