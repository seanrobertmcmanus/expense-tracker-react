import React, { useEffect, useState, useRef  } from "react";

import classes from "../../../components/styles/iia/accounts.module.css";
// Hooks
import useGetAccountsChartData from "../../../hooks/useGetAccountsChartData";

// Components
import SingleValueCard from "../../../components/cards/singleValueCard";
import GroupedSideBarChart from "../../../components/charts/groupedSideBarChart";

export default function Accounts() {
  // Temp Values
  // Totals
  const totalAccountsValue = 1000000;
  const percentageGoalCompletion = 50;
  const changeInTotalBalanceThisMonth = 10000;
  // Account List (Graph)
  const {
    chartDataset,
    chartLabels,
    goalData,
    chartLoading,
    getAccountsChartData,
  } = useGetAccountsChartData();

  // Temp Get Data
  useEffect(() => {
    getAccountsChartData();
  }, []);
  // const labels = Array.from(allAccountNames);




  return (
    <div>
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
      <div className={`${classes.balances_container}`}>
        <div className={`${classes.graph_balance_container}`}>
          <GroupedSideBarChart
            title={"Account Balances"}
            labels={chartLabels}
            dataset={chartDataset}
          />
        </div>
        {/* Goal and Balance List */}
        <div className={`${classes.account_goal_container}`}>

          <ul className={`${classes.account_goals_list}`}>
            <li className={`${classes.account_goals}`} key={"header"}>
              <p className={`${classes.account_goal_header}`}></p>
              <p className={`${classes.account_goal_header}`}>Goal</p>
              <p className={`${classes.account_goal_header}`}>Balance</p>
              <p className={`${classes.account_goal_header}`}>%</p>
            </li>
            {goalData.map((goal, index) => {
              return (
                <li className={`${classes.account_goals}`} key={index}>
                  <p className={`${classes.account_goal_name}`}>{goal.name}</p>
                  <p>£{goal.goal}</p>
                  <p>£{goal.balance}</p>
                  <p>{goal.completion}%</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
