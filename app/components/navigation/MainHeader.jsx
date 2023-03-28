import Logo from '../util/Logo';
import { Form, Link, NavLink, useLoaderData } from '@remix-run/react';

function MainHeader() {

  const userId = useLoaderData();

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            {
              !userId &&
              <Link to="/auth" className="cta">
                Login
              </Link>
            }
            {
              userId &&
              <Form method="post" action="/logout">
                <button className='cta'>
                  Logout
                </button>
              </Form>
            }
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
