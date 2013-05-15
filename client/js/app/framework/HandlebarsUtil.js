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
 * app/framework/HandlebarsUtil
 *
 * Utility functions for Handlebars
 *
 * @author Naresh Bhatia
 */
define(
    [
        'handlebars',
        'app/framework/Formatter'
    ],
    function(Handlebars, Formatter) {
        'use strict';

        return {
            registerHelpers: function() {

                // formatMoney
                Handlebars.registerHelper('formatMoney', function(money) {
                    return Formatter.formatMoney(money);
                });

                // formatPercent
                Handlebars.registerHelper('formatPercent', function(percent) {
                    return Formatter.formatPercent(percent);
                });

                // formatDate
                Handlebars.registerHelper('formatDate', function(date) {
                    return Formatter.formatDate(date);
                });

                // formatDateTime
                Handlebars.registerHelper('formatDateTime', function(date) {
                    return Formatter.formatDateTime(date);
                });

            }
        };
    }
);