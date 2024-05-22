import React from "react";
import "../../css/Dashboard/Map.css";
import { Map, TileLayer, Circle, Popup } from "react-leaflet";
import numeral from "numeral";
function CreateMap({ countries, casesType = "cases", center, zoom, countryInfo }) {
  const casesTypeColors = {
    cases: {
      hex: "#08538c",
      rgb: "rgb(204,16,52)",
      half_op: "rgba(204,16,52,0.5)",
      multiplier: 600,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125,215,29)",
      half_op: "rgba(125,215,29,0.5)",
      multiplier: 1100,
    },
    deaths: {
      hex: "#CC1034",
      rgb: "rgb(251,68,67)",
      half_op: "rgba(251,68,67,0.5)",
      multiplier: 3000,
    },
  };

  return (
    <div className="map">
      <Map
        center={center}
        zoom={zoom}
      >
        <TileLayer
          url="https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}"
          attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          accessToken="x1ygxQd0Y4VqHRYviKLGoL8dlqWfXm23j16emIMeZt2qrPW8T7RNEn7lroHW1m1T"
        />
        {/* function to loop and draw circles */}

        {countries.map((country, index) => (
          <Circle
            className="circles"
            key={index}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
            onclick={(e) => {
              e.target.openPopup();
            }}
          >
            <Popup style={{ backgroundColor: "rgba(0, 0, 0, 0.829)" }}>
              <div className="info-container">
                <div
                  className="info-flag"
                  style={{
                    backgroundImage: `url(${country.countryInfo.flag})`,
                  }}
                ></div>
                <div className="info-name">{country.country}</div>
                <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
              </div>
            </Popup>
          </Circle>
        ))}
      </Map>
    </div>
  );
}

export default CreateMap;
