import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import Error from "~/components/util/Error.jsx";
import sharedStyles from "~/styles/shared.css";

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

function Document({title, children}){
  return (<html lang="en">
  <head>
    <title>{title}</title>
    <Meta />
    <Links />
  </head>
  <body>
    {children}
    <ScrollRestoration />
    <Scripts />
    <LiveReload />
  </body>
</html>);
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

//A CatchBoundary is a React component that renders whenever an action or loader throws a Response
export function CatchBoundary(){
  const caughtResponse = useCatch();
  return (
    <Document title={caughtResponse.statusText}>
      <main>
        <Error title={caughtResponse.statusText}>
          <p>{caughtResponse.data?.message||"Someting went wrong..."}</p>
          <p>Back to <Link to="/">safety</Link>.</p>
        </Error>
      </main>
    </Document>
  )
}

/**
 * We should use CatchBoundary if we care about the context of the error, 
 * such as status codes or the custom data related to the error; 
 * in another case, we use ErrorBoundary.
 * The good thing is we can even use them together. 
 * So, for example, if there's an error in the CatchBoundary, 
 * that error will be caught by the ErrorBoundary.
 */
export function ErrorBoundary({error}){
  return (
  <Document title="An error occured">
    <main>
      <Error title="An error occured">
        <p>{error.message||"Someting went wrong..."}</p>
        <p>Back to <Link to="/">safety</Link>.</p>
      </Error>
    </main>
  </Document>
  )
}

export function links(){
  return [{rel: 'stylesheet', href: sharedStyles}];
}
