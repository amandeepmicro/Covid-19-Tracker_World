import React, { useState, useEffect } from "react";
import InfoBox from "./Dashboard/InfoBox";
import CreateMap from "./Dashboard/Map";
import Table from "./Dashboard/Table";
import LineGraph from "./Dashboard/LineGraph";
import Progress from "./Progress";

import { sortData, prettyPrintStat } from "../utils/util";
import { makeStyles } from "@material-ui/core/styles";

import NativeSelect from "@material-ui/core/NativeSelect";

import { FormControl, Card, CardContent, FormHelperText } from "@material-ui/core";

import "../css/App.css";
import "leaflet/dist/leaflet.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    display: "flex",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Dashboard() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countryName, setCountryName] = useState("Worldwide");

  const [tableData, setTableData] = useState([]);
  // we pass in the center of the world
  const [mapCenter, setMapCenter] = useState({ lat: 21.14, lng: 79.088 });
  const [mapZoom, setMapZoom] = useState(2.6);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [graphColor, setGraphColor] = useState("blue");

  const colors = ["blue", "green", "red"];

  const changeCname = (name) => {
    setCountryName(name);
  };

  const classes = useStyles();

  useEffect(() => {
    // console.log('useEffect called')
    //get worldwide data
    const getWorldwideData = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          //console.log(data)
          setCountryInfo(data);
        });
    };

    //get data for all countries for table and dropdown
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          //console.log(data)
          const countriesName = data.map((country, index) => {
            //here we return an  object and push it into countries array with map
            //console.log(country.countryInfo._id)
            return {
              name: country.country, //United States,United Kingdom
              value: country.countryInfo.iso2, //Uk,USA, FR
              id: index, //0,1,2
            };
          });
          //here we pass in the sorteddata to tableData state
          setTableData(sortData(data));
          //to gather all countries data for map
          setMapCountries(data);
          //to make our dropdown selectable and get value attribute when selected
          setCountries(countriesName);
        });
    };
    getWorldwideData();
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    // setCountryName(e.target.value);
    const countryCode = e.target.value;
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSelectedCountry(countryCode);
        setCountryInfo(data);
        // console.log(selectedCountry)
        if (data && countryCode !== "worldwide") {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4.3);
        } else {
          setMapCenter([21.14, 79.088]);
          setMapZoom(5.3);
        }
      });
  };

  return (
    <div>
      {/* container */}
      <div className="app">
        {/* left part */}
        <div className="app_left">
          {/* Header */}
          <div className="app_heading"> </div>

          <Card className="item">
            <h1 style={{ textAlign: "center", color: "white" }}>
              Covid-19 <b>Dashboard</b>
            </h1>
            <CardContent>
              <div>
                <FormControl className={classes.formControl}>
                  {/* <InputLabel style={{textAlign:'center' ,alignItems:'center'}} htmlFor="uncontrolled-native">Name</InputLabel> */}
                  <NativeSelect
                    name={selectedCountry}
                    className="dropdown1"
                    value={selectedCountry}
                    // value={selectedCountry}
                    onChange={onCountryChange}
                    inputProps={{
                      name: "name",
                      id: "uncontrolled-native",
                    }}
                  >
                    <option
                      value="worldwide"
                      name="worldwide"
                    >
                      Worldwide
                    </option>
                    {countries.map((country) => {
                      return (
                        <option
                          key={country.id}
                          value={country.value}
                        >
                          {country.name}
                        </option>
                      );
                    })}
                  </NativeSelect>
                  <FormHelperText style={{ color: "white" }}>Select Country</FormHelperText>
                </FormControl>
              </div>

              <h3 className="app_graphTitle">Overview of {countryName}</h3>

              <div className="app_stats">
                <InfoBox
                  color={colors[0]}
                  onClick={() => {
                    setCasesType("cases");
                    setGraphColor("blue");
                  }}
                  title="Confirmed"
                  cases={prettyPrintStat(countryInfo.todayCases)}
                  total={countryInfo.cases}
                  active={casesType === "cases"}
                ></InfoBox>
                {/* Info Boxes title="coronavirus active cases*/}
                <InfoBox
                  color={colors[1]}
                  title="Recovered"
                  active={casesType === "recovered"}
                  onClick={() => {
                    setCasesType("recovered");
                    setGraphColor("green");
                  }}
                  cases={prettyPrintStat(countryInfo.todayRecovered)}
                  total={countryInfo.recovered}
                ></InfoBox>
                {/* Info Boxes title="coronavirus recoverd */}
                <InfoBox
                  color={colors[2]}
                  title="Deaths"
                  active={casesType === "deaths"}
                  onClick={() => {
                    setCasesType("deaths");
                    setGraphColor("red");
                  }}
                  cases={prettyPrintStat(countryInfo.todayDeaths)}
                  total={countryInfo.deaths}
                ></InfoBox>
                {/* Info Boxes title="coronavirus deaths*/}
              </div>

              <div className="progressSection">
                <h3 className="app_graphTitle">Stats of {countryName}</h3>
                <Progress
                  text="Active"
                  type={countryInfo.active}
                  total={countryInfo.cases}
                ></Progress>
                <Progress
                  text="Recovery"
                  type={countryInfo.recovered}
                  total={countryInfo.cases}
                ></Progress>
                <Progress
                  text="Death"
                  type={countryInfo.deaths}
                  total={countryInfo.cases}
                ></Progress>
              </div>
            </CardContent>
          </Card>
          {/* Map */}
          <Card className="item">
            <CardContent>
              <h3 className="app_graphTitle">Covid-19 Impact in {countryName}</h3>
              <CreateMap
                casesType={casesType}
                center={mapCenter}
                zoom={mapZoom}
                countries={mapCountries}
              />
            </CardContent>
          </Card>
        </div>
        {/* right part */}
        <div className="app_right">
          <Card className="item">
            <CardContent>
              {/* Graph */}
              <h3 className="app_graphTitle noData">
                {countryName} {casesType} Timeline{" "}
              </h3>
              <LineGraph
                className="app_graph"
                casesType={casesType}
                graphColor={graphColor}
                selectedCountry={selectedCountry}
                countryName={changeCname}
              />
            </CardContent>
          </Card>
          <Card className="item app_table">
            <CardContent>
              <h3 className="app_graphTitle">Top Total Cases by Country</h3>
              {/* Table */}
              <Table countries={tableData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
