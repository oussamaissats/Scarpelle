
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer,  orderDeleteReducer,  orderDeliverReducer,  orderDetailsReducer, orderListReducer, orderMineListReducer, orderPayReducer } from './reducers/orderReducers';
import { /*productCategoryListReducer , */ productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer } from './reducers/productReducers';
import { userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userTopSellerListReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducer';
import { productCreateReducer} from './reducers/productReducers';
const initialState = {

    userSignin : {
        userInfo : localStorage.getItem('userInfo') 
        ?  JSON.parse(localStorage.getItem('userInfo')
        ): null,

    },
    cart: {
    cartItems: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [],
shippingAddress: localStorage.getItem('shippingAddress')
?JSON.parse(localStorage.getItem('shippingAddress'))
 : {},
 PaymentMethod:'PayPal',

},
};
const reducer = combineReducers({
productList : productListReducer,
productDetails : productDetailsReducer,
cart:  cartReducer,
userSignin: userSigninReducer , 
userRegister: userRegisterReducer,
orderCreate : orderCreateReducer,
orderDetails : orderDetailsReducer, 
orderPay: orderPayReducer, 
orderMineList: orderMineListReducer, 
userDetails: userDetailsReducer, 
userUpdateProfile: userUpdateProfileReducer,
userUpdate: userUpdateReducer,
productCreate: productCreateReducer,
productUpdate: productUpdateReducer,
productDelete: productDeleteReducer,
orderList: orderListReducer,
orderDelete: orderDeleteReducer,
orderDeliver: orderDeliverReducer,
userList: userListReducer,
userDelete: userDeleteReducer,
userTopSellersList: userTopSellerListReducer,
//productCategoryList: productCategoryListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, 
    initialState ,
    composeEnhancer(applyMiddleware(thunk))
    );

export default store ; 
