import { Form, Link, useActionData, useNavigation, useSearchParams } from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';

function AuthForm() {
  //Switch between login and signup mode
  const [ searchParams ] = useSearchParams();
  const authMode = searchParams.get("mode")||"login";
  const submitBtmCaption = authMode === "login" ? "Login" : "Sign Up";
  const toggleBtnCaption = authMode === "login" ? "Create a new user" : "Log in with existing user";
  const linkTo = authMode === "login" ? "?mode=signup" : "?mode=login";
  //User experience enhencement
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle';
  //Validation for auth
  const validationErrors = useActionData();

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authMode === "login" ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      {validationErrors && (
        <ul>
          {
            Object.values(validationErrors)
              .map((error)=><li key={error}>{error}</li>)
          }
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Autheticating..." : submitBtmCaption}
        </button>
        <Link to={linkTo}>{toggleBtnCaption}</Link>
      </div>
    </Form>
  );
}

export default AuthForm;
