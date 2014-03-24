var StartupAssist = StartupAssist || {};

StartupAssist.drawPanel = function(){
  var color_panel = d3.select('#color-panel-svg'),
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
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .on("click", function(d) {
          return StartupAssist.changeColor(d.index);
        });


};


StartupAssist.drawTags = function(){
  console.log("success");
  tag_svg = d3.select('#tag-svg');
  tag_svg.append("g")
         .attr('class', 'new-tag')
         .append("rect")
           .attr("x", 20)
           .attr('y', 10)
           .attr('height', 160)
           .attr('width', 180)
           .style('fill', '#f1c40f');

};

StartupAssist.changeColor = function(d){
  var tag_svg = d3.select('#tag-svg'),
      color_array = ["#ecf0f1", "#2ecc71", "#9b59b6", "#e74c3c", "#3498db", "#f1c40f"];
      tag_svg.selectAll(".new-tag rect")
           .transition()
           .style("fill", color_array[d]);
};