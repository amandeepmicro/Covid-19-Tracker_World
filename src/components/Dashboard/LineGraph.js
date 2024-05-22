import React, { useState, useEffect } from "react";
//we need to export line graph
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: true,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          parser: "MM/DD/YYYY",
          tooltipFormate: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: true,
        },
        ticks: {
          callbacks: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function LineGraph({ casesType = "cases", selectedCountry, graphColor, countryName, ...props }) {
  const [data, setData] = useState([]);

  //to specify color of graph according to casetype
  const colorsObj = {
    blue: {
      backgroundColor: "rgb(8, 83, 140 , 0.4)",
      borderColor: "rgb(8, 83, 140)",
    },
    green: {
      backgroundColor: "rgba(50, 231, 50, 0.4)",
      borderColor: "rgb(50, 231, 50)",
    },
    red: {
      backgroundColor: "rgb(204, 16, 52,0.4)",
      borderColor: "rgb(204, 16, 52)",
    },
  };
  //returns and array of objects containing x,y coordinates to generate a graph
  const buildChartData = (data, casesType = "cases") => {
    //here we create  a new array to store the data create by subtracting the previous date data
    //next date data
    //x and y represents the x axis and y axis;

    let chartData = [];
    //to compare the last data
    let lastDataPoint;
    //we will check if the data is of cases or recovered or deaths
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          //we get the new cases the next date
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  useEffect(() => {
    const url =
      selectedCountry === "worldwide"
        ? "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
        : `https://disease.sh/v3/covid-19/historical/${selectedCountry}?lastdays=120`;
    //to fetch data on initial render
    //https://disease.sh/v3/covid-19/historical/all?lastdays=30
    const fetchData = async () => {
      await fetch(url)
        .then((response) => {
          if (response.status === 404) {
            console.log("Error");
            document.querySelector(".noData").textContent = "No Data Available";
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          document.querySelector(".noData").textContent = `${data.country} ${casesType} Timeline`;
          //here we pass in the data and the term to extract specific data from the data obj
          if (document.querySelector(".noData").textContent === "No Data Available") {
            document.querySelector(".noData").textContent = `${data.country} ${casesType} Timeline`;
          }
          if (selectedCountry === "worldwide") {
            countryName("Worldwide");
            let chartData = buildChartData(data, casesType);
            setData(chartData);
            document.querySelector(".noData").textContent = `Worldwide ${casesType} Timeline`;
            //console.log(data)
            // console.log(chartData);
          } else {
            if (data.timeline) {
              countryName(data.country);
              let chartData = buildChartData(data.timeline, casesType);
              setData(chartData);
              //console.log(data)
              //console.log(chartData);
            }
          }
        })
        .catch((err) => {
          console.log("SOMETHING WENT WRONG WITH FETCH!");
          console.log(err);
        });
    };
    fetchData();
  }, [casesType, selectedCountry, countryName]);

  return (
    <div
      className={props.className}
      style={{ margin: "10px 0px" }}
    >
      {data && data.length > 0 ? (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: colorsObj[graphColor][`backgroundColor`],
                borderColor: colorsObj[graphColor][`borderColor`],
                data: data,
                label: `${casesType}`.toLocaleUpperCase(),
              },
            ],
          }}
        />
      ) : null}
    </div>
  );
}

export default LineGraph;
