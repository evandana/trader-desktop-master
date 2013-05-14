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
                'click .js-refresh': 'getOrders',

                // TODO: delete
                'click .js-addOrder': 'addOrder',
                'click .js-placeOrder': 'placeOrder',
                'click .js-getOrders': 'getOrders'
            },

            initialize: function() {
                this.model.on('change', this.render, this);
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
            }
        });
    }
);