/* Resource route
    A route used only for getting data instead of a web page
*/
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

export function loader(){
    return DUMMY_EXPENSES;
}