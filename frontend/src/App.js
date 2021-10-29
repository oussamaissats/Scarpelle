import React/*, { useEffect, useState } */ from 'react' ;
import {BrowserRouter , Route , Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen ';
import { signout } from './actions/userActions';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
/*import SellerRoute from './components/SellerRoute';*/
import SellerScreen from './screens/SellerScreen';
//import SearchBox from './components/SearchBox';
//import SearchScreen from './screens/SearchScreen';
import SellerRoute from './components/SellerRoute';
/*import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';*/


function App() {
 const cart = useSelector(state => state.cart)
 const {cartItems} = cart; 
 //const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
 const userSignin = useSelector((state) => state.userSignin);
 const  {userInfo} = userSignin;
 const dispatch = useDispatch();
 const  signoutHandler = () =>{
   dispatch(signout());

 };

 /*const productCategoryList = useSelector((state) => state.productCategoryList);
 const {
   loading: loadingCategories,
   error: errorCategories,
   categories,
 } = productCategoryList;
 useEffect(() => {
   dispatch(listProductCategories());
 }, [dispatch]);*/

  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="row">
  
      <div>
  
          <Link className="brand" to="/">Scarpelle.tn</Link>
      </div>

      

      <div>
         <Link to="/cart">Panier
         {cartItems.length >0 && (
<span className= "badge" >{cartItems.length}</span>


         )}
         
         </Link>
          <i className="fa fa-sign-in" aria-hidden="true"></i> 
          
{
  userInfo ? (
    <div className= "dropdown"> <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i></Link>
    <ul className="dropdown-content">

    <li>
                    <Link to="/profile">Profile</Link>
                  </li>

    <li>
                    <Link to="/orderhistory">Historique</Link>
                  </li>

<li><Link to="#signout" onClick={signoutHandler}>Déconnexion</Link></li>



    </ul>
    
    </div>


  ) :(
    <Link to="/signin">Connexion</Link>  
  )}

{userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}

   {userInfo && userInfo.isAdmin && (
<div className="dropdown">
  <Link to="#admin">
    Administrateur  <i className=" fa fa-caret-down"></i>
    </Link>
    <ul className="dropdown-content">
      <li>
<Link to="/dashboard">Dashbord</Link>
      </li>

      <li>
<Link to="/productlist">Produits</Link>
      </li>

      <li>
<Link to="/orderlist">Commandes</Link>
      </li>

      <li>
<Link to="/userlist">Utlisateurs</Link>
      </li>


    </ul>
</div>

   )}
      </div>
    </header>

   

    <main>
    <Route path="/seller/:id" component={SellerScreen}></Route>
      <Route path="/cart/:id?" component={CartScreen}></Route>
      <Route path="/product/:id" component={ProductScreen}></Route>
      <Route path="/signin" component={SigninScreen}></Route>
      <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <Route path="/shipping" component={ShippingAddressScreen}></Route>
      <Route path="/payment" component={PaymentMethodScreen}></Route>
      <Route path="/placeorder" component={PlaceOrderScreen}></Route>
      <Route path="/order/:id" component={OrderScreen}></Route>
      <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
      
      <Route path="/product/:id" component={ProductScreen} exact></Route>
      <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
     
      <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>

<AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>

          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
<SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          ></SellerRoute>
          <SellerRoute
            path="/orderlist/seller"
            component={OrderListScreen}
          ></SellerRoute>
      <Route path="/" component = {HomeScreen} exact></Route>
 
    </main>
    <footer className="row center">Powered by Oussama Ben Jazia 2021©
    </footer>
  </div>
  </BrowserRouter>
  );

  }
export default App;
