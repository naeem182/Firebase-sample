import React, { useState } from 'react'
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../../Firebase/Firebase.init';



const Login = () => {
    const [user, setuser] = useState({})
    const auth = getAuth(app);
    const GoogleProvider = new GoogleAuthProvider();
    const GitHubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {

        signInWithPopup(auth, GoogleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setuser(loggedInUser)
            })
            .catch(error => {
                console.log('error', error.message)
            })

        console.log("google mama is coming")
    }

    const handleGoogleSignOut = () => {
        signOut(auth)
            .then(result => {
                setuser(null)
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }
    const handleGithubSignIn = () => {
        signInWithPopup(auth, GitHubProvider)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setuser(loggedUser)
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }

    return (
        <div>
            {user ?
                <button onClick={handleGoogleSignOut}> google Logout</button> :
                <div>
                    <button onClick={handleGoogleSignIn}> google Login</button>
                    <button onClick={handleGithubSignIn}> Github Login</button>
                </div>}
            {user && <div>

                <h3>user:{user.displayName}</h3>
                <h3>email:{user.email}</h3>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    )
}

export default Login
