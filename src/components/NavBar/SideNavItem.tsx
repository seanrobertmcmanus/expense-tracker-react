import { useEffect, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import classes from "../styles/navbar/navBar.module.css";



interface Props {
    title: string;
    route: string;
    icon: JSX.Element;

}


export default function SideNavItem({ title, route, icon }: Props) {
    const match = useMatch({ path: route, end: route === '/dashboard' });
    const [isActive, setIsActive] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsActive(route === '/dashboard' ? !!match : window.location.pathname.startsWith(route));
    }, [match, route]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <Link to={route} className={`${classes.link__item} ${isActive ? classes.link__item__active : ''} ${isMounted ? classes.link__item__load : ''}`}>
            <div className={`${classes.link__icon}`}>
                {icon}
            </div>
            <h3 className={classes.link__text}>{title}</h3>
        </Link>
    );
}