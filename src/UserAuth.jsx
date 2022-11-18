import React from 'react';
import './Chat.css';
import { useState } from 'react';
import Connection from './assets/svg/Connection'
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile 
} from 'firebase/auth';
import { auth } from './firebase-config';

export default function UserAuth() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    const [shouldSignUp, setshouldSignUp] = useState(false);
    const clearForm = () => 
    {
        setemail("");
        setpass("");
    }

    const SignIn = () =>
    {
        signInWithEmailAndPassword(auth, email, pass)
            .catch(err => 
            {
                switch(err.code)
                {
                    case "auth/user-not-found":
                        alert("There are no users with this email.");
                        clearForm();
                        break;
                    case "auth/wrong-password":
                        alert("You have entered the wrong password.");
                        setpass("");
                        break;
                    default:
                        console.log(err);
                        break;
                }
            });
    }

    const SignUp = () => 
    {
        createUserWithEmailAndPassword(auth, email, pass)
            .then((userCred)=> 
            {
                updateProfile(auth.currentUser, 
                    {
                        displayName : name
                    })
                        .then(()=>console.log(userCred))
                        .catch((err)=>console.log(err.message));
            })   
            .catch((err) => 
            {
                console.log(err);
                switch(err.code)
                {
                    case "auth/invalid-email":
                        alert("This email address is invalid.");
                        setemail("");
                        break;
                    case "auth/weak-password":
                        alert("The Password Should have at least 6 characters.");
                        setpass("");
                        break;               
                    case "auth/email-already-in-use":
                        alert("This email is already in use.");
                        setemail("");
                        break;
                    default:
                        console.log(err);
                        break;    
                }
            });
    }
    return (
        <React.Fragment>
        <div className="container-lg">
            <div className="row justify-content-center">
                <div className="col-sm-6 col-lg-4">
                    <div className="card">
                        <div className="card-header">
                            <Connection/>
                        </div>
                         <div className='card-body'>
                             <h4 className='text-center'>{shouldSignUp?"SIGN UP": "SIGN IN"}</h4>
                             {shouldSignUp && <input 
                                 type="text" 
                                 value = {name} 
                                 onChange = {(e)=>setname(e.target.value)} 
                                 className="form-control mt-3" 
                                 placeholder="Username" 
                                 aria-label="username" 
                             /> }
                             <input 
                                 type="text" 
                                 value = {email} 
                                 onChange = {(e)=>setemail(e.target.value)} 
                                 className="form-control mt-3" 
                                 placeholder="Email@wizard.com" 
                                 aria-label="email" 
                             />
                             <input 
                                 type="password" 
                                 value = {pass} 
                                 onChange = {(e)=>setpass(e.target.value)} 
                                 className="form-control mt-3" 
                                 placeholder="Password" 
                                 aria-label="password" 
                             />
                             {
                                 shouldSignUp
                                 ?
                                 <>
                                     <button type="button" className="btn btn-primary mt-3" onClick={SignUp}>SignUp</button>
                                     <p className="text-secondary mt-2">
                                         Registered? 
                                         <button 
                                             className='buttonAsAnchor text-secondary' 
                                             onClick={()=>setshouldSignUp(false)}
                                         >
                                             &nbsp;Sign in here.
                                         </button>
                                     </p>
                                 </>
                                 :
                                 <>
                                     <button type="button" className="btn btn-primary mt-3" onClick={SignIn}>SignIn</button>
                                     <p className="text-secondary mt-2">
                                         Not registered? 
                                         <button 
                                             className='buttonAsAnchor text-secondary' 
                                             onClick={()=>setshouldSignUp(true)}
                                         >
                                             &nbsp;Click here to sign up.
                                         </button>
                                     </p>
                                 </>
                             }
                         </div>
                    </div>
                 </div>
            </div>
        </div>
     </React.Fragment>
  )
}


                // const timeStampDate = doc.data().createdAt;
                // const dateInMillis  = timeStampDate.seconds * 1000
                // var date = new Date(dateInMillis).toDateString() + ' at ' + new Date(dateInMillis).toLocaleTimeString();
                // console.log(date);