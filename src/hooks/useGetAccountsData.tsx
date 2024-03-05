import {useState} from 'react';

// Data Structures 

// Account Data
interface Accounts {
    id: number;
    name: string;
    description: string;
    balance: number;
    has_goal: boolean;
    goal: number;
}

interface AccountType {
    id: number;
    name: string;
    description: string;
}

interface AccountData {
    type: AccountType;
    accounts: Accounts[];
}

// Chart Data
interface ChartDataset {
    label: string;
    data: number[];
    backgroundColor: string[];
}

// Categories Data




// Retrieve Data for the accounts page
export default function UseGetAccountsData() {
    // State
    const [isAccountsLoading, setAccountsLoading] = useState(false);
    // Accounts Data 
    //const [accountsData, setAccountsData] = useState<AccountData[]>([]);
    // PROCESSED DATA
    // Chart Data
    const [chartDataset, setChartData] = useState<ChartDataset[]>([{label: '', data: [], backgroundColor: []}]);
    const [chartLabels, setChartLabels] = useState<string[]>([]);

    // Temp Data 
    const accountsData: AccountData[] = [
        {
            type: {
                id: 1,
                name: 'Current',
                description: 'Accounts for everyday use'
            },
            accounts: [
                {
                    id: 1,
                    name: 'Monzo',
                    description: 'A digital bank',
                    balance: 10000,
                    has_goal: true,
                    goal: 20000
                },
                {
                    id: 2,
                    name: 'Barklays',
                    description: 'A digital bank',
                    balance: 20000,
                    has_goal: true,
                    goal: 30000
                }
            ]
        },
        {
            type: {
                id: 2,
                name: 'Savings',
                description: 'Accounts for saving money'
            },
            accounts: [
                {
                    id: 3,
                    name: 'Revolute',
                    description: 'A digital bank',
                    balance: 30000,
                    has_goal: true,
                    goal: 40000
                },
                {
                    id: 4,
                    name: 'Random',
                    description: 'A digital bank',
                    balance: 40000,
                    has_goal: true,
                    goal: 40000
                }
            ]
        },
        {
            type: {
                id: 3,
                name: 'Investments',
                description: 'Accounts for investing money'
            },
            accounts: [
                {
                    id: 5,
                    name: 'Trading 212',
                    description: 'A digital bank',
                    balance: 50000,
                    has_goal: true,
                    goal: 40000
                },
                {
                    id: 6,
                    name: 'Vanguard',
                    description: 'A digital bank',
                    balance: 60000,
                    has_goal: true,
                    goal: 100000
                }
            ]
        }
    ]


    // Util
    // Colour Generating
    function generateHSLColor(index:number) {
        const hue = index * 137.508; // Use golden angle approximation for distribution
        return `hsl(${hue % 360}, 50%, 60%)`; // Adjust saturation and lightness as needed
      }


    // Data Processing
    // Chart Data Processing
    function processChartData() {
        // Gather all unique account names
        const allAccountNames = Array.from(new Set(accountsData.flatMap(group => group.accounts.map(account => account.name))));
      
        // Map each account type to a dataset
        const datasets = accountsData.map((group, groupIndex) => {
          return {
            label: group.type.name,
            data: allAccountNames.map(name => {
              const account = group.accounts.find(acc => acc.name === name);
              return account ? account.balance : 0; // If account exists in this group, use its balance; otherwise, 0
            }),
            backgroundColor: allAccountNames.map((_, acctIndex) => generateHSLColor(groupIndex + acctIndex)),
          };
        });
        setChartData(datasets);
        setChartLabels(allAccountNames);
      }
    
    // Categories Data Processing
    function processCategoriesData() {
        
    }



    // API Request for data (TEMP FOR NOW)
    function getAccountsData() {
        setAccountsLoading(true);
        processChartData();
        setAccountsLoading(false);
    }


    return {
        accountsData,
        chartDataset,
        chartLabels,
        isAccountsLoading,
        getAccountsData
    }

}