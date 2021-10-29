import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import Axios from 'axios';

export default function ProductEditScreen(props) {
    
    const ProductId = props.match.params.id; 
const [name, setName] = useState('') ;
const [price, setPrice] = useState('') ;
const [image, setImage] = useState('') ;
const [category, setCategory] = useState('') ;
const [countInStock, setCountInStock] = useState('') ;
const [brand, setBrand] = useState('') ;
const [description, setDescription] = useState('') ;


const productDetails = useSelector((state) => state.productDetails);
const { loading, error, product } = productDetails;

const productUpdate = useSelector((state) => state.productUpdate);
const {
  loading: loadingUpdate,
  error: errorUpdate,
  success: successUpdate,
} = productUpdate;

 const dispatch = useDispatch(ProductId);
 useEffect(() => {


    if (successUpdate) {
        props.history.push('/productlist');
      }
      if (!product || product._id !== ProductId || successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });

dispatch(detailsProduct(ProductId)) ;
} else {
setName (product.name);
setPrice(product.price);
setImage(product.image);
setCategory(product.category);
setCountInStock(product.countInStock);
setBrand(product.brand);
setDescription(product.description);
}
 }, [product, dispatch, ProductId, successUpdate, props.history]); ; 
 const submitHandler = (e) => {
e.preventDefault();
//todo dispatch update product
dispatch(
    updateProduct({
      _id: ProductId,
      name,
      price,
      image,
      category,
      brand,
      countInStock,
      description,
    })
  );
 };

 const [loadingUpload, setLoadingUpload] = useState(false);
 const [errorUpload, setErrorUpload] = useState('');

 const userSignin = useSelector((state) => state.userSignin);
 const { userInfo } = userSignin;
 const uploadFileHandler = async (e) => {
   const file = e.target.files[0];
   const bodyFormData = new FormData();
   bodyFormData.append('image', file);
   setLoadingUpload(true);
   try {
     const { data } = await Axios.post('/api/uploads', bodyFormData, {
       headers: {
         'Content-Type': 'multipart/form-data',
         Authorization: `Bearer ${userInfo.token}`,
       },
     });
     setImage(data);
     setLoadingUpload(false);
   } catch (error) {
     setErrorUpload(error.message);
     setLoadingUpload(false);
   }
 };
    
    return (
        <div>
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Modifier produit {ProductId}</h1>
          </div>
          {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <div>
                <label htmlFor="name">Nom</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
             
             
              <div>
                <label htmlFor="price">Prix</label>
                <input
                  id="price"
                  type="text"
                  placeholder="Prix"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
              
              
              <div>
                <label htmlFor="image">Photo</label>
                <input
                  id="image"
                  type="text"
                  placeholder="Photo"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                </div>
                

                <div>
              <label htmlFor="imageFile">Image </label>
              <input
                type="file"
                id="imageFile"
                label="Choisir Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>

           
              <div>
                <label htmlFor="category">Catégorie</label>
                <input
                  id="category"
                  type="text"
                  placeholder="Catégorie"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="brand">Marque</label>
                <input
                  id="brand"
                  type="text"
                  placeholder="Marque"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="countInStock">Quantité dans le stock</label>
                <input
                  id="countInStock"
                  type="text"
                  placeholder="Quantité dans le stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows="3"
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label></label>
                <button className="primary" type="submit">
                  Update
                </button>
              </div>
            </>
          )}
        </form>

        </div>
    );
}
