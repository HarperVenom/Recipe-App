import { Form, Link } from "react-router-dom";
import Star from "./Star";
import Search from "../assets/search.svg";

export default function NavBar({ search, setSearch }) {
  return (
    <div className="nav-bar">
      <div className="wrapper">
        <Link to={"/"} className="home-button">
          <img
            src="https://em-content.zobj.net/source/google/387/man-cook_1f468-200d-1f373.png"
            alt=""
          />
        </Link>

        <Form action="" role="search">
          <input
            type="search"
            value={search ? search : ""}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            name="q"
          />
          <img className="search-icon" src={Search} alt="" />
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
