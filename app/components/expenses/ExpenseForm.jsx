import { Form, Link, useActionData, useLoaderData, useNavigation } from "@remix-run/react";

function ExpenseForm() {

  // If ExpenseForm is used for updating, expenseData should have a value.
  const expenseData = useLoaderData();
  const defaultValues = expenseData? {
    title: expenseData.title,
    amount: expenseData.amount,
    date: expenseData.date.slice(0,10)
  } : {
    title: '',
    amount: '',
    date: ''
  }

  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData();

  // Use navigation to find out whether you are submitting/loading the data or in idle
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle'
  return (
    <Form method="post" className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input type="text" id="title" name="title" required maxLength={30}
          defaultValue={defaultValues.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" name="amount" min="0" step="0.01" required
            defaultValue={defaultValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" max={today} required 
            defaultValue={defaultValues.date}
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {
            Object.values(validationErrors)
              .map((error)=><li key={error}>{error}</li>)
          }
        </ul>
      )}
      <div className="form-actions">
        <button disable={isSubmitting?"true":""}>{isSubmitting?"Saving ...":"Save Expense"}</button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
