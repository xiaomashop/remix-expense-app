import authStyles from "~/styles/auth.css"
import AuthForm from "~/components/auth/AuthForm";
import { validateCredentials } from "~/data/validation.server";
import { signup, login } from "~/data/auth.server";

export default function Auth(){
    return (<main>
        <AuthForm />
    </main>);
}

export async function action({request}) {
    const searchParam = new URL(request.url).searchParams;
    const authMode = searchParam.get('mode') || 'login';
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);
    try{
        validateCredentials(credentials);
    } catch(error) {
        return error;
    }
    try{
        if(authMode==='login'){
            //login logic
            return await login(credentials);
        }else{
            //signup logic
            return await signup(credentials);
        }
    } catch(error) {
        // The user email has already exists.
        if(error.status===422){
            return {credentials: error.message};
        }
    }
    
}

export function links() {
    return [{rel: 'stylesheet', href:authStyles}];
}

export function headers({parentHeaders}) {
    return {
      'Cache-Control': parentHeaders.get('Cache-Control')
    }
  }