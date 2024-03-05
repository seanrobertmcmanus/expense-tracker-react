import React, { useEffect, useState, useRef } from "react";

import classes from "../../../components/styles/iia/accounts.module.css";
// Hooks
import UseGetAccountsData from "../../../hooks/useGetAccountsData";

// Components
import SingleValueCard from "../../../components/cards/singleValueCard";
import GroupedSideBarChart from "../../../components/charts/groupedSideBarChart";
import CatEditCard from "../../../components/cards/catEditCard";

export default function Accounts() {
  // Temp Values
  // Totals
  const totalAccountsValue = 1000000;
  const percentageGoalCompletion = 50;
  const changeInTotalBalanceThisMonth = 10000;
  // Accounts Data
  const {
    accountsData,
    chartDataset,
    chartLabels,
    isAccountsLoading,
    getAccountsData,
  } = UseGetAccountsData();

  // Temp Get Data
  useEffect(() => {
    getAccountsData();
  }, []);

  return (
    <div className={`${classes.page__container}`}>
      {/* Main Section */}
      <div className={`${classes.main__container}`}>
        {/* Total Accounts Value */} {/* Percentage Goal  Completion */}{" "}
        {/*change in total balance this month*/}
        <div className={`${classes.header_container}`}>
          <SingleValueCard
            title="Total Balance"
            value={totalAccountsValue}
            prefix="£"
          />
          <SingleValueCard
            title="Goal Completion"
            value={percentageGoalCompletion}
            suffix="%"
          />
          <SingleValueCard
            title="Change in Balance"
            value={changeInTotalBalanceThisMonth}
            prefix="£"
          />
        </div>
        {/* Accounts List, Side bar chart ranked highest to lowest with earnings*/}{" "}
        {/* Goal and Balance Display */}
        <div className={`${classes.graph_balance_container}`}>
          <GroupedSideBarChart
            title={"Account Balances"}
            labels={chartLabels}
            dataset={chartDataset}
          />
        </div>
      </div>
      {/* Secondary Section */}
      <div>
        {/* Categories */}
        <div className={`${classes.categories_container}`}>
          {/* Title + Add New Button */}
          <div className={`${classes.categories__header}`}>
            <h1 className={`${classes.categories__title}`}>Categories</h1>
            <button
              className={`${classes.categories__add_button}`}
              onClick={() => console.log("Add New")}
            >
              <span>Add New </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          {/* Categories + Total Balance + Edit Button */}
          <div className={`${classes.categories_items__container}`}>
            {accountsData.map((accountType, index) => (
              <CatEditCard
                key={index}
                id={accountType.type.id}
                title={accountType.type.name}
                prefix="£"
                value={accountType.accounts.reduce(
                  (acc, account) => acc + account.balance,
                  0
                )}
                onEdit={() => console.log("Edit")}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Third Section */}
      <div>{/* Accounts */}</div>
    </div>
  );
}
