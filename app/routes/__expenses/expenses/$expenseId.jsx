import { json } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { getExpense } from '~/data/expenses.server';

export default function UpdateExpensePage(){
    const navigate = useNavigate();
    const closeHandler = () => {
        //navigate programmatically
        navigate('/expenses');
    }
    return (<Modal onClose={closeHandler }>
        <ExpenseForm />
    </Modal>)
}

// This loader will return the expense find by expenseId,
// and the value will be received in ExpenseForm using useLoaderData
export async function loader({params}){
    const expenseId = params.expenseId;
    const expense = await getExpense(expenseId);
    console.log("LOAD EXPENSE BY ID");
    console.log(expense);
    return json(expense);
}