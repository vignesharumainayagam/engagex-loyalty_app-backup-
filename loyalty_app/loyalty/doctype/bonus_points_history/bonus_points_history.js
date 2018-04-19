// Copyright (c) 2018, Loyalty and contributors
// For license information, please see license.txt

frappe.ui.form.on('Bonus Points History', {
	refresh: function(frm) {

	},
	onload: function(frm){
		console.log(frm.doc.customer)
		cur_frm.disable_save();
			frappe.call({
				method: "frappe.client.get_list",
				args: {
					doctype: "Bonus Points",
					filters: [["customer", "=", frm.doc.customer]],
					fields: ["quiz_id","quiz_name","points","status","creation"],
					limit_page_length: null
				},
				callback: function(r) {
					console.log(r.message)
				   for(var e=0; e<r.message.length; e++){
						frappe.model.add_child(cur_frm.doc, "Bonus List", "history");  
				        $.each(frm.doc.history || [], function(e, v) {
					        frappe.model.set_value(v.doctype, v.name, "quiz_id", r.message[e].quiz_id)
					        frappe.model.set_value(v.doctype, v.name, "quiz_name", r.message[e].quiz_name)
					        frappe.model.set_value(v.doctype, v.name, "points", r.message[e].points)
					        frappe.model.set_value(v.doctype, v.name, "status", r.message[e].status)
					        frappe.model.set_value(v.doctype, v.name, "date_added", r.message[e].creation)
				        })
				        frm.refresh_field("history");			
					}
				}
			});
			$('.grid-buttons').parent().hide();
	},
});
frappe.ui.form.on("Bonus List", "form_render", function(frm, cdt, cdn){

	$('.grid-insert-row-below').hide();
	$('.grid-insert-row').hide();
	$('.grid-delete-row').hide();
	$('.grid-append-row').hide();
});

