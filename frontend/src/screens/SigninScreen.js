import React, { useEffect, useState } from 'react';
import  {Link} from 'react-router-dom';
import  {useDispatch, useSelector}  from 'react-redux' ;
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
export default function SigninScreen(props) {

 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const redirect = props.location.search
 ? props.location.search.split('=')[1]
 : '/';

const userSignin = useSelector((state) => state.userSignin);
const { userInfo , loading , error } = userSignin;


const dispatch = useDispatch();

const  submitHandler =(e) => {
e.preventDefault();

// signin action 

dispatch(signin(email , password));
    };
    useEffect(()=>{
    if (userInfo)   {
        props.history.push(redirect);
    } 
    } , [props.history, redirect,userInfo]);

    return (
        <div>
            <form className= "form" onSubmit = {submitHandler}>

<div>

<h1>Connexion</h1>

</div>


<div>

    <label htmlFor="email">Adresse Email </label>
    <input type="email"
     id="email" 
     placeholder= "Entrer email" 
     required 
    onChange= { e => setEmail(e.target.value)}>

</input>
</div>
<div>

    <label htmlFor="password">Mot de passe </label>
    <input type="password"
     id="password" 
     placeholder= "Entrer mot de passe" 
     required 
    onChange= { e => setPassword(e.target.value)}>
</input>
</div>
<div>
<label/>
<button className="Primary" type="submit">
    Se connecter 
</button>
</div>
{loading && <LoadingBox></LoadingBox>}
{error && <MessageBox variant="danger">{error}</MessageBox>}

<div>
<label/>
<div>Nouveau utilisateur? {' '} </div>
<Link to={`/register?redirect=${redirect}`}>Créer un compte </Link>
</div>

</form>
 </div>

        
    );
}
