import { Form, Link, useSearchParams } from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';

function AuthForm() {
  const [ searchParams ] = useSearchParams();
  const authMode = searchParams.get("mode")||"login";
  const submitBtmCaption = authMode === "login" ? "Login" : "Sign Up";
  const toggleBtnCaption = authMode === "login" ? "Create a new user" : "Log in with existing user";
  const linkTo = authMode === "login" ? "?mode=signup" : "?mode=login";
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
      <div className="form-actions">
        <button>{submitBtmCaption}</button>
        <Link to={linkTo}>{toggleBtnCaption}</Link>
      </div>
    </Form>
  );
}

export default AuthForm;
