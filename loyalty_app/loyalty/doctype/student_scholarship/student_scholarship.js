// Copyright (c) 2018, Loyalty and contributors
// For license information, please see license.txt

frappe.ui.form.on('Student Scholarship', {
	refresh: function(frm) {

	},
// 	after_save: function(frm) {
// 		if (!frm.doc.__islocal) {	

// 				 frappe.call({
//                 method: "loyalty_app.loyalty.doctype.student_scholarship.student_scholarship.get_scholarship",
//                 args: {
//                    marks_obtained: frm.doc.marks_obtained,
//                    scholarship_name: frm.doc.scholarship_name,
//                    name: frm.doc.name,
//                    },
//                 callback: function (r) 
//                   {
//                 if(r.message){
//                   console.log(r.message.length);
// for (var i = 0; i < r.message.length; i++) {
//   // alert(frm.doc.marks_obtained);
//   // console.log(r.message[i].scholarship);
//   if(r.message[i].from_mark <= frm.doc.marks_obtained)
//   {
//     if(r.message[i].to_mark >= frm.doc.marks_obtained){
//       frm.set_value("eligible_scholarship",r.message[i].scholarship);
//  console.log(r.message[i])
//     }
//   }}       
//  } }
//    })
// 	}
// 	else
// 	{
// 		frappe.throw(__("Save the Document first"));
// 	}
// 	}

});

frappe.ui.form.on("Student Scholarship", "marks_obtained", function(frm) {

 
         frappe.call({
                method: "loyalty_app.loyalty.doctype.student_scholarship.student_scholarship.get_scholarship",
                args: {
                   marks_obtained: frm.doc.marks_obtained,
                   scholarship_name: frm.doc.scholarship_name,
                   name: frm.doc.name,
                   },
                callback: function (r) 
                  {
                if(r.message){
for (var i = 0; i < r.message.length; i++) {
  // alert(frm.doc.marks_obtained);
  debugger; // console.log(r.message[i]);
  if(parseInt(frm.doc.marks_obtained) >= parseInt(r.message[i].from_mark))
   {
    // console.log(r.message[i].from_mark)
     debugger;  
    if(parseInt(frm.doc.marks_obtained) <= parseInt(r.message[i].to_mark)){
        // console.log(r.message[i]);
       console.log(r.message[i].scholarship)
      frm.set_value("eligible_scholarship",r.message[i].scholarship);
      frm.set_read_only();
      break;
     }
  }}       
 } }
   })
  });