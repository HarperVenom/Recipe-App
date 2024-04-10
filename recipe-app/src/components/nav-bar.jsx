import { useState } from "react";
import { Form, Link } from "react-router-dom";
import starSvg from "../assets/star.svg";
import Star from "./star-icon";

export default function NavBar({ search, setSearch }) {
  return (
    <div className="nav-bar">
      <div className="wrapper">
        <Form action="" role="search">
          <input
            type="search"
            value={search ? search : ""}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            name="q"
          />
        </Form>

        <ul>
          <li>
            <Link to={"/favourite"}>
              <Star></Star>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
