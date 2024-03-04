import React, {useState } from 'react';
import { useResolvedPath } from 'react-router-dom';
// Handles the inner page navigation for the Income and Assets page
export default function useIIAPageNav() {
    
    const [currentPage, setCurrentPage] = useState('Overview')
    const pages = [
        {name: 'Overview', path: ''},
        {name: 'Accounts', path: 'accounts'},
        {name: 'Assets', path: 'assets'},
        {name: 'Income', path: 'income'}
    ]

    // Change Page
    function handleChangePage(newPage: string) {
        if (newPage === currentPage || !pages.map(page => page.name).includes(newPage)) return
        setCurrentPage(newPage)
    }

    // Set the current page based on the current path
    function setInitialPage(currentPath: string) {
        const pathName = pages.map( page => page.path).includes(currentPath) ? pages.filter(page => page.path === currentPath)[0].name : 'Overview'
        setCurrentPage(pathName)
    }

    return {
        currentPage,
        pages,
        handleChangePage,
        setInitialPage
    }

    

}