import { json, redirect } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { getExpense, updateExpense, deleteExpense } from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';

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
/*
export async function loader({params}){
    const expenseId = params.expenseId;
    const expense = await getExpense(expenseId);
    console.log("LOAD EXPENSE BY ID");
    console.log(expense);
    return json(expense);
}*/

/*The above loader get an expense data by querying the mongodb database again.
* It is not necessary since we already have the expense data loaded in expense.jsx
* which is the parent route of $expenseId.jsx
*/

// This action deals with updating(patch method) and deleting(delete method) expense data
export async function action({params, request}) {
    const expenseId = params.expenseId;
    if(request.method==='PATCH'){
        const formData = await request.formData();
        const expenseData = Object.fromEntries(formData);
        //validate the form data at the backend
        try {
            validateExpenseInput(expenseData);
        }catch(error){
            return error;
        }
        //Update expense data
        await updateExpense(expenseId, expenseData);
    } else if(request.method==='DELETE'){
        await deleteExpense(expenseId);
    }
    return redirect("/expenses");
}

export function meta({params, parentsData}) {
    //console.log("parentsData",parentsData)
    const expense = parentsData['routes/__expenses/expenses'].find(
        (expense) => expense.id === params.expenseId
    );
    console.log(expense)
    return {
        title: "Expense(" + expense.title + ")",
        description: "Update expense."
    }
}