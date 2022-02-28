/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file
const svg3 = d3
    .select("#csv-scatter")
    .append("svg")
    .attr("width", width-margin.left-margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);


d3.csv("data/scatter.csv").then((data) => {

    // find max X
    let maxX = d3.max(data, (d) => { return d.day; });
    console.log("Max x: " + maxX);

    // find max Y
    let maxY = d3.max(data, (d) => { return d.score; });
    console.log("Max y: " + maxY);

    let xScale = d3.scaleLinear()
        .domain([0, maxX])
        .range([margin.left, width - margin.right]);

    let yScale = d3.scaleLinear()
        .domain([0, maxY])
        .range([height - margin.bottom, margin.top]);

    // Map data values to pixel values
    console.log("Input 7, xScale output: " + xScale(7));
    console.log("Input: 95, yScale output: " + yScale(95));

    // Add x axis to svg3
    svg3.append("g") // g is a "placeholder" svg
        .attr("transform", `translate(0,${height - margin.bottom})`)
        // ^ moves axis to bottom of svg
        .call(d3.axisBottom(xScale)) // built in function for bottom
        // axis given a scale function
        .attr("font-size", '20px'); // set font size

    // Add y axis to svg3
    svg3.append("g") // g is a "placeholder" svg
        .attr("transform", `translate(${margin.left}, 0)`)
        // ^ move axis inside of left margin
        .call(d3.axisLeft(yScale)) // built in function for left
        // axis given a scale function
        .attr("font-size", '20px'); // set font size

// This code is creating a tooltip.
const tooltip3 = d3.select("#csv-scatter")
    .append("div")
    .attr('id', "tooltip3")
    .style("opacity", 0)
    .attr("class", "tooltip");

// Event Handler.
const mouseover3 = function(event, d) {
    tooltip3.html("Day: " + d.day + "<br> Score: " + d.score + "<br>")
        .style("opacity", 1);
}

// Event Handler. When the mouse moves, it shows the position of the mouse.
const mousemove3 = function(event, d) {
    tooltip3.style("left", (event.x)+"px")
        .style("top", (event.pageY + yTooltipOffset) +"px");
}

//Event Handler. When the mouse leaves a bar graph and the tool tip go away.
const mouseleave3 = function(event, d) {
    tooltip3.style("opacity", 0);
}

    // Add points
    const myCircles1 = svg3.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("id", (d) => d.day)
        .attr("cx", (d) => xScale(d.day)) //sets x data
        .attr("cy", (d) => yScale(d.score))
        .attr("r", 8)
        .style("fill", (d) => d.day)
        .style("opacity", 0.5)
        .attr("class", "myFirstPlot")
        .on("mouseover", mouseover3)
        .on("mousemove", mousemove3)
        .on("mouseleave", mouseleave3);

});



