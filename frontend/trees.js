d3.json("http://watree-backend.herokuapp.com/")

.then(function(treeData){
  var barPadding = 5;
  var graphHeight = document.getElementById('treesRow').offsetHeight;
  var graphWidth = document.getElementById('treesRow').scrollWidth;
  var treeWidth = graphWidth / (treeData.length);
  var namesHeight = document.getElementById('nameRow').offsetHeight;
  var rainHeight = document.getElementById('rainRow').offsetHeight;

  var nameLabelRow = d3.select('#nameRow')
    .append("svg")
    .attr("width", graphWidth)
    .attr("height", namesHeight);

  var label = nameLabelRow.selectAll("text")
    .data(treeData)
    .enter()
    .append("text")
    .attr("width", treeWidth - barPadding)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("transform", function(tree, i){
      return "translate(" + [((treeWidth * i) + (barPadding / 2) + (treeWidth/2)), 20] + ")";
    })
    .text(function(d) { return d.UserName; });

    var rainRow = d3.select("#rainRow");

    var rain = rainRow.selectAll("div")
    .data(treeData)
    .enter()
    .append("div")
    .style("width", (treeWidth) + "px")
    .style("height", rainHeight + "px")
    .style("display", "inline-block")
    .attr("transform", function(d, i) {
        return "translate(" + [(treeWidth * i), 0] + ")";
    })
    .style("background-image", function(d){
      if (d.isRaining) return "none"
      else             return "url(frontend/rainy-7.svg)";
    });

  var treeGraph = d3.select('#treesRow')
    .append("svg")
    .attr("width", graphWidth)
    .attr("height", graphHeight);

  treeGraph.append("defs")
    .append('pattern')
    .attr('id', 'bg')
    .attr('patternContentUnits', 'objectBoundingBox')
    .attr('width', 1)
    .attr('height', 1)
    .append("image")
    .attr("xlink:href", "frontend/tree_tester.jpg")
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 1)
    .attr('height', 1);

  var tree = treeGraph.selectAll("g")
    .data(treeData)
    .enter()
    .append("g")
    .attr("transform", function(tree, i) {
       return "translate(" + [treeWidth * i + barPadding / 2, 0] + ")";
    })
    .attr("height", (graphHeight*0.5))

  tree.append("rect")
    .attr("y", function(d) {
      return (graphHeight - ((d.Score/100)*graphHeight));
    })
    .attr("height", function(d) {
      return (d.Score+"%");
    })
    .attr("width", treeWidth - barPadding)
    .attr("fill", "url(#bg)");

});
