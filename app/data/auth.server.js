import { prisma } from "./database.server";
import { hash, compare } from 'bcryptjs';
import { createCookieSessionStorage, redirect } from "@remix-run/node";


const SESSION_SECRET = process.env.SESSION_SECRET;
const sessionStorage = createCookieSessionStorage({
    cookie: {
        secure: process.env.NODE_ENV === 'production', //If secure is true, the http cookie will be enforced.
        secrets: [SESSION_SECRET], //used for signing these cookies
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60, //30 days
        httpOnly: true,
    }
});
async function createUserSession(userId, redirectPath){
    const session = await sessionStorage.getSession();
    session.set('userId', userId); // some session data
    return redirect(redirectPath, {
        headers: {
            'Set-Cookie': await sessionStorage.commitSession(session),
        }
    });
}

export async function signup({email, password}) {

    const existingUser = await prisma.user.findFirst({where: {email}});
    if(existingUser){
        const error = new Error("A user with the provided email address exists already.");
        error.status = 422;
        throw error;
    }
    const passwordHashed = await hash(password, 12);
    const user = await prisma.user.create({data: {email: email, password: passwordHashed}});
    return createUserSession(user.id, '/expenses');
}

export async function login({email, password}) {
    const existingUser = await prisma.user.findFirst({ where: {email}});
    // Is the user exist?
    if(!existingUser){
        const error = new Error("Could not log you in, please check the provided credentials.");
        error.status = 401;
        throw error;
    }
    // Is the password correct?
    const passwordCorrect = await compare(password, existingUser.password);
    if(!passwordCorrect){
        const error = new Error("Could not log you in, please check the provided credentials.");
        error.status = 401;
        throw error;
    }
    // Everything is correct
    // return a redirect response
    return createUserSession(existingUser.id, '/expenses');
}

export async function getUserFromSession(request) {
    const session = await sessionStorage.getSession(
        request.headers.get('Cookie')
    );
    const userId = session.get('userId');
    if(!userId){
        return null;
    }
    return userId;
}

export async function destroyUserSession(request){
    const session = await sessionStorage.getSession(
        request.headers.get('Cookie')
    );
    // Clear the session
    return redirect('/', {
        headers: {
            'Set-Cookie': await sessionStorage.destroySession(session)
        }
    })
}

export async function requireUserSession(request){
    const userId = await getUserFromSession(request);
    if(!userId){
        throw redirect('/auth?mode=login');
    }
    return userId;
}