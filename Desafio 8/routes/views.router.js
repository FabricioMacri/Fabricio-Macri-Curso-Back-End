const express = require("express");
const router = express.Router(); 

const ProductsModel = require('../Dao/models/products.model.js');

router.get('/chat', (req, res) => {
   res.render('chat');
})

router.get("/allProducts",  async (req, res) => {
   try {
      const products = await ProductsModel.find().lean();
      res.render("home", {products});
   } catch (error) {
      console.log("Error: " + error)
      res.status(500).json({error: "Error interno del servidor"})
   }
})

router.get("/products", async (req, res) => {

   const query = req.query.query;
   const sort = req.query.sort;
   const page = req.query.page || 1; 
   let limit = 9;

   try {
       
      const data = await ProductsModel.paginate({}, {limit, page});

      let products = data.docs.map(el => {
         const {...rest} = el.toObject();
         return rest;
      });
      if(query) {
         products = products.filter((el) => el.category == query);
      }
      if(sort == 'ASC') {
         query.sort([['category', 'asc']]);
      }
      if(sort == 'DESC') {
         query.sort([['category', 'desc']]);
      }
      res.render("home", {
         products,
         status:"success",
         payload: data.totalDocs,
         hasPrevPage: data.hasPrevPage,
         hasNextPage: data.hasNextPage,
         prevPage: data.prevPage,
         nextPage: data.nextPage,
         currentPage: data.page,
         totalPages: data.totalPages
      });
       
   } catch (error) {
      console.log("Error: " + error)
      res.status(500).send("Todo marcha, volve a intentar");
   }
})

router.get("/login", (req, res) => {
   res.render("login"); 
})

router.get("/register", (req, res) => {
   res.render("register");
})

router.get("/profile", (req, res) => {
   res.render("profile");
})


module.exports = router; 