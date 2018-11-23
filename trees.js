var treeData = [{name:"Aleena", size:5,  species:"Small",  item:[]},
                {name:"Rae",    size:12, species:"Big",    item:["glasses", "hat"]},
                {name:"Sunny",  size:8,  species:"Medium", item:["glasses"]},
                {name:"Luke",   size:15, species:"Small",  item:[]},
                {name:"Ben",    size:10, species:"Big",    item:["shoes", "hat"]}]; // TODO - replace with pulling in data

var graphWidth = window.innerWidth;
var graphHeight = window.innerHeight;

var imgURL = "http://worldartsme.com/images/truffula-tree-clipart-1.jpg";

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

treeGraph.append("defs")
     .append('pattern')
     .attr('id', 'bg')
     .attr('patternContentUnits', 'objectBoundingBox')
     .attr('width', 1)
     .attr('height', 1)
     .append("image")
     .attr("xlink:href", "tree_tester.jpg")
     .attr('x', 0)
     .attr('y', 0)
     .attr('width', 1)
     .attr('height', 1);

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
  })
  .attr("fill", "url(#bg)");
