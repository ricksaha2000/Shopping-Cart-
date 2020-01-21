//create a plugin , $ so that theres no conflict 
//refer https://stackoverflow.com/questions/6454631/jquery-newbie-what-does-jqueryfunction-means/6454949

var shoppingcart = (function ($) {

    "use strict";


    var productsoption = document.querySelector(".products");
    var cartoption = document.querySelector(".shopping-cart-list");
    var productquantity = document.querySelector(".product-quantity");
    var emptycart = document.querySelector(".empty-cart-btn");
    var cartcheckout = document.querySelector(".cart-checkout");
    var totalprice = document.querySelector(".total-price");



    //Product details array
    //JSON format

    var products = [


        {
            id: 0,
            name: "iPhone 6S",
            description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
            imageUrl: "https://drop.ndtv.com/TECH/product_database/images/910201410301AM_635_apple_iphone_6.jpeg?downsize=*:180&output-quality=80",
            price: 79980
    },
        {
            id: 1,
            name: "iPhone 5S",
            description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
            imageUrl: "https://drop.ndtv.com/TECH/product_database/images/910201410301AM_635_apple_iphone_6.jpeg?downsize=*:180&output-quality=80",
            price: 34980
    },
        {
            id: 2,
            name: "Macbook",
            description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
            imageUrl: "https://drop.ndtv.com/TECH/product_database/images/910201410301AM_635_apple_iphone_6.jpeg?downsize=*:180&output-quality=80",
            price: 149900
    },
        {
            id: 3,
            name: "Macbook Air",
            description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
            imageUrl: "https://drop.ndtv.com/TECH/product_database/images/910201410301AM_635_apple_iphone_6.jpeg?downsize=*:180&output-quality=80",
            price: 99999
    },
        {
            id: 4,
            name: "Macbook Air 2013",
            description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
            imageUrl: "https://drop.ndtv.com/TECH/product_database/images/910201410301AM_635_apple_iphone_6.jpeg?downsize=*:180&output-quality=80",
            price: 99999
    },
        {
            id: 5,
            name: "Macbook Air 2012",
            description: "Kogi skateboard tattooed, whatever portland fingerstache coloring book mlkshk leggings flannel dreamcatcher.",
            imageUrl: "https://drop.ndtv.com/TECH/product_database/images/910201410301AM_635_apple_iphone_6.jpeg?downsize=*:180&output-quality=80   ",
            price: 199990
    }

];
    //Initialize an empty array for product in cart
    var productcart = [];


    var createproduct = function () {

        //Loops the whole products array
        products.forEach(function (item) {
            //ES6 template strings
            var product = document.createElement("div");
            product.className = "product";
           
            product.innerHTML = `
    		    <div class="card profile-card-5">
    		        <div class="card-img-block">
    		            <img class="card-img-top" src="${item.imageUrl}" alt="${item.name}">
    		        </div>
                    <div class="card-body pt-0">
                    <h5 class="card-title">${item.name}</h5>

                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div class="product-price"><span>Price:</span> Rs.${item.price} </div>
                    <div class="product-add-to-cart">
                              <a href="#0" class="button see-more">More Details</a>
                              <a href="#0" class="button add-to-cart" data-id=${item.id}>Add to Cart</a>
                            </div>
                  </div>
                </div>
    		</div>
`;






            //Append each created product template in productsoption
            //it is the variable which will actually be displayed

            productsoption.appendChild(product);





        });



    }



    var createcart = function () {

        cartoption.innerHTML = "";

        productcart.forEach(function (item) {

            var li = document.createElement("li");
            li.innerHTML = `${item.quantity} ${item.product.name}    ${item.product.price} --Rs.${item.product.price * item.quantity}`;
            cartoption.appendChild(li);
        });
        productquantity.innerHTML = productcart.length;



        generateCartButtons()


    }



    //Create empty cart and the functionality of all buttons


    var generateCartButtons = function () {


        if (productcart.length > 0) {


            emptycart.style.display = "block";
            cartcheckout.style.display = "block";
            totalprice.innerHTML = "Rs." + calculatePrice();


        } else {


            emptycart.style.display = "none";
            cartcheckout.style.display = "none";


        }





    }



    var setup = function () {




        productsoption.addEventListener("click", function (e) {

            var event = e.target;
            if (event.classList.contains("add-to-cart")) {


                var eventid = event.dataset.id;
                addToCart(eventid);





            }



        });



        emptycart.addEventListener("click", function (e) {


            if (confirm("Are you Sure?")) {

                productcart = [];
            }
            createcart();




        });

    }


    var addToCart = function (id) {

        var obj = products[id];
        if (productcart.length === 0 || productFound(obj.id) === undefined) {
            productcart.push({
                product: obj,
                quantity: 1
            })

        } else {


            productcart.forEach(function (item) {

                if (item.product.id === obj.id) {
                    item.quantity++;
                }

            });
        }

        createcart();



    }



    var productFound = function (productid) {


        return productcart.find(function (item) {
            return item.product.id === productid;
        });


    }

    var calculatePrice = function () {
        return productcart.reduce(function (total, item) {

            return total + (item.product.price * item.quantity);
        }, 0);
    }

    // This functon starts the whole application
    var init = function () {
        createproduct();
        setup();
    }

    // Exposes just init function to public, everything else is private
    return {
        init: init
    };

    // I have included jQuery although I haven't used it
})(jQuery);

shoppingcart.init();
