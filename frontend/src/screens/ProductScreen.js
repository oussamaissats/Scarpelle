import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import {useDispatch, useSelector} from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productActions';
export default function ProductScreen(props) {
  const productDetails= useSelector(state => state.productDetails);
  const {loading , error , product} = productDetails;
 const dispatch = useDispatch();
 const productId = props.match.params.id;
 const [qty, setQty] = useState(1);


useEffect(()=>{
dispatch (detailsProduct(productId));

},[dispatch, productId]);


const addToCartHandler = ()  => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
};

   return  (
   
   
    <div>
    {loading? (
    <LoadingBox></LoadingBox>
    ): error? (

    <MessageBox variant="danger">{error}</MessageBox>
  ):(

   <div>
       <Link to="/">Retour</Link>

<div className="row top">

<div className="col-2">
<img className="large" src={product.image} alt={product.name}></img>
</div>
<div className="col-1">
    <ul>
<li><h1>{product.name}</h1></li>
<li><Rating rating={product.rating}></Rating></li>
<li>Prix: {product.price}DT</li>
<li>Description:
    <p>{product.description}</p></li>
    </ul>
</div>
<div className="col-1">
<div className="card card-body">

<ul>

<li>
                    Vendeur{' '}
                    <h2>
                      <Link to={`/seller/${product?.seller?._id}`}>
                        {product?.seller?.name}
                      </Link>
                    </h2>
                    <Rating
                      rating={product?.seller?.rating}
                      numReviews={product?.seller?.numReviews}
                    ></Rating>
                  </li>

<li>
    <div className="row">
<div>Prix:{' '} </div>
<div className="price">{product.price}DT</div>
    </div>

</li>


<li>
    <div className="row">
<div>Etat dans le stock :  </div>
<div >{product.countInStock>0? (<span className="success">Disponible dans le stock</span>):(

<span className="danger">Produit Indisponible dans le stock</span>
)}</div>
    </div>
</li>
{
product.countInStock >0 && (
   <>
   <li>
       <div className="row">
           <div>Quantité</div>
           <div>

            <select  value={qty} onChange={e=> setQty(e.target.value)}
            
            >
{
    [...Array(product.countInStock).keys()].map(
        (x)=>(
        <option key={x+1} value={x+1}>
            {x+1}
            </option>
    )
    )}
    </select>


           </div>
       </div>
   </li>
   <li>
       <button onClick={addToCartHandler} 
       className= "primary block"
       >Ajouter au panier </button>
   </li>  </> 
)
}
</ul>
</div>
</div>
</div>
    </div>
  )}

  </div>
   
   
  );

}
