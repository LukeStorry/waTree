console.log("started");

setInterval(function(){
	drawChart()
}, 1000);

function drawChart() {
  d3.json("https://watree-backend.herokuapp.com/")
  .then(function(treeData){

		var nameRowNode = document.getElementById("nameRow");
		nameRowNode.innerHTML = '';

		var rainRowNode = document.getElementById("rainRow");
		rainRowNode.innerHTML = '';

		var treeRowNode = document.getElementById("treesRow");
		treeRowNode.innerHTML = '';

    console.log(treeData)
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
      if (d.isRaining) return "url(frontend/rainy-7.svg)";
      else             return "none";
    });

		var viewBoxDims = "0 0 " + graphWidth + " " + graphHeight;

    var treeGraph = d3.select('#treesRow')
    .append("svg")
    .attr("width", graphWidth)
    .attr("height", graphHeight)
		.attr("viewbox", viewBoxDims)
		.attr('preserveAspectRatio',"xMidYMid meet");

    var tree = treeGraph.selectAll("g")
    .data(treeData)
    .enter()
    .append("g")
    .attr("transform", function(tree, i) {
      return "translate(" + [treeWidth * i + barPadding / 2, 0] + ")";
    })
    .attr("height", (graphHeight*0.5))

		tree.append("image")
		.attr("y", function(d){
			  return (graphHeight - ((d.Score/100)*graphHeight));
		})
		.attr("height", function(d) {
		  return (d.Score+"%");
		})
		.attr("width", treeWidth - barPadding)
		.attr("xlink:href", "frontend/Pics/redTree.png")
  });
}
