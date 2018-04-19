// Copyright (c) 2018, Loyalty and contributors
// For license information, please see license.txt

frappe.ui.form.on('Redeem Orders', {
	refresh: function(frm) {

	}
});
frappe.ui.form.on("Product_list", {
	amount: function(frm) {
		var total_amount = 0;
		var total_points=0;
		for(var i=0;i<frm.doc.products.length;i++) {
			total_amount += parseInt(frm.doc.products[i].amount) * parseInt(frm.doc.products[i].quantity);;
			total_points += parseInt(frm.doc.products[i].points);
		}
		frm.set_value("amount", total_amount);
		frm.set_value("total_points", total_points);
	}
});
