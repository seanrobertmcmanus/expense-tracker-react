import React, { useEffect, useState, useRef } from "react";

import classes from "../../../components/styles/pages/dashboard/iia/accounts.module.css";
// Hooks
import UseGetAccountsData from "../../../hooks/useGetAccountsData";

// Components
import SingleValueCard from "../../../components/cards/singleValueCard";
import GroupedSideBarChart from "../../../components/charts/groupedSideBarChart";
import CatEditCard from "../../../components/cards/catEditCard";
import AccountsTable from "../../../components/IIA/accounts/accountsTable";

export default function Accounts() {
  // Temp Values
  // Totals
  const totalAccountsValue = 1000000; // Set to 0 if no accounts
  const percentageGoalCompletion = 50; // Set to 0 if no goals
  const changeInTotalBalanceThisMonth = 10000; // Set to 0 if no change
  // Accounts Data
  const {
    accountsData,
    chartDataset,
    chartLabels,
    isAccountsLoading,
    isEmpty,
    getAccountsData,
  } = UseGetAccountsData();

  // Temp Get Data
  useEffect(() => {
    getAccountsData();
  }, []);

  // Loading Skeleton outline

  // Normal Render
  return (
    <div className={`${classes.page__container}`}>
      <div className={`${classes.primary__container}`}>
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
            {/* Display Empty Message if isEmpty, else display graph*/}
            <GroupedSideBarChart
              title={"Account Balances"}
              labels={chartLabels}
              dataset={chartDataset}
              isEmpty={isEmpty}
            />
          </div>
        </div>
        {/* Secondary Section */}
        <div>
          {/* Categories */}
          <div className={`${classes.categories_container}`}>
            {/* Title + Add New Button */}
            <div className={`${classes.categories__header}`}>
              <h1 className={`${classes.categories__title}`}>Account Types</h1>
              <div>
                <button
                  className={`${classes.categories__add_button}`}
                  onClick={() => console.log("Add New")}
                >
                  <span>New</span>
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
            </div>
            {/* Categories + Total Balance + Edit Button */}
            <div className={`${classes.categories_items__container}`}>
              {/* If isEmpty display Empty Message, else render Card */}
              {isEmpty ? (
                <p className={`${classes.categories_is_empty_message}`}>
                  No Account Types Created
                </p>
              ) : (
                accountsData.map((accountType, index) => (
                  <CatEditCard
                    key={index}
                    id={accountType.type.id}
                    title={accountType.type.name}
                    prefix="£"
                    // Total Balance or 0 if no accounts
                    value={
                      accountType.accounts.reduce(
                        (acc, account) => acc + account.balance,
                        0
                      ) || 0
                    }
                    onEdit={() => console.log("Edit")}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Third Section */}
      <div className={`${classes.account_management__container}`}>
        <AccountsTable />
      </div>
    </div>
  );
}
