import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import {isInCart} from '../../Helpers'
import { ProductsContext } from '../../context/ProductsContext';
import Layout from '../shared/Layout';
import './singleproduct.style.scss';



const SingleProduct = ({ match, history:  { push } }) => {
    
    const { products } = useContext(ProductsContext);
    const {addProduct, cartItems, increase} = useContext(CartContext)
    const { id } = match.params;
    const [product, setProduct] = useState(null);
    const itemInCart = isInCart(product, cartItems);

    useEffect(() => {
        const product = products.find(item => Number(item.id) === Number(id));

        if (!product) {
            return push('/shop');
        }

        setProduct(product)
    }, [products, id, push]);

    if (!product) { return null };
    
    const { imageURL, title, price, description } = product;
    
    return (
        <Layout>
            <div className='single-product-container'>   
                <div className='product-image'>
                    <img src={imageURL} alt="product"/>
                </div>
                <div className='product-details'>
                    <div className='product-price'>
                        <h3>{title}</h3>
                        <p>${price}</p>
                    </div>
                    <div className='add-to-cart-btn'>
                        
                        {
                            !itemInCart &&
                            <button
                                className='button is-white nomad-btn'
                                id='btn-white-outline'
                                onClick={() => addProduct(product)}
                                >
                                ADD TO CART
                            </button> 
                        }

                        {
                            itemInCart &&
                            <button
                                className='button is-white nomad-btn'
                                id='btn-white-outline'
                                onClick={() => increase(product)}>
                                ADD MORE
                            </button>
                        }

                        <button
                            className='button is-black nomad-btn'
                            id='btn-white-outline'>
                            PROCEED TO CHECKOUT
                        </button>
                    </div>

                    <div className='product-description'>
                        <p>
                            {description}
                        </p>
                    </div>
                </div>
            </div>      
        </Layout>
       
    )
}

export default withRouter (SingleProduct);
