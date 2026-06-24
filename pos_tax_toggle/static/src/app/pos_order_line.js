/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { PosOrderline } from "@point_of_sale/app/models/pos_order_line";
import { accountTaxHelpers } from "@account/helpers/account_tax";
import { parseFloat } from "@web/views/fields/parsers";

patch(PosOrderline.prototype, {
    setUnitPrice(price) {
        if (this.config.manual_price_tax_included === undefined) {
            this.config.manual_price_tax_included = true;
        }

        if (this.config.manual_price_tax_included) {
            const tax_ids = this.tax_ids;
            if (tax_ids && tax_ids.length > 0) {
                const priceStr = price !== undefined && price !== null ? price.toString() : "0";
                const targetPrice = parseFloat(priceStr);
                if (!isNaN(targetPrice)) {
                    const company = this.company;
                    const companyRoundingMethod = company && company.tax_calculation_rounding_method 
                        ? company.tax_calculation_rounding_method 
                        : "round_globally";
                    
                    const taxes_computation = accountTaxHelpers.get_tax_details(
                        tax_ids,
                        targetPrice,
                        1.0,
                        {
                            rounding_method: companyRoundingMethod,
                            product: this.product_id,
                            special_mode: "total_included",
                            precision_rounding: Math.pow(10, -this.currency.decimal_places),
                        }
                    );
                    
                    // Update price to be the base price (tax excluded)
                    price = taxes_computation.total_excluded;
                }
            }
        }
        return super.setUnitPrice(price);
    }
});
