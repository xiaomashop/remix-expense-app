import authStyles from "~/styles/auth.css"
import AuthForm from "~/components/auth/AuthForm";

export default function Auth(){
    return (<main>
        <AuthForm />
    </main>);
}


export function links() {
    return [{rel: 'stylesheet', href:authStyles}];
}