var treeData = [{name:"Aleena", size:5,  species:"Small",  item:[]},
                {name:"Rae",    size:12, species:"Big",    item:["glasses", "hat"]},
                {name:"Sunny",  size:8,  species:"Medium", item:["glasses"]},
                {name:"Luke",   size:15, species:"Small",  item:[]},
                {name:"Ben",    size:10, species:"Big",    item:[]}]; // TODO - replace with pulling in data

var graphWidth = window.innerWidth;
var graphHeight = window.innerHeight;

var treeGraph = d3.select('svg')
  .attr("width", graphWidth)
  .attr("height", graphHeight);

var biggestTreeSize = treeData.reduce(function(biggest, next) {
  return biggest.size > next.size ? biggest : next;
}).size;

// TODO normalise the incoming data instead of growing trees according to largest
var scaleFactor = graphHeight / (biggestTreeSize * 1.2);
var barPadding = 5;
var treeWidth = graphWidth / (treeData.length);

var barChart = treeGraph.selectAll("rect")
  .data(treeData)
  .enter()
  .append("rect")
  .attr("y", function(d) {
    return (graphHeight - (d.size * scaleFactor));
  })
  .attr("height", function(tree) {
    return (tree.size * scaleFactor);
  })
  .attr("width", treeWidth - barPadding)
  .attr("transform", function(tree, i) {
    return "translate(" + [treeWidth * i + barPadding / 2, 0] + ")";
  });
