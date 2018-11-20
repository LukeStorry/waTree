var treeData = [{name:"Aleena", size:5,  species:"Small",  item:[]},
                {name:"Rae",    size:12, species:"Big",    item:["glasses", "hat"]},
                {name:"Sunny",  size:8,  species:"Medium", item:["glasses"]},
                {name:"Luke",   size:15, species:"Small",  item:[]},
                {name:"Ben",    size:10, species:"Big",    item:[]}]; // TODO - replace with pulling in data

var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

var treeGraph = d3.select('svg')
   .attr("width", x)
   .attr("height", y);

var barPadding = 5;
var graphHeight = y;
var treeWidth = x/(treeData.length);

var biggestTreeSize = 0;
for (var i = 0; i < treeData.length; i++) {
  if (treeData[i].size > biggestTreeSize)
    biggestTreeSize = treeData[i].size;
}

var scaleFactor = graphHeight/(biggestTreeSize*1.2);

var barChart = treeGraph.selectAll("rect")
  .data(treeData)
  .enter()
  .append("rect")
  .attr("y", function(d) {
      return (graphHeight - (d.size*scaleFactor));
  })
  .attr("height", function(d) {
      return (d.size * scaleFactor);
  })
  .attr("width", treeWidth - barPadding)
  .attr("transform", function (d, i) {
      var translate = [treeWidth * i, 0];
      return "translate("+ translate +")";
  });
