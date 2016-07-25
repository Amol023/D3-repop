
// Sample data set:
const dataset = [
  25, 7, 10, 26, 11, 8, 25, 14, 4, 19,
  14, 11, 22, 29, 11, 13, 12, 17, 1, 5, 
  24, 18, 25, 9, 3, 48, 23, 12, 13, 9, 
  3, 18, 2, 24, 7, 29, 11, 18, 38, 41
],
      [ contHeight, contWidth ] = [ 750, 1000 ],
      maxDataVal = Math.max.apply(null, dataset),
      normalizer = Math.floor((contHeight - 50) / maxDataVal),
      barSpacing = 7.5,
      barWidth = (contWidth - (20 + dataset.length * barSpacing)) / dataset.length;


// Compute statistical values:
const datasetSum = dataset.reduce((memo, index) => memo += index),
    average = datasetSum / dataset.length,
    stdDev = Math.sqrt(dataset.reduce((memo, index) => memo += Math.pow(index - average, 2)) / (dataset.length - 1));
      console.log(`Summed Data: ${datasetSum}\nAverage: ${average}\nStandard Deviation: ${stdDev}`);

// Initiate DOM tree manipulation:
let svg = d3.select("#barChart")
  .append("svg")
  .attr("id", "svgCont")
  .style("height", contHeight)
  .style("width", contWidth);


// let focus = svg.append("g")
//   .attr("class", "focus")
//   .style("display", "none");

let focus = svg.append("line")
  .attr("x1", 0)                    // <-- d3.mouse(this)[0]
  .attr("x2", 0)                    // <-- d3.mouse(this)[0]
  .attr("y1", 0)
  .attr("y2", `100\%`)
  .style("class", "focus")
  .style("stroke", "Red") 
  .style("stroke-width", 1)
  .style("opacity", "0.75");
  // .style("display", "none");

// let vertCircle = focus.append("circle")
//   .attr("class", "focus")
//   .attr("cx", 0)                    // <-- d3.mouse(this)[0]
//   .attr("cy", contHeight / 2)
//   .attr("r", 20)
//   .style("fill", "green");



let bars = svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("height", (d) => d * normalizer)
  .attr("width", barWidth)
  .attr("x", (d, i) => (i * (barSpacing + barWidth)) + 15)
  .attr("y", function(d, i) {
    return (contHeight - 15) - d3.select(this).attr("height");
  })
  .attr("data-coloration", function(d) {
      // console.log(`rgba(56, ${98 + d / 5}, ${100 + Math.sqrt(d3.select(this).attr("height"))}, 0.7)`);

      // Teal:            rgb(0, 128, 128)
      // Mozilla Blue 1:  rgb(85, 138, 187)
      // Mozilla Blue 2:  rgb(21, 72, 119)
    return `rgba(${43 - Math.round(average - d)}, ${128 - Math.round(d / 3)}, ${110 + (Math.round(d / stdDev) * 12)}, 0.88)`;
    // return `rgba(36, 98, 156, ${d3.select(this).attr("height") / 750})`;
  })
  // .style("fill", function(d, i) {return d3.select(this).dataset; })
  .style("fill", function(d) {
    return `rgba(${43 - Math.round(average - d)}, ${128 - Math.round(d / 3)}, ${110 + (Math.round(d / stdDev) * 12)}, 0.88)`;
  })
  .attr("stroke", "Teal")
  .attr("stroke-width", 0.45)
  .attr("stroke-opacity", 0.55)
  .classed("bar", true)
  .on("mouseover", function() {
     d3.select(this)
      .enter()
      .append("text")
      .text((d) => d.x)
      .attr("x", (d) => x(d.x))
      .attr("y", (d) => y(d.y)) 
  });

let labels = svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(d => d)
  .attr("x", (d, i) => (i * (barSpacing + barWidth)) + 15)
  .attr("y", function(d, i) {
    return contHeight - (d * normalizer + 20);
  })
  .style("font-family", "PT Sans")
  .style("fill", "#696969")
  .style("font-weight", 900)
  .style("font-size", 16)
  .style("text-shadow", "1px 1px 3px Darkcyan");


// let svgCont = svg.append("g")
//   .attr("class", "focus")
//   .style("display", "none");


// ******
// let vert = svg.append("line")
//   .attr("x1", 0)  // d3.mouse(this)[0]
//   .attr("x2", 0)  // d3.mouse(this)[0]
//   .attr("y1", 0)
//   .attr("y2", `100\%`)
//   .style("class", "focus")
//   .style("stroke", "Red")
//   .style("stroke-width", 1)
//   .style("opacity", "0.75")
//   .style("display", "none");


// function makeVert(ev)

/* function mouseMove() { */  
// d3.select("#svgCont")
//   .on("mousemove", function(d) {
//     d3.select(this)

      // .transition()
      // .duration(750)
      // .attr("r", 15);
      // return labels.style("visibility", "visible");

      // .append("circle")
      // .attr("cx", 200)
      // .attr("cy", 200)
      // .attr("r", 50)
      // .style("fill", "orange");



    // Interpolated vertical line marker:
      // .append("line")
      //   .attr("x1", d3.mouse(this)[0])
      //   .attr("x2", d3.mouse(this)[0])
      //   .attr("y1", 0)
      //   .attr("y2", `100\%`)
      //   .style("stroke", "Red")
      //   .style("stroke-width", 2)

    // Crosshair circle:
      // .append("circle")
      //   .attr("cx", d3.mouse(this)[0])
      //   .attr("cy", d3.mouse(this)[1])
      //   .attr("r", 60)
      //   .style("fill", "transparent")
      //   .style("stroke", "Green")
      //   .style("stroke-width", 2)
  // });


// let vert =  


svg
  // .append(vert)
  // .attr("class", "overlay")
  // .attr("width", width)
  // .attr("height", height)
  .on("mouseover", function() { 
    focus.attr("x1", d3.mouse(this)[0]);
    focus.attr("x2", d3.mouse(this)[0]);
    focus.style("display", null); 
  })
  .on("mouseout", () => focus.style("display", "none"))
  .on("mousemove", markPosition);


function markPosition() {
  // vert.attr("transform", "translate(" + d3.mouse(this)[0] + ")");
  focus.attr("x1", d3.mouse(this)[0]);
  focus.attr("x2", d3.mouse(this)[0]);
}



// let vert = svg.select("line")
//   .data()
//   .append("line")
//   .attr("x1", )


// let svgCont = document.getElementById("svgCont");
// svgCont.addEventListener("click", function(evt) {
//   var xPos = evt.pageX - pageXOffset;
//   var yPos = evt.pageY - pageYOffset;
//     console.log(`> X Coord: ${xPos}\t\t Y Coord: ${yPos}`);
//     console.log(`> Client X: ${evt.clientX}\t\t Client Y: ${evt.clientY}`);
//     console.log(`> Page X: ${evt.pageX}\t\t Page Y: ${evt.pageY}`);
//     console.log(`> Screen X: ${evt.screenX}\t\t Screen Y: ${evt.screenY}`);
// });


