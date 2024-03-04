import React, {useState} from 'react'; 

import classes from '../../../components/styles/iia/accounts.module.css'


import SingleValueCard from "../../../components/cards/singleValueCard";

export default function Accounts() {

    const totalAccountsValue = 1000000;

    const percentageGoalCompletion = 50;

    const changeInTotalBalanceThisMonth = 10000;

    return (
        <div>
            {/* Total Accounts Value */} {/* Percentage Goal  Completion */} {/*change in total balance this month*/}
            <div className={`${classes.header_container}`}>
                <SingleValueCard title="Total Balance" value={totalAccountsValue} prefix='£' />
                <SingleValueCard title="Goal Completion" value={percentageGoalCompletion} suffix='%'/>
                <SingleValueCard title="Change in Balance" value={changeInTotalBalanceThisMonth} prefix='£' />
            </div>
            {/* Accounts List, Side bar chart ranked highest to lowest with earnings*/} {/* Short Activity */}

            
            <h1>Accounts</h1>
        </div>
    )
}