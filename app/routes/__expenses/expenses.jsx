import { Outlet, useLoaderData } from "@remix-run/react";
import ExpensesList from '~/components/expenses/ExpensesList';
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import { FaPlus, FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getExpenses } from "~/data/expenses.server";
import { json } from "@remix-run/node";

//Layout for all routes in expenses directory
export default function ExpensesLayout() {
    const expenses = useLoaderData();
    
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
                <ExpensesList expenses={expenses}/>
            </main>
        </>
    );
}

export async function loader() {
    const expenses = await getExpenses();
    console.log("LOAD ALL EXPENSES")
    console.log(expenses)
    // return a raw data wrapped with response to the front end
    return json(expenses);
}