const express = require('express');
const path = require('path');
const router = express.Router();

const products =[];

// /admin/add-product=> GET request
router.get('/add-product', (req,res,next) => {
    res.render('add-product', {pagetitle: 'Add Product', path: '/admin/add-product'});
});

// /admin/add-product=> POST request
router.post('/add-product', (req,res,next)=>{
    products.push({title: req.body.title});
    res.redirect('/');
})

exports.route = router;
exports.products = products;