import React from "react";
import { NavLink } from "react-router-dom";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

import "../css/Navbar.css";

export default function Navbar() {
  return (
    <div>
      <nav id="navbar">
        <h1 className="logo">
          <span className="text-primary">Covid</span>
          <TrendingUpIcon
            fontSize="large"
            style={{ color: "#00b217" }}
          />
          <span style={{ color: "#c80414" }}>Tracker</span>
        </h1>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              activeClassName="selected"
            >
              {" "}
              Dashboard{" "}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/news"
              activeClassName="selected"
            >
              News
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/precautions"
              activeClassName="selected"
            >
              {" "}
              Precautions{" "}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/usefulLinks"
              activeClassName="selected"
            >
              Useful Links
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
