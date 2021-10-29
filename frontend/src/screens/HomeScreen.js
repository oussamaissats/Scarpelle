import React, { useEffect } from 'react'
import Product from '../components/Product';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import {useSelector , useDispatch} from 'react-redux' ; 
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';


export default function HomeScreen() {
 const dispatch = useDispatch();
const productList = useSelector(state => state.productList);
const {loading , error , products } = productList;

const userTopSellersList = useSelector((state) => state.userTopSellersList);
const {
  loading: loadingSellers,
  error: errorSellers,
  users: sellers,
} = userTopSellersList;


  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  },[dispatch] );

    return  (

      
    <div>
      <h2>Meilleurs vendeurs</h2>
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>Aucun vendeur</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )}
      <h2>Les meilleurs produits</h2>
      {loading? (
      <LoadingBox></LoadingBox>
      ): error? (

      <MessageBox variant="danger">{error}</MessageBox>
    ):(

    <div className="row center">
      
      {products?.map((product) => (

     
<Product key={product._id} product={product}></Product>


))}   
      </div>

    )}

    </div>
    );

}