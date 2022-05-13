import React  from "react";
import { Link, Outlet } from "react-router-dom";

const Meetings = () => {
    return(
        <div>Meeting
        <Link to="/meetings/addmeeting"> Add meeting </Link>
        <Outlet />
        </div>
    )
}

export default Meetings