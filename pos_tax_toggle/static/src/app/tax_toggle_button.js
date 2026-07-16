/** @odoo-module */

import { Component } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/hooks/pos_hook";
import { ControlButtons } from "@point_of_sale/app/screens/product_screen/control_buttons/control_buttons";

export class TaxToggleModeButton extends Component {
    static template = "RAK.TaxToggleModeButton";
    static props = {
        class: { type: String, optional: true },
    };

    setup() {
        this.pos = usePos();
        if (this.pos.config.manual_price_tax_included === undefined) {
            this.pos.config.manual_price_tax_included = true;
        }
    }

    onClick() {
        const wasIncluded = this.pos.config.manual_price_tax_included;
        const order = this.pos.getOrder();
        let selectedLine = null;
        let currentTargetPrice = null;

        if (order) {
            selectedLine = order.getSelectedOrderline();
            if (selectedLine) {
                // Fetch the original price inputted to avoid discounting it multiple times
                currentTargetPrice = selectedLine.original_input_price !== undefined 
                                     ? selectedLine.original_input_price 
                                     : selectedLine.price_unit;
            }
        }

        // Toggle the global state
        this.pos.config.manual_price_tax_included = !wasIncluded;

        // Re-apply the price to the selected line to recalculate taxes
        if (selectedLine && currentTargetPrice !== null) {
            selectedLine.setUnitPrice(currentTargetPrice);
        }
    }
}

import { patch } from "@web/core/utils/patch";

// Add the component so it can be used in the ControlButtons template
patch(ControlButtons, {
    components: {
        ...ControlButtons.components,
        TaxToggleModeButton,
    },
});
