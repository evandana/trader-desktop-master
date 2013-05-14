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
        'text!app/widgets/orders/OrderActionsTemplate.html'
    ],
    function(Repository, OrderService, Backbone, BaseView, OrderActionsTemplate) {
        'use strict';

        return BaseView.extend({
            tagName: 'section',
            id: 'order-actions',

            template: {
                name: 'OrderActionsTemplate',
                source: OrderActionsTemplate
            },

            events: {
                'click .js-trade': 'trade',
                'click .js-deleteAll': 'deleteAll',
                'click .js-refresh': 'getOrders',

                // TODO: delete
                'click .js-addOrder': 'addOrder',
                'click .js-placeOrder': 'placeOrder',
                'click .js-getOrders': 'getOrders'
            },

            initialize: function() {
                this.model.on('change', this.render, this);
            },

            constructor: function() {
                this.children = {};

                // Call super
                Backbone.View.apply( this, arguments );

//                this.addOrder();
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
                Repository.getOrders();
            },

            addOrder: function () {
                var data = {
                    'side': 'Buy',
                    'symbol': 'AAPL',
                    'quantity': 10000,
                    'limitPrice': 426.24,
                    'traderId': 'AM'
                };

                var that = this;
                $.ajax({
                    url: 'http://localhost:8080/rest/orders',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: function () {
                        that.render();
                    }
                });
            },

            trade: function () {
//                $( '#multi-trade-dialog' ).show();
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