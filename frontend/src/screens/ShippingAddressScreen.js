import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingAddressScreen(props) {
const userSignin =  useSelector (state => state.userSignin);
const{userInfo} = userSignin;
const cart = useSelector(state => state.cart);
const { shippingAddress } = cart;
if (!userInfo) {
  props.history.push('/signin');
}
const [email, setEmail] = useState(shippingAddress.email);
const [fullName, setFullName] = useState(shippingAddress.fullName);
const [address, setAddress] = useState(shippingAddress.address);
const [city, setCity] = useState(shippingAddress.city);
const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
const [country, setCountry] = useState(shippingAddress.country);
const dispatch = useDispatch();
const submitHandler = (e) => {
  e.preventDefault();
  dispatch(
    saveShippingAddress({ email ,fullName, address, city, postalCode, country })
  );
  props.history.push('/payment');
};


    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
<div>
    <h1>Adresse de livraison </h1>
</div>

<div>
          <label htmlFor="email">Adresse email</label>
          <input
            type="email"
            id="email"
            placeholder="Adresse email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>


<div>
    <label htmlFor="fullName">Nom complet </label>
    <input type="text"
     id="fullName" 
     placeholder="Nom complet" 
     value={fullName} 
    onChange={(e) => setFullName(e.target.value)} 
    required></input>
</div>

<div>
    <label htmlFor="address">Adresse </label>
    <input type="text"
     id="address" 
     placeholder="Adresse complète" 
     value={address} 
    onChange={(e) => setAddress(e.target.value)} 
    required></input>
</div>



<div>
    <label htmlFor="city">Ville </label>
    <input type="text"
     id="city" 
     placeholder="Ville" 
     value={city} 
    onChange={(e) => setCity(e.target.value)} 
    required></input>
</div>




<div>
    <label htmlFor="fullName">Code Postal </label>
    <input type="text"
     id="PostalCode" 
     placeholder="Code Postal" 
     value={postalCode} 
    onChange={(e) => setPostalCode(e.target.value)} 
    required></input>
</div>




<div>
    <label htmlFor="country">Pays </label>
    <input type="text"
     id="country" 
     placeholder="Pays" 
     value={country} 
    onChange={(e) => setCountry(e.target.value)} 
    required></input>
</div>






<label>
    <button className="primary" type="submit">Suivant</button>
</label>
</form>
        </div>
    );
}
