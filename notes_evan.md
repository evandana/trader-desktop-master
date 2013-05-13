# Notes

## Setup
1. Installing `grunt`: needed to use `sudo`

    `$ npm install -g grunt-cli`

2. Using Ruby version 1.9.3

    `ruby 1.9.3p374 (2013-01-15 revision 38858) [x86_64-darwin12.2.1]`

## Helpful Links
* [RESTful and Require.js Tutorial](http://verekia.com/requirejs/build-simple-client-side-mvc-app-require-js)
* [Require.js](http://requirejs.org/docs/api.html)
* [Domain Driven Design Tackling Complexity in the Heart of Software (book as PDF)](http://www.daem0n.org/stuff/domain-driven-design-tackling-complexity-in-the-heart-of-software.9780321125217.24620.pdf)
* [Node.js examples](http://www.slideshare.net/gabriele.lana/nodejs-explained-with-examples)


Questions
1. How do I persist the same model (logged in user) across pages?
2. How do I save the model so it triggers correctly?
3. How do I create the simple jQuery IU dialog box?



Mehmet Demirel: (3:09 PM)
Lets start with one question at a time
Mehmet Demirel: (3:09 PM)
what is the first problem you are running in
Evan Dana: (3:11 PM)
I have created the widgets for header and orders-table and can load a table with the orders. I made a crude button to create an order with $.post(url, data). if i create a few orders, then go back to the index, then login, i can see the table display all the orders. however, without going through that process the Repository doesn't have all the latest orders.
Evan Dana: (3:12 PM)
I think my question is that I can't access the up to date Repository of orders. Am I not saving it correctly with the model or should I be passing in something when I move from index to order-table?
Mehmet Demirel: (3:12 PM)
Repository starts from scratch every time you start the server
Mehmet Demirel: (3:13 PM)
data gets saved as long as the server is running
Evan Dana: (3:14 PM)
Yup. That all makes sense, but I'm having trouble accessing the updated information
Evan Dana: (3:15 PM)
I tried creating an update function that uses this.$el.html($.get('rest/orders'));
Mehmet Demirel: (3:16 PM)
Repository.getOrders();
Mehmet Demirel: (3:16 PM)
this function will get you the latest orders
Mehmet Demirel: (3:17 PM)
try and see what data it returns to you
Mehmet Demirel: (3:20 PM)
if you get an error make sure you are defining repository in the define folder
Mehmet Demirel: (3:20 PM)
not folder
Mehmet Demirel: (3:20 PM)
on top of the file you are calling repository
Evan Dana: (3:21 PM)
yeah, it's returning an empty array even though I've created some orders
Evan Dana: (3:21 PM)
and i have defined Repository
Evan Dana: (3:21 PM)
I can access Repository.getOrders()
Evan Dana: (3:21 PM)
is $.post(url, data) the right way to create a new order?
Mehmet Demirel: (3:22 PM)
wait
Mehmet Demirel: (3:24 PM)
this is my function 
Mehmet Demirel: (3:24 PM)
createOrder: function(orderRequest) {
            $.ajax({
                url: _url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(orderRequest)
            });
        },
Mehmet Demirel: (3:25 PM)
which is located inside a service.js file
Mehmet Demirel: (3:25 PM)
which is triggered by a click from the trade window
Mehmet Demirel: (3:26 PM)
Sorry if I am confusing you
Evan Dana: (3:26 PM)
did you create the service.js file?
Mehmet Demirel: (3:26 PM)
define( [ 'app/domain/Repository', 'backbone', 'keel/BaseView', 'text!app/widgets/dialog-box/TradeDialogWindowTemplate.html', 'app/services/OrderService' ], function( Repository, Backbone, BaseView, TradeDialogTemplate, OrderService ) { 'use strict'; return BaseView.extend({ tagName: 'div', id: 'trade-dialog-box', template: { name: 'TradeDialogTemplate', source: TradeDialogTemplate }, events: { 'click #createTrades': 'tradeClick' }, tradeClick: function(e) { e.preventDefault(); var orderNumber = $('input[id=tradeNum]').val(); var trader = this.model.attributes.id; OrderService.numberOfOrder(orderNumber, trader); this.destroy(); return false; } }); } );
Evan Dana: (3:29 PM)
… let me try that createOrder function
Mehmet Demirel: (3:30 PM)
disregard the lines of functions I sent you
Mehmet Demirel: (3:30 PM)
wrong file I copied
Mehmet Demirel: (3:30 PM)
services js file is the following
Mehmet Demirel: (3:30 PM)
define(['app/domain/Repository'],
       function(Repository) {
    'use strict';

    // Module level variables act as singletons
    var _url = 'http://localhost:8080/rest/orders';

    return {

        numberOfOrder: function(orderNum, traderId) {

            var instruments = Repository.getInstruments();

            for (var i=0; i<orderNum; i++) {
                var number =  Math.floor(Math.random() * 29);
                var quantityNumber = 1 + Math.floor(Math.random() * 50000);
                var symbol = instruments.at(number).get('symbol');
                var price = instruments.at(number).get('lastTrade');
                var data = { 'side': 'Buy', 'symbol': symbol, 'quantity': quantityNumber, 'limitPrice': price, 'traderId': traderId };

                this.createOrder(data);
            }

        },

        createOrder: function(orderRequest) {
            $.ajax({
                url: _url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(orderRequest)
            });
        },

        deleteOrders: function() {
            $.ajax({
                url: _url,
                type: 'DELETE'
            });
        }

    };
});
Evan Dana: (3:31 PM)
where did you save that file? (i'm going to try just the createOrder function in my ordersWidget first to make sure I can access the right vars)
Mehmet Demirel: (3:32 PM)
services folder in the app directory
Mehmet Demirel: (3:33 PM)
You are right with creating the function first
Mehmet Demirel: (3:33 PM)
let me know what happens
Evan Dana: (3:34 PM)
i'm still getting a null array with getOrders
Mehmet Demirel: (3:35 PM)
I think you are not passing in the correct data to rest/orders
Mehmet Demirel: (3:36 PM)
same thing happened to me
Evan Dana: (3:36 PM)
well, if i go back to the index and then re-login, i see the orders
Mehmet Demirel: (3:36 PM)
so it is working
Mehmet Demirel: (3:37 PM)
I think you are calling the function before it gets updated
Evan Dana: (3:38 PM)
hmmm
Mehmet Demirel: (3:38 PM)
I have to use setTimeout for the chart section to get the latest updated data
Mehmet Demirel: (3:39 PM)
try a setTimeout and see if the data is refreshed after 1-2 seconds
Evan Dana: (3:39 PM)
just a second, i'm going to transfer my data from my personal laptop to this one so i can copy/paste easier
Evan Dana: (3:49 PM)
doing a restart
