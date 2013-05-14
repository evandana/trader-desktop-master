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
        'app/widgets/orders/OrderTable',
        'backbone',
        'keel/BaseView',
        'text!app/widgets/orders/OrderActionsTemplate.html',
        'underscore'
    ],
    function(Repository, OrderService, OrderTable, Backbone, BaseView, OrderActionsTemplate, _) {
        'use strict';

        return BaseView.extend({
            tagName: 'section',
            id: 'order-actions',
            // collection, user

            template: {
                name: 'OrderActionsTemplate',
                source: OrderActionsTemplate
            },

            events: {
                'click .js-trade': 'trade',
                'click .js-deleteAll': 'deleteAll',
                'click .js-refresh': 'refreshOrders',

                'click .js-chart': 'viewTable',
                'click .js-table': 'viewTable'
            },

            initialize: function() {
                this.collection.on('change', this.render, this);
            },

            constructor: function() {
                this.children = {};

                // Call super
                Backbone.View.apply( this, arguments );

//                this.addOrder();
            },

            viewChart: function () {
//                alert('to be implemented');
            },
            viewTable: function () {
//                alert('to be implemented');
            },

            render: function() {
                var template = this.getTemplate();
//                var context = this.collection.toJSON();

                // Destroy existing children
                this.destroyChildren();

                this.$el.html(template());
                this._setupElements();

                return this;
            },

            trade: function () {
                for (var i = 0; i<3; i++) {
                    this.addOrder();
                }
            },

            deleteAll: function () {
                $.ajax({
                    url: 'http://localhost:8080/rest/orders',
                    type: 'DELETE',
                    success: function () {

                    }
                });
            },

            refreshOrders: function () {
                Repository.refreshOrders();
            },

            addOrder: function () {
                var that = this;

                var data = {
                    'side': 'Buy',
                    'symbol': Repository.getInstruments().at(_.random(0,Repository.getInstruments().length)).attributes.symbol,
                    'quantity': _.random(1,50)*1000,
                    'limitPrice': _.random(10000,100000)/100,
                    'traderId': Repository.getloggedInUser().attributes.id
                };

                $.ajax({
                    url: 'http://localhost:8080/rest/orders',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: function () {
//                        console.log('order created: ', data);
                        that.render();
                    }
                });
            }
        });
    }
);