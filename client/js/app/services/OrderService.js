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