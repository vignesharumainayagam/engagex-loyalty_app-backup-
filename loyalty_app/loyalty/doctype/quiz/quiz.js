// Copyright (c) 2018, Loyalty and contributors
// For license information, please see license.txt

frappe.ui.form.on('Quiz', {
	setup: function(frm) {
		var numberOfEntries = window.history.length;
		var Entries = window.history;
		console.log(numberOfEntries)
		console.log(Entries)
	},
	refresh: function(frm) {
	
			frm.add_custom_button(__("Create Questions"), function() {
				frm.events.make_payment_entry(frm);
			}, __("Questions"));
			frm.page.set_inner_btn_group_as_primary(__("Questions"));
		
frm.add_custom_button(__("Questions"), function() {
					frappe.route_options = {"save_to": frm.doc.group_based_on};
					frappe.set_route("List", "Questions");
				}, __("Questions"));
			frm.page.set_inner_btn_group_as_primary(__("Questions"));
	},
	make_payment_entry: function(frm) {
		return frappe.call({
			method: "lms.lms.doctype.questions.questions.get_question_list",
			args: {
				"save_to": frm.doc.group_based_on	
			},
			callback: function(r) {
				var doc = frappe.model.sync(r.message);
				// frappe.set_route("List", "Questions");
				frappe.route_options = {"save_to": frm.doc.group_based_on};
				frappe.set_route("Form", doc[0].doctype, doc[0].name);
			}
		});
	},
		get_students: function(frm) {
		if (frm.doc.group_based_on == "Compititive") {
			var student_list = [];
			$.each(frm.doc.question, function(i,d) {
				student_list.push(d.questionid);
			});
			frappe.call({
				method: "loyalty_app.loyalty.doctype.quiz.quiz.get_questions",
				args: {
					"save_to": frm.doc.group_based_on	
				},
				callback: function(r) {
					if(r.message) {
						console.log(r.message);
						var o = r.message.length;
						 frm.set_value("no_questions",o)
						 frm.set_value("total_score",o)
	                  // var k = frm.add_child("available_questions");
						        // k.no_questions = o;
						        // refresh_field("available_questions");
						        // console.log(o)
						// frm.doc.question_type = r.message[];
						// frm.doc.total_score = r.message[];

						$.each(r.message, function(i, d) {
							if(!in_list(student_list, d.question)) {
								var s = frm.add_child("question");
								s.question = d.question;
								s.active=d.active;
                                var r= 0;
                                r=parseInt(d.mark)+r; 
							}
						});
						console.log(r)
                        
						refresh_field("question");
						frm.save();
					} else {
						frappe.msgprint(__("Questions is already updated."))
					}
				}
			})	
		} else {
			frappe.msgprint(__("Select questions manually for the Activity based Group"));
		}
	}
});

frappe.ui.form.on("Quiz", "get_students", function(frm) {
     
});