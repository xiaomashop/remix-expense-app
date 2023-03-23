import {prisma} from './database.server'

export async function addExpense(expenseData) {

    const mydata = {
        title: expenseData.title,
        amount: +expenseData.amount, //The data you get from a form is always be a string, add '+' to make it a number
        date: new Date(expenseData.date),
    }
    console.log("mydata",mydata)
    try {
        return await prisma.expense.create({
            data: mydata
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getExpenses() {
    try{
        const expenses = await prisma.expense.findMany({orderBy: {date: 'desc'}});
        return expenses;
    }catch (error){
        console.log(error);
        throw error;
    }
}

export async function getExpense(expenseId){
    try{
        const expense = await prisma.expense.findFirst({where: {id: expenseId}});
        return expense;
    }catch (error){
        console.log(error);
        throw error;
    }
}