import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET } from '../constants/orderConstants';

    


export default function OrderScreen(props) {

    const orderId = props.match.params.id;
    const [sdkReady , setSdkReady] = useState(false);
    const orderDetails = useSelector(state => state.orderDetails);
    const {order, loading, error} = orderDetails;
    const orderPay = useSelector (state => state.orderPay);
    const {loading : loadingPay, error: errorPay , success: successPay} = orderPay ;
   
    const orderDeliver = useSelector((state) => state.orderDeliver);
    const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;



const dispatch = useDispatch();
   const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {

    const addPayPalScript = async () => {

const {data} = await axios.get('/api/config/paypal');
const script = document.createElement('script');
script.type="text/javascript";
script.src=`https://www.paypal.com/sdk/js?client-id=${data}`; 
script.async = true ; 
script.onload= () => {
    setSdkReady(true);
};

document.body.appendChild(script);
 };
 if (
    !order ||
    successPay ||
    successDeliver ||
    (order && order._id !== orderId)
  ) {
    dispatch({type: ORDER_PAY_RESET});
    dispatch({ type: ORDER_DELIVER_RESET });

dispatch(detailsOrder(orderId));
} else {
    if (!order.isPaid){
        if(!window.paypal){
         addPayPalScript();   
        } else  {
           setSdkReady(true);
        }
    }
}
  
  }, [dispatch, sdkReady , orderId ,successPay, successDeliver,  order]);

const successPaymentHandler = (paymentResult) => {
dispatch (payOrder(order , paymentResult)); 
}

const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };


    return loading? (
    <LoadingBox></LoadingBox>
    ):error?  (
    <MessageBox variant="danger">{error}</MessageBox>
    ):(
        <div>
            <h1>Commande {order._id}</h1>
           
            <div className="row top">
            <div className="col-2"></div>
<ul>
    <li>
        <div className="card card-body">
            <h2>Livraison</h2>
            <p>
                <strong>Nom:</strong>{order.shippingAddress.fullName} <br />
                <strong>Adresse:</strong>{order.shippingAddress.address}, 
                {order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}
           
            </p>
            {order.isDelivered? <MessageBox variant="success">Delivrée le {order.deliveredAt} </MessageBox>
            :
           ( <MessageBox variant="danger">Non délivrée</MessageBox>)
            }
        </div>
    </li>
    
    <li>
        <div className="card card-body">
            <h2>Paiement</h2>
            <p><strong>Methode de paiement:</strong>{order.paymentMethod} </p> 
            {order.isPaid? <MessageBox variant="success">Payée le {order.paidAt} </MessageBox>
            :
           ( <MessageBox variant="danger">Non payée</MessageBox>)
            }
        </div>
    </li>

    <li>
        <div className="card card-body">
            <h2>Les articles à commander</h2>
           
     <ul>{order.orderItems.map((item)=>(
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
      <div>{item.qty} x {item.price}DT = {item.qty * item.price}DT</div>

 </div>  
</li>

))}

    </ul>
        </div>
    </li>
</ul>
            </div>
            <div className="col-1">
<div className = "card card-body">

<ul>
<li><h2>Prix total</h2>
</li>
<li>
<div className="row">
    <div>Prix total des articles</div>
    <div>{order.itemsPrice}DT</div>
</div>
</li>

<li>
<div className="row">
    <div>Prix de livraison</div>
    <div>{order.shippingPrice}DT</div>
</div>

</li>




<li>
<div className="row">
    <div><strong>Prix total</strong></div>
    <div><strong>{order.totalPrice}DT</strong></div>
</div>
</li>

{
!order.isPaid && (
    <li>  {!sdkReady? (<LoadingBox></LoadingBox>): 
        (
        <>
        {errorPay && (<MessageBox variant= "danger"> {errorPay}</MessageBox>)}
        {loadingPay && <LoadingBox> </LoadingBox>}
  
        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>
            
           </> 
            )
    }
    </li>
  
    )
}

{userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Livraiseons
                  </button>
                </li>
              )}

</ul>
</div>
            </div>
        </div>
    )
}
