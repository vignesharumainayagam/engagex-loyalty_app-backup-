// Copyright (c) 2018, Loyalty and contributors
// For license information, please see license.txt

frappe.ui.form.on('Scholarship', {
	refresh: function(frm) {

	},
	onload: function(frm) {

		 if(frm.doc.user){
      
			frappe.call({
				method: "loyalty_app.loyalty.api.get_scholarship_exams",
				args: {
					"scholarship": frm.doc.names
				},
				callback: function(r) {
					// console.log(r.message)
					if (r.message) {	
						
						$.each(r.message, function(i, d) {
							var row = frappe.model.add_child(frm.doc, "Scholarship Exams", "scholar_exam");
							console.log(d.counts.length)
							var m=d.counts.length
							console.log(d)
							row.exam_name = d.name;
							row.attendees = m;
					
						});
						
					}
					refresh_field("scholar_exam");
				}
			});
		}
	}
	// offer: function(frm) {
	// 		alert(frm.doc.academic_year)
	// 	frm.set_value("offer" ,"");
	// 	if (frm.doc.academic_year) {
	// 		console.log(frm.doc.academic_year)
	// 		frappe.call({
	// 			method: "loyalty_app.loyalty.api.get_offers",
	// 			args: {
	// 				"academic_year": frm.doc.academic_year
	// 			},
	// 			callback: function(r) {
	// 				if (r.message) {
	// 					alert(r.message)
	// 					$.each(r.message, function(i, d) {
	// 						var row = frappe.model.add_child(frm.doc, "Offers", "offer");
	// 						row.from_mark = d.from_mark;
	// 						row.to_mark = d.to_mark;
	// 						row.scholarship = d.scholarship;
	// 					});
	// 				}
	// 				refresh_field("offer");
	// 				// frm.trigger("calculate_total_amount");
	// 			}
	// 		});
	// 	}
	// }
});

frappe.ui.form.on("Scholarship", "academic_year", function(frm) {
		frm.set_value("offer" ,"");
		if (frm.doc.academic_year) {
			console.log(frm.doc.academic_year)
			frappe.call({
				method: "loyalty_app.loyalty.api.get_offers",
				args: {
					"academic_year": frm.doc.academic_year
				},
				callback: function(r) {
					if (r.message) {
						$.each(r.message, function(i, d) {
							var row = frappe.model.add_child(frm.doc, "Mark Range", "offer");
							row.from_mark = d.from_mark;
							row.to_mark = d.to_mark;
							row.scholarship = d.scholarship;
						});
					}
					refresh_field("offer");
					// frm.trigger("calculate_total_amount");
				}
			});
		}
});