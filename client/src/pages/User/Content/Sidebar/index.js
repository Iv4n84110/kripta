import React from "react";
import {NavLink} from "react-router-dom";

import classes from './styles.css';


const Sidebar = () => {
    return (
        <div className={classes.Wrapper}>
            <div className={classes.User}>
                <div className={classes.UserLogo}></div>
                <span className={classes.UserText}>Админ</span>
            </div>
            <nav className={classes.Navigation}>
                <NavLink to="/admin/create" className={classes.Link} activeClassName={classes.Selected}>
                    Создать пользователя
                </NavLink>
                <NavLink to="/admin/users" className={classes.Link} activeClassName={classes.Selected}>
                    Пользователи
                </NavLink>
            </nav>
        </div>

    )

}

export default Sidebar;