import { getServerSession } from 'next-auth';
import { SessionProvider, signIn, signOut, getSession, useSession } from 'next-auth/react'
import AuthContext from '../authContext';


export default async function LoginPage() {
    const { data: session, status } = useSession();

    if (session) {
        return (
            <div>
                <h1>Already signed in</h1>
                <p>
                    You are already signed in. Click <button onClick={() => signOut()}>here</button> to sign out.
                </p>
            </div>
        )
    }

    return (
        <AuthContext>
            <div>
                <h1>Login</h1>
                <form onSubmit={e => {
                    e.preventDefault()
                    // Collect form data
                    const formData = new FormData(e.target as HTMLFormElement)
                    const username = formData.get('username')
                    const password = formData.get('password')
                    // Sign in
                    signIn('credentials', { username, password })
                }}>
                    <label>
                        Username
                        <input name="username" type="text" required />
                    </label>
                    <label>
                        Password
                        <input name="password" type="password" required />
                    </label>
                    <button type="submit">Sign in</button>
                </form>
            </div>
        </AuthContext>
    )
}