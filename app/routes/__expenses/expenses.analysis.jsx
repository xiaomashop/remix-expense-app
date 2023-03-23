import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
//import expensesStyles from "~/styles/expenses.css"

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        title: 'First Expense',
        amount: 12.9,
        date: new Date().toISOString(),
    },
    {
        id: 'e2',
        title: 'Second Expense',
        amount: 20.3,
        date: new Date().toISOString(),
    },
]

export default function ExpensesAdd() {
    return (<main>
        <h1>Analysis Page</h1>
        <Chart expenses={DUMMY_EXPENSES}/>
        <ExpenseStatistics expenses={DUMMY_EXPENSES}/>
    </main>);
}

/*
export function links() {
    return [{ rel: 'stylesheet', href: expensesStyles }];
}*/