import React, { useEffect } from 'react'
import { addToCart, removeFromCart } from '../actions/cartActions';
import {useDispatch, useSelector} from 'react-redux';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
export default function CartScreen(props) {



    const  productId = props.match.params.id;

const qty = props.location.search?  Number(props.location.search.split('=')[1]):1;

 const cart = useSelector((state) => state.cart);

const {cartItems, error} = cart;



const dispatch = useDispatch();
useEffect( () => {

if (productId) {dispatch(addToCart(productId, qty));


}

}, [dispatch,productId, qty]);


const removeFromCartHandler =(id)=> {
    //supprimer action
   dispatch(removeFromCart(id)) ;

};

const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };

    return (
        <div className="row top">
<div className="col-2">
<h1>Panier</h1>
{error && <MessageBox variant="danger">{error}</MessageBox>}
{cartItems.length === 0?<MessageBox>
Panier Vide . <Link to="/">Acceder au Menu</Link>
</MessageBox>
:
(
    <ul>
{
cartItems.map((item)=>(
<li key={item.product}>

  <div className="row">
      <div>
<img src={item.image} 
alt={item.name} 
className="small"></img>
</div>
      <div className="min-30">
<Link to={`/product/${item.product}`}>{item.name}</Link>
      </div>
      <div>
      <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
      </div>

      <div>{item.price}DT</div>
      <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Supprimer
                    </button>


 </div>  
</li>

))}

    </ul>
)}

</div>
<div className="col-1">

<div className="card card-body">

    <ul>
        <li>
          <h2>
          Total ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : 
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}DT
          </h2>  
        </li>

        <li>
            <button type="button" 
            onClick={checkoutHandler}
             className="primary block" 
             disabled={cartItems.length ===0}>
                 Poursuivre les commandes</button>
        </li>
    </ul>
</div>



</div>
 </div>
    );}
