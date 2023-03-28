import { redirect } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { addExpense } from '~/data/expenses.server';
import { requireUserSession } from '~/data/auth.server';
import { validateExpenseInput } from '~/data/validation.server';

export default function ExpensesAdd(){
    const navigate = useNavigate();
    const closeHandler = () => {
        //navigate programmatically
        navigate('/expenses');
    }
    return (<Modal onClose={closeHandler}>
        <ExpenseForm />
    </Modal>);
}

export async function action ({request}) {
    const userId = await requireUserSession(request);
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);
    console.log(expenseData);
    //validate the form data at the backend
    try {
        validateExpenseInput(expenseData);
    }catch(error){
        return error;
    }
    
    await addExpense(expenseData, userId);
    return redirect('/expenses');
}