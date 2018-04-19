// Copyright (c) 2018, Loyalty and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sales', {
	validate: function(frm) {
		if(frm.doc.status == "Confirmed"){
      if(!frm.doc.user){
      msgprint("User Id is required!");
       }
		 else{
		    frappe.call({
        method: "loyalty_app.loyalty.doctype.sales.sales.update_order_id",
        args: {
         user:frm.doc.user,
         point:frm.doc.total_points,
         order:frm.doc.name
        },
        callback: function(r) {
          if(r.message){
         
          var order=0;

			for (var i = 0; i < r.message.length; i++) {
        var one=r.message[0].reward_points;
				 if(parseInt(frm.doc.total_points) >= parseInt(order)){
               order= r.message[i].reward_points + order;
           
      frappe.call({
        method: "loyalty_app.loyalty.doctype.sales.sales.update_orderid",
        args: {
           user:r.message[i].name,
           orderid:frm.doc.name
        },
        callback: function(r) {
        	console.log(r.message)
        }
      });
	           // frappe.model.set_value("Reward Point", r.message[i].name, "order_id", frm.doc.name)
          if(parseInt(frm.doc.total_points) == parseInt(order))
           {
  	            frm.refresh_field("order_history");   			      
           }
       else(parseInt(frm.doc.total_points) <= parseInt(order))
       {
                frm.refresh_field("order_history");   
           }
         }
       }
      }
    }
     });
		}
   
  }
	},


	refresh: function(frm) {
if(frm.doc.status == "Confirmed"){

    frappe.call({
        method: "frappe.client.get_list",
        args: {
          doctype: "Reward Point",
          filters: [["order_id", "=", frm.doc.name]],
          // fields: ["productid","qr_code","productname","points","status","creation","advertisement","reward_points"],
          fields: ["name","user","advertisement","reward_points","creation","status","order_id"],
          
          limit_page_length: null
        },
        callback: function(r) {
         
           for(var e=0; e<r.message.length; e++){
            frappe.model.add_child(cur_frm.doc, "Order History", "order_history");  
                $.each(frm.doc.order_history || [], function(e, v) {
                  frappe.model.set_value(v.doctype, v.name, "name1", r.message[e].name)
                  frappe.model.set_value(v.doctype, v.name, "affiliate_id", r.message[e].user)
                  frappe.model.set_value(v.doctype, v.name, "date_added", r.message[e].creation)
                  frappe.model.set_value(v.doctype, v.name, "order_id", r.message[e].order_id)
                  frappe.model.set_value(v.doctype, v.name, "reward_points", r.message[e].reward_points)
                })
                frm.refresh_field("order_history");     
          }
        }
      });
      // $('.grid-buttons').parent().hide();
}
	},
	// after_save: function(frm) {
			
	// 	if(frm.doc.status == "Confirmed"){
			
	// 		  frappe.call({
 //        method: "frappe.client.get_list",
 //        args: {
 //          doctype: "Affiliates",
 //          filters: [["affiliate_id", "=", frm.doc.name]],
 //          fields: ["affiliate_id","affiliate_name","remaining_points","redeemed_points","name"],
          
 //          limit_page_length: null
 //        },
 //        callback: function(r) {
        
 //        }
 //      });
	// 	}
	// }
});

frappe.ui.form.on("Sales_list", {

	amount: function(frm) {
		debugger;
		var total_amount = 0;
		var total_points=0;
// console.log(frm.doc.products[i].quantity)
		for(var i=0;i<frm.doc.products.length;i++) {
			total_amount += parseInt(frm.doc.products[i].amount) * parseInt(frm.doc.products[i].quantity);
			total_points += parseInt(frm.doc.products[i].points);
			
		}
		frm.set_value("amount", total_amount);
		frm.set_value("total_points", total_points);
	}
});

