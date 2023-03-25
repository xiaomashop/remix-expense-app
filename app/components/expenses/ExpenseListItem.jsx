import { Form, Link, useFetcher, useSubmit } from "@remix-run/react";

function ExpenseListItem({ id ,title, amount }) {
  //const submit = useSubmit();
  const fetcher = useFetcher();
  function deleteExpenseItemHandler() {
    // sends the delete request programmatically
    /*submit(null,{
      method: 'delete',
      action: `/expenses/${id}`
    });*/
    // confirm is built-in in the browser
    const proceed = confirm("Are you sure to delete this item?");
    if(proceed){
      fetcher.submit(null, {
        method:'delete',
        action: `/expenses/${id}`
      })
    }else{
      return;
    }
    
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        {/** 
        <Form method="delete" action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form>*/}
        <Link to={"/expenses/"+id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
