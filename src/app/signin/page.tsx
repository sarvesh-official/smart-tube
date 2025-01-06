"use client"
import { signIn, signOut, useSession } from "next-auth/react"



const SignIn = () => {
    const {data: session} = useSession();


  return (
    <div>
      {
        session?.user ? <>
          <h1>Hi welcome {session.user.name}</h1>
          <button onClick={() => signOut()}>Log Out</button>
        </> :
        <>
        <h1>Login with Google</h1>
        <button onClick={() => signIn("google")}>
            Sign In
        </button>
        </>
  }
  </div>
  )
}

export default SignIn