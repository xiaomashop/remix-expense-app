import { Link, Outlet, useLoaderData } from "@remix-run/react";
import ExpensesList from '~/components/expenses/ExpensesList';
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import { FaPlus, FaDownload } from "react-icons/fa";
import { getExpenses } from "~/data/expenses.server";
import { json } from "@remix-run/node";
import { requireUserSession } from "../../data/auth.server";

//Layout for all routes in expenses directory
export default function ExpensesLayout() {
    const expenses = useLoaderData();
    const hasExpenses = expenses && expenses.length>0;
    
    return (
        <>
            <ExpensesHeader />
            <Outlet />
            <main>
                <section id="expenses-actions">
                    <Link to="add">
                        <FaPlus />
                        <span>Add Expense</span>
                    </Link>
                    <a href="/expenses/raw">
                        <FaDownload />
                        Load Raw Data
                    </a>
                </section>
                {hasExpenses&&<ExpensesList expenses={expenses}/>}
                {!hasExpenses&& 
                    <section id="no-expenses">
                        <h1>No expenses found</h1>
                        <p>Start <Link to="add">adding some</Link> today.</p>
                    </section>}
                
            </main>
        </>
    );
}

export async function loader({request}) {
    const userId = await requireUserSession(request);
    const expenses = await getExpenses(userId);
    console.log("LOAD ALL EXPENSES")
    console.log(expenses)
    // return a raw data wrapped with response to the front end
    /*
    if(!expenses||expenses.length==0){
        throw json(
            {message:"Could not found any expenses."},
            {status:404, statusText:"No expenses found."}
        );
    }*/
    return json(expenses,{
        headers: {
            'Cache-Control': 'max-age=3',
        }
    });
}

export function headers({loaderHeaders}){
    return {
        'Cache-Control': loaderHeaders.get('Cache-Control')
    }
}
