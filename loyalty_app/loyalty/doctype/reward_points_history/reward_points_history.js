// Copyright (c) 2018, Loyalty and contributors
// For license information, please see license.txt

frappe.ui.form.on('Reward Points History', {
	refresh: function(frm) {

	},
	onload: function(frm){
		console.log(frm.doc.user)
		cur_frm.disable_save();
			frappe.call({
				method: "frappe.client.get_list",
				args: {
					doctype: "Reward Point",
					filters: [["user", "=", frm.doc.user]],
					// fields: ["productid","qr_code","productname","points","status","creation","advertisement","reward_points"],
					fields: ["status","creation","advertisement","reward_points"],
					
					limit_page_length: null
				},
				callback: function(r) {
					console.log(r.message)
				   for(var e=0; e<r.message.length; e++){
						frappe.model.add_child(cur_frm.doc, "Reward List", "history");  
				        $.each(frm.doc.history || [], function(e, v) {
					        // frappe.model.set_value(v.doctype, v.name, "productid", r.message[e].productid)
					        // frappe.model.set_value(v.doctype, v.name, "qr_code", r.message[e].qr_code)
					        // frappe.model.set_value(v.doctype, v.name, "productname", r.message[e].productname)
					        // frappe.model.set_value(v.doctype, v.name, "points", r.message[e].points)
					        frappe.model.set_value(v.doctype, v.name, "status", r.message[e].status)
					        frappe.model.set_value(v.doctype, v.name, "date_added", r.message[e].creation)
					        frappe.model.set_value(v.doctype, v.name, "advertisements", r.message[e].advertisement)
					        frappe.model.set_value(v.doctype, v.name, "reward_points", r.message[e].reward_points)
				        })
				        frm.refresh_field("history");			
					}
				}
			});
			$('.grid-buttons').parent().hide();
			
	},
});

frappe.ui.form.on("Reward List", "form_render", function(frm, cdt, cdn){

	$('.grid-insert-row-below').hide();
	$('.grid-insert-row').hide();
	$('.grid-delete-row').hide();
	$('.grid-append-row').hide();
});
