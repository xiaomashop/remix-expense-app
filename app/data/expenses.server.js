import {prisma} from './database.server'

export async function addExpense(expenseData, userId) {

    const mydata = {
        title: expenseData.title,
        amount: +expenseData.amount, //The data you get from a form is always be a string, add '+' to make it a number
        date: new Date(expenseData.date),
        User: { connect: {id: userId} },
    }
    try {
        return await prisma.expense.create({
            data: mydata
        });
    } catch (error) {
        console.log(error);
        throw Error("Failed to add an expense.");
    }
}

export async function getExpenses(userId) {
    if(!userId){
        throw new Error("Failed to get the list of expenses, userId is missing");
    }
    try{
        const expenses = await prisma.expense.findMany({
            where: {userId: userId},
            orderBy: {date: 'desc'}
        });
        return expenses;
    }catch (error){
        console.log(error);
        throw Error("Failed to get the list of expenses");
    }
}

export async function getExpense(expenseId){
    try{
        const expense = await prisma.expense.findFirst({where: {id: expenseId}});
        return expense;
    }catch (error){
        console.log(error);
        throw Error("Failed to get an expense");
    }
}

export async function updateExpense(expenseId, expenseData){
    try{
        await prisma.expense.update({
            where: {id: expenseId},
            data: {
                title: expenseData.title,
                amount: +expenseData.amount,
                date: new Date(expenseData.date)
            }
        });
    }catch (error){
        console.log(error);
        throw Error("Failed to update an expense");
    }
}

export async function deleteExpense(expenseId){
    try{
        await prisma.expense.delete({
            where: {id: expenseId},
        });
    }catch (error){
        console.log(error);
        throw Error("Failed to delete an expense");
    }
}