import React, { useState, useEffect } from "react";
import numeral from "numeral";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import "../../css/Dashboard/Table1.css";

function Table(props) {
  //we are getting data already sorted in descending order
  const [data, setData] = useState([]);
  const [sortC, setSortC] = useState("desc");
  const [sortR, setSortR] = useState("desc");
  const [sortD, setSortD] = useState("desc");
  const [activeArrow] = useState(false);
  //console.log(sortC,sortR,sortD)

  //console.log(data)
  useEffect(() => {
    //console.log('table rerendered')
    setData(props.countries);
  }, [props.countries]);

  function sortByAscending(field) {
    return function (a, b) {
      if (a[field] > b[field]) {
        return -1;
      } else if (a[field] < b[field]) {
        return 1;
      }
      return 0;
    };
  }
  function sortByDescending(field) {
    return function (a, b) {
      if (a[field] > b[field]) {
        return 1;
      } else if (a[field] < b[field]) {
        return -1;
      }
      return 0;
    };
  }
  const sortDataDescd = (data, field) => {
    //console.log('descend',data, field)
    if (field === "cases") {
      setSortC("asc");
    } else if (field === "recovered") {
      setSortR("asc");
    } else {
      setSortD("asc");
    }

    const sortedData = [...data];

    //sortedData.sort((a,b)=> a.cases>b.cases?-1:1)
    sortedData.sort(sortByDescending(field));
    //console.log(sortedData)
    setData(sortedData);
  };
  const sortDataAscend = (data, field) => {
    if (field === "cases") {
      setSortC("desc");
    } else if (field === "recovered") {
      setSortR("desc");
    } else {
      setSortD("desc");
    }
    //console.log('ascend' , data, field)
    const sortedData = [...data];

    //sortedData.sort((a,b)=> a.cases>b.cases?-1:1)
    sortedData.sort(sortByAscending(field));
    //console.log(sortedData)
    setData(sortedData);
  };

  function ellipsify(str) {
    if (str.length > 8) {
      return str.substring(0, 8) + "...";
    } else {
      return str;
    }
  }

  const handleClick = (num, type) => {
    if (num === "desc") {
      sortDataDescd(data, type);
      // setActiveArrow(!activeArrow)
      // console.log(activeArrow)
    } else {
      sortDataAscend(data, type);
      // setActiveArrow(!activeArrow)
      // console.log(activeArrow)
    }
  };

  //console.log(data)
  return (
    <table>
      <tbody>
        <tr>
          <th className="thead">Flag</th>
          <th className="thead">Country</th>
          <th className="thead">
            Total
            <TableSortLabel
              onClick={() => handleClick(sortC, "cases")}
              active={activeArrow}
              direction={sortC}
            />
          </th>
          <th className="thead">
            Recovered
            <TableSortLabel
              onClick={() => handleClick(sortR, "recovered")}
              active={activeArrow}
              direction={sortR}
            />
          </th>
          <th className="thead">
            Deaths
            <TableSortLabel
              onClick={() => handleClick(sortD, "deaths")}
              active={activeArrow}
              direction={sortD}
            />
          </th>
        </tr>
        {data.slice(0, 10).map(({ countryInfo, country, cases, recovered, deaths }, index) => {
          return (
            <tr key={index}>
              <td>
                <img
                  width="20px"
                  src={countryInfo.flag}
                  alt={countryInfo.iso3}
                />
              </td>
              <td>{ellipsify(country)}</td>
              <td>
                <strong>{numeral(cases).format("0a")}</strong>
              </td>
              <td>
                <strong>{numeral(recovered).format("0a")}</strong>
              </td>
              <td>
                <strong>{numeral(deaths).format("0a")}</strong>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
