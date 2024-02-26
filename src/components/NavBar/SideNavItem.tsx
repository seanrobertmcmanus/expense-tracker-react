import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "../styles/navbar/navBar.module.css";



interface Props {
    title: string;
    route: string;
    currentRoute: string;
    icon: JSX.Element;

}


export default function SideNavItem({title, route, currentRoute, icon}: Props) {

    const [isActive, setIsActive] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    // Load in animation
    useEffect(() => {
        if (currentRoute === route) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [currentRoute])

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <Link to={route} className={`${classes.link__item} ${isActive ? classes.link__item__active : ''} ${isMounted ? classes.link__item__load : ''}`}>
            <div className={`${classes.link__icon}`}>
            {/* Icon */}
            {icon} 
            </div>
            <h3 className={classes.link__text}>{title}</h3>
        </Link>
    )
}