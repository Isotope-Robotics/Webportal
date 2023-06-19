import React, { Component } from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../Store.css';

const ProductItem = ({ product }) => {
    const { stripHtml } = require("string-strip-html");
    const { result } = stripHtml(product.description);

    return (

        <>
            <Card className="card" style={{ width: '18rem' }}>
                <Card.Img src={product.image?.url} alt={product.name} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{result}</Card.Text>
                    <Card.Text>{product.price.formatted_with_symbol}</Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>

        </>



    );
};

ProductItem.propTypes = {
    product: PropTypes.object,
};

export default ProductItem;
