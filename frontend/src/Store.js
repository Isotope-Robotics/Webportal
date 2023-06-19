import React, { useState, useEffect } from 'react';
import commerce from './lib/Commerce';
import ProductsList from './components/ProductsList';
import './Store.css';



function Store() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        commerce.products.list().then((products) => {
            setProducts(products.data);
        }).catch((error) => {
            console.log('There was an error fetching the products', error)
        });
    }

    return (
        <div className="store-container">
            <ProductsList
                products={products}
            />
        </div>
    )
}



export default Store;
