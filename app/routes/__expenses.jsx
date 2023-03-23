import { Outlet } from "@remix-run/react";
import expensesStyles from '~/styles/expenses.css'

export default function ExpenseAppLayout(){
    return <Outlet />
}


export function links(){
    return [{rel: 'stylesheet', href: expensesStyles}];
  }
  