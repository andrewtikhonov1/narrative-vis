async function main(){
    let currentScene = 0;
let data = await d3.csv("data.csv");

    let lastSceneRendered = false; // track if last scene has been rendered once

    function updateScene() {
        d3.select("#vis").html(""); // clear previous scene

        if (currentScene === 0) {
            lastSceneRendered = false;
            drawScene1();
        } else if (currentScene === 1) {
            lastSceneRendered = false;
            drawScene2();
        } else if (currentScene === 2) {
            lastSceneRendered = false;
            drawScene3();
        } else if (currentScene === 3) {
            lastSceneRendered = false;
            drawScene4();
        } else if (currentScene === 4) {
            lastSceneRendered = false;
            drawScene5();
        } else if (currentScene === 5) {
            if (!lastSceneRendered) {
                drawInteractiveScene();
                lastSceneRendered = true;
            }
        }

        const nextBtn = document.getElementById("nextBtn");
        if (currentScene === 5) {
            nextBtn.style.backgroundColor = "#6c8ebf";  //appear disabled
            nextBtn.style.color = "";
            nextBtn.disabled = true;
        } else {
            nextBtn.style.backgroundColor = "";
            nextBtn.style.color = "";
            nextBtn.disabled = false;
        }

        const backBtn = document.getElementById("backBtn");
        if (currentScene === 0) {
            backBtn.style.backgroundColor = "#6c8ebf";  //appear disabled
            backBtn.style.color = "";
            backBtn.disabled = true;
        } else {
            backBtn.style.backgroundColor = "";
            backBtn.style.color = "";
            backBtn.disabled = false;
        }
    }

    document.getElementById("nextBtn").addEventListener("click", () => {
        if (currentScene < 5) {
            currentScene++;
            updateScene();
        }
        // else if at last scene, do nothing on next
    });

    document.getElementById("backBtn").addEventListener("click", () => {
        if (currentScene > 0) {
            currentScene--;
            lastSceneRendered = false; // reset so last scene re-renders if we go back and forward again
            updateScene();
        }
    });


    function drawScene1() {
        const width = 800;
        const height = 500;
        const margin = { top: 50, right: 100, bottom: 100, left: 100 };

        const svg = d3.select("#vis")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => +d.avg_income))
            .range([0, width - margin.left - margin.right]);

        const y = d3.scaleLinear()
            .domain([2, 8])
            .range([height - margin.top - margin.bottom, 0]);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const circles = g.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => x(+d.avg_income))
            .attr("cy", d => y(+d.happyScore))
            .attr("r", 0)
            .attr("fill", "#6ecf98ff")
            .attr("opacity", 0);

        // animate radius and opacity
        circles.transition()
            .duration(1000)
            .attr("r", 4)
            .attr("opacity", 1);

        // y-axis
        g.append("g")
            .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("~s")));

        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .attr("x", -y.range()[0] / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "#444")
            .text("Happiness Score");

        // x-axis
        g.append("g")
            .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("~s")));
    
        g.append("text")
            .attr("x", x.range()[1] / 2)
            .attr("y", height - margin.top - margin.bottom + 50)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "#444")
            .text("Average Income (USD, purchasing power adjusted)");

        const annotations = [
            {
                note: {
                label: "This webpage aims to explore the correlation between various factors and average happiness by country, with happiness measured on a 0-10 scale as a singular 'score'.",
                wrap: 150,
                padding: 5
                },
                x: 400,
                y: 325,
                dy: -1,
                dx: 1,
                subject: {
                radius: 0.001,
                radiusPadding: 0
                }
            }
            ];

            const makeAnnotations = d3.annotation()
            .type(d3.annotationCalloutCircle)
            .annotations(annotations);

            g.append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotations);

    }


    function drawScene2() {
        const width = 800;
        const height = 500;
        const margin = { top: 50, right: 100, bottom: 100, left: 100 };

        const svg = d3.select("#vis")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => +d.avg_income))
            .range([0, width - margin.left - margin.right]);

        const y = d3.scaleLinear()
            .domain([2, 8])
            .range([height - margin.top - margin.bottom, 0]);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const circles = g.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => x(+d.avg_income))
            .attr("cy", d => y(+d.happyScore))
            .attr("r", 0)
            .attr("fill", "#6ecf98ff")
            .attr("opacity", 0);

        circles.transition()
            .duration(1000)
            .attr("r", 4)
            .attr("opacity", 1);

        // axes
        g.append("g")
            .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("~s")));

        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .attr("x", -y.range()[0] / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "#444")
            .text("Happiness Score");

        g.append("g")
            .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("~s")));

        g.append("text")
            .attr("x", x.range()[1] / 2)
            .attr("y", height - margin.top - margin.bottom + 50)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "#444")
            .text("Average Income (USD, purchasing power adjusted)");

        // linear regression
        const xValues = data.map(d => +d.avg_income);
        const yValues = data.map(d => +d.happyScore);

        const xMean = d3.mean(xValues);
        const yMean = d3.mean(yValues);

        const num = d3.sum(data, d => (+d.avg_income - xMean) * (+d.happyScore - yMean));
        const den = d3.sum(data, d => Math.pow(+d.avg_income - xMean, 2));
        const m = num / den;
        const b = yMean - m * xMean;

        const xMin = d3.min(xValues);
        const xMax = d3.max(xValues);
        const yMin = m * xMin + b;
        const yMax = m * xMax + b;

        console.log(m);

        // create the regression line
        const regressionLine = g.append("line")
            .attr("x1", x(xMin))
            .attr("y1", y(yMin))
            .attr("x2", x(xMin))
            .attr("y2", y(yMin))
            .attr("stroke", "#444")
            .attr("stroke-width", 1);

        // animate the line
        regressionLine.transition()
            .duration(1000)
            .attr("x2", x(xMax))
            .attr("y2", y(yMax));

        const annotations = [
            {
                note: {
                label: "Overall, there is a positive correlation between average national income and happiness. On average, each $1k increase in income is associated with a 0.14-point increase in happiness score.",
                wrap: 150,
                padding: 5
                },
                x: 400,
                y: 325,
                dy: -1,
                dx: 1,
                subject: {
                radius: 0.001,
                radiusPadding: 0
                }
            }
            ];

            const makeAnnotations = d3.annotation()
            .type(d3.annotationCalloutCircle)
            .annotations(annotations);

            g.append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotations);
    }

    function drawScene3() {
        const width = 800;
        const height = 500;
        const margin = { top: 50, right: 100, bottom: 100, left: 100 };

        const svg = d3.select("#vis")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => +d.avg_income))
            .range([0, width - margin.left - margin.right]);

        const y = d3.scaleLinear()
            .domain([2, 8])
            .range([height - margin.top - margin.bottom, 0]);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // color based on income group
        const circles = g.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => x(+d.avg_income))
            .attr("cy", d => y(+d.happyScore))
            .attr("r", 0)
            .attr("fill", d => +d.avg_income < 10000 ? "#284f39ff" : "#6ecf98ff")
            .attr("opacity", 0);

        circles.transition()
            .duration(1000)
            .attr("r", 4)
            .attr("opacity", 1);

        // axes
        g.append("g")
            .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("~s")));

        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .attr("x", -y.range()[0] / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "#444")
            .text("Happiness Score");

        g.append("g")
            .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("~s")));

        g.append("text")
            .attr("x", x.range()[1] / 2)
            .attr("y", height - margin.top - margin.bottom + 50)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "#444")
            .text("Average Income (USD, purchasing power adjusted)");

        // regression filter
        const subset = data.filter(d => +d.avg_income < 10000);
        const xValues = subset.map(d => +d.avg_income);
        const yValues = subset.map(d => +d.happyScore);

        if (xValues.length >= 2) { // make sure of data points
            const xMean = d3.mean(xValues);
            const yMean = d3.mean(yValues);

            const num = d3.sum(subset, d => (+d.avg_income - xMean) * (+d.happyScore - yMean));
            const den = d3.sum(subset, d => Math.pow(+d.avg_income - xMean, 2));
            const m = num / den;
            const b = yMean - m * xMean;

            const xMin = d3.min(xValues);
            const xMax = d3.max(xValues);
            const yMin = m * xMin + b;
            const yMax = m * xMax + b;

            console.log(m);

            const regressionLine = g.append("line")
                .attr("x1", x(xMin))
                .attr("y1", y(yMin))
                .attr("x2", x(xMin))
                .attr("y2", y(yMin))
                .attr("stroke", "#444")
                .attr("stroke-width", 1);

            regressionLine.transition()
                .duration(1000)
                .attr("x2", x(xMax))
                .attr("y2", y(yMax));
        }

        const annotations = [
            {
                note: {
                label: "The rate of happiness increase is higher for poorer countries, specifically 0.262/$1k for countries with income below $10k, highlighted...",
                wrap: 150,
                padding: 5
                },
                x: 225,
                y: 100,
                dy: 75,
                dx: 125,
                subject: {
                radius: 0.001,
                radiusPadding: 0
                }
            },
            {
                note: {
                title: "Togo",
                label: "The country with the lowest happiness score (2.84).",
                wrap: 150,
                padding: 5
                },
                x: 15,
                y: 303,
                dy: -0.001,
                dx: 60,
                subject: {
                radius: 0.001,
                radiusPadding: 0
                },
                connector: {
                end: "arrow",
                type: "line",
                stroke: "black",
                strokeWidth: 5
                }
            },
            ];

            const makeAnnotations = d3.annotation()
            .type(d3.annotationCalloutCircle)
            .annotations(annotations);

            g.append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotations);

    }

    function drawScene4() {
        const width = 800;
        const height = 500;
        const margin = { top: 100, right: 100, bottom: 100, left: 100 };

        const svg = d3.select("#vis")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => +d.avg_income))
            .range([0, width - margin.left - margin.right]);

        const y = d3.scaleLinear()
            .domain([2, 8])
            .range([height - margin.top - margin.bottom, 0]);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // color based on income group
        const circles = g.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => x(+d.avg_income))
            .attr("cy", d => y(+d.happyScore))
            .attr("r", 0)
            .attr("fill", d => +d.avg_income > 15000 ? "#284f39ff" : "#6ecf98ff")
            .attr("opacity", 0);

        circles.transition()
            .duration(1000)
            .attr("r", 4)
            .attr("opacity", 1);

        // axes
        g.append("g")
            .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("~s")));

        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .attr("x", -y.range()[0] / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "#444")
            .text("Happiness Score");

        g.append("g")
            .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("~s")));

        g.append("text")
            .attr("x", x.range()[1] / 2)
            .attr("y", height - margin.top - margin.bottom + 50)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "#444")
            .text("Average Income (USD, purchasing power adjusted)");

        // regression filter
        const subset = data.filter(d => +d.avg_income > 15000);
        const xValues = subset.map(d => +d.avg_income);
        const yValues = subset.map(d => +d.happyScore);

        if (xValues.length >= 2) { // make sure of data
            const xMean = d3.mean(xValues);
            const yMean = d3.mean(yValues);

            const num = d3.sum(subset, d => (+d.avg_income - xMean) * (+d.happyScore - yMean));
            const den = d3.sum(subset, d => Math.pow(+d.avg_income - xMean, 2));
            const m = num / den;
            const b = yMean - m * xMean;

            console.log(m);

            const xMin = d3.min(xValues);
            const xMax = d3.max(xValues);
            const yMin = m * xMin + b;
            const yMax = m * xMax + b;

            const regressionLine = g.append("line")
                .attr("x1", x(xMin))
                .attr("y1", y(yMin))
                .attr("x2", x(xMin))
                .attr("y2", y(yMin))
                .attr("stroke", "#444")
                .attr("stroke-width", 1);

            regressionLine.transition()
                .duration(1000)
                .attr("x2", x(xMax))
                .attr("y2", y(yMax));
        }

        const annotations = [
            {
                note: {
                label: "...but levels off substantially for higher-income countries (above $15k). Could this indicate that happiness doesn't really increase with income once basic needs are met?",
                wrap: 150,
                padding: 5
                },
                x: 375,
                y: 75,
                dy: 10,
                dx: 50,
                subject: {
                radius: 0.001, 
                radiusPadding: 0
                }
            },
            {
                note: {
                title: "Switzerland",
                label: "The country with the highest happiness score (7.59).",
                wrap: 150,
                padding: 5
                },
                x: 530,
                y: 21,
                dy: -20,
                dx: -100,
                subject: {
                radius: 0.001,
                radiusPadding: 0
                },
                connector: {
                end: "arrow",
                type: "line",
                stroke: "black",
                strokeWidth: 5
                }
            },
            ];

            const makeAnnotations = d3.annotation()
            .type(d3.annotationCalloutCircle)
            .annotations(annotations);

            g.append("g")
            .attr("class", "annotation-group")
            .call(makeAnnotations);
    }

    function drawScene5() {
        const width = 800;
        const height = 500;
        const margin = { top: 50, right: 250, bottom: 100, left: 100 };

        const svg = d3.select("#vis")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => +d.avg_income))
            .range([0, width - margin.left - margin.right]);

        const y = d3.scaleLinear()
            .domain([2, 8])
            .range([height - margin.top - margin.bottom, 0]);

        const r = d3.scaleSqrt()
            .domain(d3.extent(data, d => +d["Healthy life expectancy"]))
            .range([1, 8]);

        const regions = Array.from(new Set(data.map(d => d.region.replace(/^'|'$/g, ""))));
        const color = d3.scaleOrdinal()
            .domain(regions)
            .range(d3.schemeCategory10);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const circles = g.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => x(+d.avg_income))
            .attr("cy", d => y(+d.happyScore))
            .attr("r", d => r(+d["Healthy life expectancy"]))
            .attr("fill", d => color(d.region.replace(/^'|'$/g, "")))
            .attr("opacity", 0);

        // animate radius and opacity
        circles.transition()
            .duration(1000)
            .attr("r", d => r(+d["Healthy life expectancy"]))
            .attr("opacity", 1);

        // y-axis
        g.append("g")
            .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("~s")));

        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .attr("x", -y.range()[0] / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "#444")
            .text("Happiness Score");

        // x-axis
        g.append("g")
            .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("~s")));

        g.append("text")
            .attr("x", x.range()[1] / 2)
            .attr("y", height - margin.top - margin.bottom + 50)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "#444")
            .text("Average Income (USD, purchasing power adjusted)");

        // add legend
        const legend = svg.append("g")
            .attr("transform", `translate(${width - margin.right + 20}, ${margin.top})`);

        regions.forEach((region, i) => {
            const legendRow = legend.append("g")
                .attr("transform", `translate(0, ${i * 20})`);

            legendRow.append("rect")
                .attr("width", 12)
                .attr("height", 12)
                .attr("fill", color(region));

            legendRow.append("text")
                .attr("x", 18)
                .attr("y", 10)
                .attr("text-anchor", "start")
                .style("font-size", "12px")
                .style("fill", "#444")
                .text(region);
        });

        const annotations = [
        {
            note: {
            label: "Coloring by region, we see that both happiness and average income can be clustered. With bubble size also represented by life expectancy, we notice another potential factor.",
            wrap: 200,
            padding: 10,
            },
            x: width - margin.right + 120,
            y: margin.top + regions.length * 20 + 10,
            dy: 0,
            dx: 0,
            subject: {
            radius: 0,
            },
            connector: {
            end: "arrow", 
            type: "line",
            }
        }
        ];

        // show annotations
        const makeAnnotations = d3.annotation()
            .type(d3.annotationLabel)
            .annotations(annotations)
            .textWrap(200)
            .notePadding(10);

        svg.append("g")
            .attr("class", "annotation-group")
            .call(g => {
                makeAnnotations(g);
            });
    }


    function drawInteractiveScene() {
        const width = 800;
        const height = 500;
        const margin = { top: 50, right: 250, bottom: 150, left: 100 };

        // dropdown label
        d3.select("#vis")
            .append("label")
            .attr("for", "xVarSelect")
            .style("display", "block")
            .style("margin", "0 0 5px 0")
            .text("Select variable:");

        // dropdown selector
        const selector = d3.select("#vis")
            .append("select")
            .attr("id", "xVarSelect")
            .style("margin-bottom", "10px")
            .style("font-family", "Segoe UI");

        const xOptions = [
            "avg_income",
            "median_income",
            "income_inequality",
            "GDP per capita",
            "Social support",
            "Perceptions of corruption",
            "Healthy life expectancy",
            "Generosity",
            "Freedom to make life choices"
        ];

        const xLabels = new Map();
        xLabels.set("avg_income", "Average Income (USD, purchasing power adjusted)");
        xLabels.set("median_income", "Median Income (USD, purchasing power adjusted)");
        xLabels.set("income_inequality", "Income Inequality Index");
        xLabels.set("GDP per capita", "GDP Per Capita (USD)");
        xLabels.set("Social support", "Social Support (Score)");
        xLabels.set("Perceptions of corruption", "Perceptions Of Corruption (Score)");
        xLabels.set("Healthy life expectancy", "Healthy Life Expectancy (Normalized)");
        xLabels.set("Generosity", "Generosity (Score)");
        xLabels.set("Freedom to make life choices", "Freedom To Make Life Choices (Score)");

        // dropdown options with proper labels
        selector.selectAll("option")
            .data(xOptions)
            .enter()
            .append("option")
            .attr("value", d => d)
            .text(d => xLabels.get(d));

        // hover tooltip
        const tooltip = d3.select("#vis")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("padding", "6px 10px")
            .style("background", "#fff")
            .style("border", "1px solid #ccc")
            .style("border-radius", "4px")
            .style("pointer-events", "none")
            .style("font-size", "12px")
            .style("color", "#333")
            .style("box-shadow", "0 2px 5px rgba(0,0,0,0.1)")
            .style("opacity", 0);

        const svg = d3.select("#vis")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const y = d3.scaleLinear()
            .domain([2, 8])
            .range([height - margin.top - margin.bottom, 0]);

        g.append("g")
            .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("~s")));

        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .attr("x", -y.range()[0] / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "#444")
            .text("Happiness Score");

        g.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`);

        g.append("text")
            .attr("class", "x-label")
            .attr("x", (width - margin.left - margin.right) / 2)
            .attr("y", height - margin.top - margin.bottom + 50)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "#444");

        // color scale and regions
        const regions = Array.from(new Set(data.map(d => d.region.replace(/^'|'$/g, ""))));
        const color = d3.scaleOrdinal()
            .domain(regions)
            .range(d3.schemeCategory10);

        // add legend
        const legend = svg.append("g")
            .attr("transform", `translate(${width - margin.right + 20}, ${margin.top})`);

        regions.forEach((region, i) => {
            const legendRow = legend.append("g")
                .attr("transform", `translate(0, ${i * 20})`);

            legendRow.append("rect")
                .attr("width", 12)
                .attr("height", 12)
                .attr("fill", color(region));

            legendRow.append("text")
                .attr("x", 18)
                .attr("y", 10)
                .attr("text-anchor", "start")
                .style("font-size", "12px")
                .style("fill", "#444")
                .text(region);
        });

        // annotation (reader can explore)
        const annotations = [
            {
                note: {
                    label: "Feel free to explore other variables and their correlation with happiness. Hovering over a datapoint will also show the country and exact measure.",
                    wrap: 200,
                    padding: 10,
                    title: "",
                },
                x: width - margin.right + 120,
                y: margin.top + regions.length * 20 + 10,
                dy: 0,
                dx: 0,
                subject: { radius: 0 },
                connector: { end: "arrow", type: "line" }
            }
        ];

        // show annotations
        const makeAnnotations = d3.annotation()
            .type(d3.annotationLabel)
            .annotations(annotations)
            .textWrap(200)
            .notePadding(10);

        svg.append("g")
            .attr("class", "annotation-group")
            .call(g => {
                makeAnnotations(g);
                // Bold the label text after creation
                g.selectAll(".annotation-note-label")
                    .style("font-weight", "bold");
            });

        function updatePlot(xVar) {
            const x = d3.scaleLinear()
                .domain(d3.extent(data, d => +d[xVar]))
                .range([0, width - margin.left - margin.right]);

            const xAxis = d3.axisBottom(x).ticks(5).tickFormat(d3.format("~s"));
            g.select(".x-axis").transition().duration(1000).call(xAxis);

            g.select(".x-label")
                .text(xLabels.get(xVar))
                .attr("x", (width - margin.left - margin.right) / 2);

            const joined = g.selectAll("circle")
                .data(data, d => d.Country);

            joined.join(
                enter => enter.append("circle")
                    .attr("cx", d => x(+d[xVar]))
                    .attr("cy", d => y(+d.happyScore))
                    .attr("r", 0)
                    .attr("fill", d => color(d.region.replace(/^'|'$/g, "")))
                    .attr("opacity", 0)
                    .on("mouseover", (event, d) => {
                        tooltip.transition().duration(200).style("opacity", 1);
                        tooltip.html(
                            `<strong>${d.country}</strong><br/>
                            Happiness: ${(+d.happyScore).toFixed(2)}<br/>
                            ${xLabels.get(xVar)}: ${(+d[xVar]).toLocaleString()}`
                        )
                            .style("left", `${event.pageX + 10}px`)
                            .style("top", `${event.pageY - 28}px`);
                    })
                    .on("mousemove", event => {
                        tooltip.style("left", `${event.pageX + 10}px`)
                            .style("top", `${event.pageY - 28}px`);
                    })
                    .on("mouseout", () => {
                        tooltip.transition().duration(300).style("opacity", 0);
                    })
                    .transition()
                    .duration(1000)
                    .attr("r", 4)
                    .attr("opacity", 1),

                update => update
                    .transition()
                    .duration(1000)
                    .attr("cx", d => x(+d[xVar]))
                    .attr("cy", d => y(+d.happyScore)),

                exit => exit.remove()
            );
        }

        const defaultX = xOptions[0];
        updatePlot(defaultX);

        selector.on("change", function () {
            const selected = d3.select(this).property("value");
            updatePlot(selected);
        });
    }

    
    updateScene();
}

main();