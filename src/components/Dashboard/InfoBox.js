//rfce is shortcut to buid boilerplate
import React from "react";
import CountUp from "react-countup";

import { Card, CardContent, Typography, Tooltip } from "@material-ui/core";

import "../../css/Dashboard/InfoBox.css";
function InfoBox({ title, cases, total, active, ...props }) {
  const activate = active ? `isActive--${props.color}` : "";
  function handleClick() {
    props.onClick();
  }
  return (
    <Tooltip title="Click to see Changes">
      <Card
        className={`infoBox infoBox--${props.color} isHighlighted--${props.color}  ${activate}`}
        onClick={handleClick}
      >
        <CardContent>
          {/* title */}
          <Typography
            variant="h6"
            className="infoTitle"
          >
            {title}
          </Typography>
          {/* no.of cases */}
          <h2 className="infoBox_cases">{cases}</h2>

          {/* total no. cases */}
          <Typography className="infoBox_total">
            <span className="infoTotalspan">Total:</span>{" "}
            {isFinite(total) ? (
              <CountUp
                end={total}
                duration={4}
                separator={","}
              ></CountUp>
            ) : (
              0
            )}
            {/* {numeral(total).format("0,0")}              */}
          </Typography>
        </CardContent>
      </Card>
    </Tooltip>
  );
}

export default InfoBox;
