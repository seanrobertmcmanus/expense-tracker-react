import { useState } from 'react';

interface chartDataset {
    label: string;
    data: number[];
    backgroundColor: string[];

}

export default function UseGetAccountsChartData() {
    // Chart Data
    const [chartDataset, setChartData] = useState<chartDataset[]>([{label: '', data: [], backgroundColor: []}]);
    const [chartLabels, setChartLabels] = useState<string[]>([]);
    // Goal Data
    const [goalData, setGoalData] = useState<{name:string, goal: number, balance: number, completion: number}[]>([]);
    // State
    const [chartLoading, setChartLoading] = useState(false);   


    // Temp Values
    const accountsData = [
        {type: 'Current',
         accounts: [
            {name: 'Monzo', balance: 10000, has_goal: false, goal: 20000},
            {name: 'Barklays', balance: 20000, has_goal: false, goal: 30000},
         ]    
        },
        {type: 'Savings',
         accounts: [
            {name: 'Revolute', balance: 30000, has_goal: true, goal: 40000},
            {name: 'Random', balance: 40000, has_goal: true, goal: 40000},
         ]    
        },
        {type: 'Investments',
         accounts: [
            {name: 'Trading 212', balance: 50000, has_goal: false, goal: 40000},
            {name: 'Vanguard', balance: 60000, has_goal: true, goal: 100000},
         ]
        },
    ];

    // Utils 
    // Colour Generating
    function generateHSLColor(index:number) {
        const hue = index * 137.508; // Use golden angle approximation for distribution
        return `hsl(${hue % 360}, 50%, 60%)`; // Adjust saturation and lightness as needed
      }


    // API Request for data
    function getAccountsChartData() {
      // Process Chart Data
        // Gather all unique account names
        const allAccountNames = Array.from(new Set(accountsData.flatMap(group => group.accounts.map(account => account.name))));
      
        // Map each account type to a dataset
        const datasets = accountsData.map((group, groupIndex) => {
          return {
            label: group.type,
            data: allAccountNames.map(name => {
              const account = group.accounts.find(acc => acc.name === name);
              return account ? account.balance : 0; // If account exists in this group, use its balance; otherwise, 0
            }),
            backgroundColor: allAccountNames.map((_, acctIndex) => generateHSLColor(groupIndex + acctIndex)),
          };
        });
        setChartData(datasets);
        setChartLabels(allAccountNames);
      
    // Process Goal Data
    const goalData = accountsData.flatMap(group => group.accounts.filter(account => account.has_goal).map(account => {
        return {
          name: account.name, 
          goal: account.goal,
          balance: account.balance,
          completion: Math.round((account.balance / account.goal) * 100)
           // Round to 2 decimal places
        };
      }));
      setGoalData(goalData);
      }

    return {
        chartDataset,
        chartLabels,
        goalData,
        chartLoading,
        getAccountsChartData
    }


}