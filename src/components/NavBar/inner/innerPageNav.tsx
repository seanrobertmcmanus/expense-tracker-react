
import classes from '../../styles/navbar/innerPageNav.module.css'
import { NavLink } from 'react-router-dom';

interface Pages{
    name: string;
    path: string;
}

interface Props {
    currentPage: string;
    pages: Pages[];
    handleChangePage: (newPage: string) => void;
}

export default function InnerPageNav({currentPage, pages, handleChangePage}:Props) {

    return (
        <div className={classes.innerPageNav}>
            <ul className={classes.innerPageNavList}>
                {pages.map((page, index) => {
                    return (
                        <li className={`${classes.navListItem}`}key={index} >
                            <NavLink to={page.path} className={`${classes.navItem} ${currentPage === page.name ? classes.active : ''}`} onClick={() => handleChangePage(page.name)}>{page.name}</NavLink>
                            {/* <button className={`${classes.navItem} ${currentPage === page.name ? classes.active : ''}`} onClick={() => handleChangePage(page)}>{page}</button> */}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}