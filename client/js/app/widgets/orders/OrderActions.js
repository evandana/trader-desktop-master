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
        'text!app/widgets/orders/OrderActionsTemplate.html'
    ],
    function(Repository, OrderService, OrderTable, Backbone, BaseView, OrderActionsTemplate) {
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

                'click .js-chart': 'viewChart',
                'click .js-table': 'viewTable'
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
                OrderService.numberOfOrder(3, Repository.getloggedInUser().attributes.id);
            },

            deleteAll: function () {
                $.ajax({
                    url: 'http://localhost:8080/rest/orders',
                    type: 'DELETE'
                });
            },

            refreshOrders: function () {
                Repository.refreshOrders();
            }
        });
    }
);