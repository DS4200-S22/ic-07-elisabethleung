/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 

// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 

//Added an svg into the hard-coded-bar div. Setting up the width, height, and viewbox of the svg
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// find the max Y
let maxY1 = d3.max(data1, function(d) { return d.score; });

// Defining scale function for the y axis which takes data values and turns it into pixel values.
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// Defining the scale function for the x axis which takes data values and turns it into pixel values.
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// This is adding a y axis to svg1.
// The second line moves the axis to the left.
// The third line uses a built in function
// The last line sets the font size
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`)
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// This is adding a x-axis to svg1
// The second line moves the axis to the bottom.
// The third line uses a built in function
// The last line sets the font size
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// This code is creating a tooltip.
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// Event Handler. When the mouse goes over a certain bar, it shows the name and score of the bar.
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// Event Handler. When the mouse moves, it shows the position of the mouse.
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.pageY + yTooltipOffset) +"px");
}

//Event Handler. When the mouse leaves a bar graph and the tool tip go away.
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// This is assigning attributes to the barchart.
// We will use xScale and yScale to return pixel values for a given datum.

svg1.selectAll(".bar")
   .data(data1)
   .enter()
   .append("rect")
     .attr("class", "bar")
     .attr("x", (d,i) => xScale1(i))
     .attr("y", (d) => yScale1(d.score))
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score))
     .attr("width", xScale1.bandwidth())
     .on("mouseover", mouseover1)
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);


// barchart 2

const svg2 = d3
    .select("#csv-bar")
    .append("svg")
    .attr("width", width-margin.left-margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);


svg2.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale1))
    .attr("font-size", '20px');

svg2.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale1)
        .tickFormat(i => data1[i].name))
    .attr("font-size", '20px');


// This code is creating a tooltip.
const tooltip2 = d3.select("#csv-bar")
    .append("div")
    .attr('id', "tooltip2")
    .style("opacity", 0)
    .attr("class", "tooltip");

// Event Handler. When the mouse goes over a certain bar, it shows the name and score of the bar.
const mouseover2 = function(event, d) {
  tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>")
      .style("opacity", 1);
}

// Event Handler. When the mouse moves, it shows the position of the mouse.
const mousemove2 = function(event, d) {
  tooltip2.style("left", (event.x)+"px")
      .style("top", (event.pageY + yTooltipOffset) +"px");
}

//Event Handler. When the mouse leaves a bar graph and the tool tip go away.
const mouseleave2 = function(event, d) {
  tooltip2.style("opacity", 0);
}


  d3.csv("data/barchart.csv").then((data) => {
  svg2.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d,i) => xScale1(i))
      .attr("y", (d) => yScale1(d.score))
      .attr("height", (d) => (height - margin.bottom) - yScale1(d.score))
      .attr("width", xScale1.bandwidth())
      .on("mouseover", mouseover2)
      .on("mousemove", mousemove2)
      .on("mouseleave", mouseleave2);
});









