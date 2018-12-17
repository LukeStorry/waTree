console.log("started");

// setInterval(function(){
// 	drawChart()
// }, 1000);

drawChart();

function drawChart() {

  //Remove old data


  // Pull in new data and make graph
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

    treeGraph.append("defs")
    .append('pattern')
    .attr('id', '2030bg')
    .attr('patternContentUnits', 'objectBoundingBox')
    .attr('width', 1)
    .attr('height', 1)
    .append("image")
    .attr("xlink:href", "frontend/Pics/2030.png")
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 1)
    .attr('height', 1);

    treeGraph.append("defs")
    .append('pattern')
    .attr('id', '3040bg')
		.attr('patternContentUnits', 'objectBoundingBox')
    // .attr('patternContentUnits', 'userSpaceOnUse')
		// .attr("viewbox", "0 0 100 300")
		// .attr('preserveAspectRatio',"xMidYMid slice")
    .attr('width', 1)
    .attr('height', 1)
    .append("image")
    .attr("xlink:href", "frontend/Pics/5060.png")
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 1)
    .attr('height', 1)

    treeGraph.append("defs")
    .append('pattern')
    .attr('id', '4050bg')
    .attr('patternContentUnits', 'objectBoundingBox')
    .attr('width', 1)
    .attr('height', 1)
    .append("image")
    .attr("xlink:href", "frontend/Pics/4050.png")
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 1)
    .attr('height', 1);

    treeGraph.append("defs")
    .append('pattern')
    .attr('id', '5060bg')
    .attr('patternContentUnits', 'objectBoundingBox')
    .attr('width', 1)
    .attr('height', 1)
    .append("image")
    .attr("xlink:href", "frontend/Pics/5060.png")
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 1)
    .attr('height', 1);

    treeGraph.append("defs")
    .append('pattern')
    .attr('id', '6070bg')
    .attr('patternContentUnits', 'objectBoundingBox')
    .attr('width', 1)
    .attr('height', 1)
    .append("image")
    .attr("xlink:href", "frontend/Pics/6070.png")
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 1)
    .attr('height', 1);

    treeGraph.append("defs")
    .append('pattern')
    .attr('id', '7080bg')
    .attr('patternContentUnits', 'objectBoundingBox')
    .attr('width', 1)
    .attr('height', 1)
    .append("image")
    .attr("xlink:href", "frontend/Pics/7080.png")
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 1)
    .attr('height', 1);

    treeGraph.append("defs")
    .append('pattern')
    .attr('id', '8090bg')
    .attr('patternContentUnits', 'objectBoundingBox')
    .attr('width', 1)
    .attr('height', 1)
    .append("image")
    .attr("xlink:href", "frontend/Pics/8090.png")
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 1)
    .attr('height', 1);

    treeGraph.append("defs")
    .append('pattern')
    .attr('id', '90100bg')
    .attr('patternContentUnits', 'objectBoundingBox')
    .attr('width', 1)
    .attr('height', 1)
    .append("image")
    .attr("xlink:href", "frontend/Pics/90100.png")
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 1)
    .attr('height', 1);

    treeGraph.append("defs")
    .append('pattern')
    .attr('id', 'defaultbg')
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
    .attr("fill", function(d){
				if (d.Score >= 20 && d.Score < 30){
					return "url(#2030bg)";
				}
				else if (d.Score >= 30 && d.Score < 40){
					return "url(#3040bg)";
				}
				else if (d.Score >= 40 && d.Score < 50){
					return "url(#4050bg)";
				}
				else if (d.Score >= 50 && d.Score < 60){
					return "url(#5060bg)";
				}
				else if (d.Score >= 60 && d.Score < 70){
					return "url(#6070bg)";9
				}
				else if (d.Score >= 70 && d.Score < 80){
					return "url(#7080bg)";
				}
				else if (d.Score >= 80 && d.Score < 90){
					return "url(#8090bg)";
				}
				else if (d.Score >= 90 && d.Score <= 100){
					return "url(#90100bg)";
				}
				else {
					return "url(#defaultbg)";
				}
		});

  });

}
