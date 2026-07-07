# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'POS Tax toggler',
    'version': '1.0',
    'category': 'Sales/Point of Sale',
    'summary': 'Toggle between tax-included and tax-excluded manual prices instantly',
    'description': """
POS Tax Toggler
===============
Instantly switch between Tax Included and Tax Excluded calculations for manual price entries in the Point of Sale.
    """,
    'author': 'Odoocrafts Innovations',
    'website': 'https://odoocrafts.com',
    'price': 25.0,
    'currency': 'USD',
    'license': 'OPL-1',
    'images': ['static/description/banner.png'],
    'depends': ['point_of_sale'],
    'data': [],
    'assets': {
        'point_of_sale._assets_pos': [
            'pos_tax_toggle/static/src/app/pos_order_line.js',
            'pos_tax_toggle/static/src/app/tax_toggle_button.xml',
            'pos_tax_toggle/static/src/app/tax_toggle_button.js',
        ],
    },
    'installable': True,
    'application': False,
}
