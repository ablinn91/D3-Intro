// @TODO: YOUR CODE HERE!
var svgWidth = 1000;
var svgHeight = 1000;

var margin = {
  top: 100,
  right: 100,
  bottom: 100,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// create the area for the graph
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("class","chart");

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);  

var thing = "data.csv"
// d3.csv(thing).then(function(data) {
//   console.log(data);
//   console.log("blah");
// });

d3.csv(thing).then(function(healthcareData){
  console.log(healthcareData);
  //cast the data this is from homework 3.9
    healthcareData.forEach(function(data){
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
    });

    var xLinearScale = d3.scaleLinear()
      .domain([(d3.min(healthcareData, d => d.healthcare)-.5), d3.max(healthcareData, d => d.healthcare)])
      .range([0,width]);

    var yLinearScale = d3.scaleLinear()
      .domain([(d3.min(healthcareData, d => d.poverty)-.5), d3.max(healthcareData, d => d.poverty)])
      .range([height,0]); 
  
  //create axis function
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //append axis to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
//putting an html tag for a group
    chartGroup.append("g")
      .call(leftAxis);
      
    //create circles
    chartGroup.selectAll("circle")
    .data(healthcareData)
    .enter()//this tels d3 to put new elements inside the page
    .append("circle")
    .attr("cx", d => xLinearScale(d.healthcare))
    .attr("cy", d => yLinearScale(d.poverty))
    .attr("r","17")
    .attr("fill","grey")
    .attr("class",d=> "stateCircle "+d.abbr);

    
    chartGroup.selectAll("text")  
    .data(healthcareData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.healthcare-.02))
    .attr("y", d => yLinearScale(d.poverty-.1))
    .attr("font-size","20")
    .attr("class","stateText")
    .text(d => d.abbr);

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Poverty");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Health Care");    
    
}).catch(function(error) {
  console.log(error);
}); 