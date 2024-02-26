import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "../../components/styles/navbar/navBar.module.css";

// Components
import SideNavItem from "./SideNavItem";

export default function DashSideNav() {
  const [isMounted, setIsMounted] = useState(false); // Used for loading animation
  const [currentRoute, setCurrentRoute] = useState(""); // Used for active link

  const location = useLocation(); // Used for active link
  // Navigation Links and sections
  const navItems = [
    {
      sectionName: null,
      sectionLinks: [
        {
          linkName: "Dashboard",
          linkPath: "/dashboard",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
              />
            </svg>
          ),
        },
      ],
    },
    {
      sectionName: "Financial Management",
      sectionLinks: [
        {
          linkName: "Income and Assets",
          linkPath: "/dashboard/income-and-assets",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
              />
            </svg>
          ),
        },
      ],
    },
  ]; // Render Nav Items

  // Trigger load in animation
  useEffect(() => {
    setIsMounted(true);

  }, []);
  // Update current route
  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname]);

  return (
    <nav className={`${classes.side__nav} `}>
      {/* Logo */}
      <div
        className={
          isMounted ? classes.logo : `${classes.logo} ${classes.logo__load}`
        }
      >
        <i className={`fa-solid fa-cubes-stacked ${classes.logo__icon}`}></i>
        <h1 className={`${classes.logo__text}`}>ExpenseTracker+</h1>
      </div>
      {/* Nav Items */}
      <div className={`${classes.section__container}`}>
        {navItems.map((section, index) => {
          return (
            <div className={``} key={`${section.sectionName}-${index}`}>
              {section.sectionName && (
                <div className={`${classes.section__header}`}>
                  <h2 className={classes.section__title}>
                    {section.sectionName}
                  </h2>
                  <hr className={classes.section__divider} />
                </div>
              )}
              <div className={`${classes.links__container}`}>
                {section.sectionLinks.map((link, index) => {
                  return (
                    <SideNavItem
                      key={`${link.linkName}-${index}`}
                      title={link.linkName}
                      route={link.linkPath}
                      currentRoute={currentRoute}
                      icon={link.icon}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
