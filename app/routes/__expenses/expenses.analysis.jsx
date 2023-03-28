import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import Chart from "~/components/expenses/Chart";
import { getExpenses } from "~/data/expenses.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "react-router";
import { useCatch } from "@remix-run/react";
import Error from "~/components/util/Error.jsx";
import { requireUserSession } from "~/data/auth.server";


export default function ExpensesAdd() {
    const expenses = useLoaderData();
    return (<>
        <ExpensesHeader />
        <main>
            <Chart expenses={expenses}/>
            <ExpenseStatistics expenses={expenses}/>
        </main>
    </>);
}

export async function loader({request}) {
    const userId = await requireUserSession(request);
    console.log("Expenses analysis loader.")
    const expenses = await getExpenses(userId);
    if(!expenses||expenses.length===0){
        throw json(
            {
                message: "Could not load expenses for the requested analysis"
            },
            {
                status: 404,
                statusText: "Expenses not found"
            }
        );
    }
    return expenses;
}

export function CatchBoundary(){
    const caughtResponse = useCatch();
    return (<>
        <ExpensesHeader />
        <main>
            <Error title={caughtResponse.statusText}>
                <p>{caughtResponse.data?.message || "Something went wrong."}</p>
            </Error>
        </main>
    </>);
}