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
 * app/widgets/orders/OrderTable
 *
 * @author Naresh Bhatia
 */
define(
    [
        'app/domain/Repository',
        'app/services/OrderService',
        'app/widgets/orders/OrderRow',
        'backbone',
        'keel/BaseView',
        'text!app/widgets/orders/OrderTableTemplate.html'
    ],
    function(Repository, OrderService, OrderRow, Backbone, BaseView, OrderTableTemplate) {
        'use strict';

        return BaseView.extend({

            tagName: 'table',
            id: 'order-table',
            className: 'js-orderTable',

            template: {
                name: 'OrderTable',
                source: OrderTableTemplate
            },

            initialize: function() {
                this.collection.on('add', this.renderRow, this);
                this.collection.on('delete', this.render, this);
//                this.collection.on('change', this.render, this);
//                this.collection.on('reset', this.render, this);
//                this.collection.on('sync', this.render, this);
            },

            constructor: function() {
                this.children = {};

                // Call super
                Backbone.View.apply( this, arguments );
            },

            postRender: function() {
                this.collection.each(function(order) {
                    this.renderRow(order);
                }, this);
            },

            renderRow: function (order) {
                var orderId = 'order-' + order.get('id');
                this.addChild({
                    id: orderId,
                    viewClass: OrderRow,
                    parentElement: this.$el,
                    options: {
                        model: order,
                        id: orderId,
                        className: (order.get('status') === 'Canceled') ? 'canceled' : ''
                    }
                });
            }


        });
    }
);