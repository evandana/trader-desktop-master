/**
 * Copyright 2013 Archfirst
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * app/widgets/orders/OrdersWidget
 *
 * @author Naresh Bhatia
 */
define(
    [
        'app/domain/Repository',
        'app/services/OrderService',
        'backbone',
        'keel/BaseView',
        'text!app/widgets/orders/OrdersTemplate.html'
    ],
    function(Repository, OrderService, Backbone, BaseView, OrdersTemplate) {
        'use strict';

        return BaseView.extend({
            tagName: 'section',
            id: 'order-table',

            elements: ['orderTable'],

            template: {
                name: 'OrdersTemplate',
                source: OrdersTemplate
            },

            events: {
                'click .js-trade': 'trade',
                'click .js-deleteAll': 'deleteAll',
                'click .js-refresh': 'render',

                // TODO: delete
                'click .js-addOrder': 'addOrder',
                'click .js-placeOrder': 'placeOrder',
                'click .js-getOrders': 'getOrders'
            },

            initialize: function() {
                this.model.on('change', function () {
                    this.model = Repository.fetchOrders().toJSON();
                    this.render();
                }, this);
                $('#multi-trade-dialog').hide();
            },

            constructor: function() {
                this.children = {};

                // Call super
                Backbone.View.apply( this, arguments );

                this.addOrder();
            },

            render: function() {

                var template = this.getTemplate();
                var context = this.model.toJSON();

                // Destroy existing children
                this.destroyChildren();

                this.$el.html(template({orders: context}));
                this._setupElements();

                return this;
            },

            getOrders: function () {
                this.$el.html($.get('rest/orders'));
            },

            addOrder: function () {
                var data = {
                    'side': 'Buy',
                    'symbol': 'AAPL',
                    'quantity': 10000,
                    'limitPrice': 426.24,
                    'traderId': 'AM'
                };


//                OrderService.createOrder(data, Backbone.history.navigate('/order-table'));
//                OrderService.createOrder(data);

//                $.fn.serializeObject = function () {
//                    var o = {};
//                    var a = this.serializeArray();
//                    $.each(a, function () {
//                        if (o[this.name] !== undefined) {
//                            if (!o[this.name].push) {
//                                o[this.name] = [o[this.name]];
//                            }
//                            o[this.name].push(this.value || '');
//                        } else {
//                            o[this.name] = this.value || '';
//                        }
//                    });
//                    return o;
//                };

//                var orderDetails = $(event.currentTarget).serializeObject();
//                var order = new Order();
//                order.save(data, {
//                    success: function () {
//                        Backbone.history.navigate('', {trigger: true});
//                    }
//                });
//                return false;

                $.post(this.model.url, data);
            },

            trade: function () {
                $( '#multi-trade-dialog' ).show();
            },

            placeOrder: function() {
//                    $('#orderTable').setAttribute('style', 'border:1px solid #f00;');
//                console.log('called: placeOrder()');
//                var loggedInUserId = this.userSelectorElement.val();
//                Repository.setloggedInUser(loggedInUserId);
//                Backbone.history.navigate('order-table', true);
                    return false;
                }
        });
    }
);