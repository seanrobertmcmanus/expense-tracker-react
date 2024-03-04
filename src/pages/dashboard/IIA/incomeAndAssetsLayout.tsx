import { useEffect, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Outlet } from 'react-router-dom';
// Hooks 
import useIIAPageNav from '../../../hooks/useIIAPageNav'
// Nav
import InnerPageNav from '../../../components/NavBar/inner/innerPageNav'
import '../../../App.css'

export default function IIALayout() {
    // Inner Page Navigation
    const {currentPage, pages, handleChangePage, setInitialPage} = useIIAPageNav()
    // Set the initial page based on the current path on load
    const basePath = useResolvedPath('.');
    const match = useMatch<'section', string>(`${basePath.pathname}/:section`);

    useEffect(() => {
        setInitialPage(match?.params.section || '')
    }, [])
    return (
        <div className="dashboard__page">
        {/* Inner page navigation: Overview | Financial Accounts | Financial Assets | Income */}
        <InnerPageNav 
          currentPage={currentPage}
          pages={pages}
          handleChangePage={handleChangePage}
        />
        {/* Page Content */}
        <div className={``}>
            <Outlet /> 
        </div>
    
    
    
      </div>
    )

}
