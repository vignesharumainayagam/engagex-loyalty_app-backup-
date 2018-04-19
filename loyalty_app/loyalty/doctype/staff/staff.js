// Copyright (c) 2018, Loyalty and contributors
// For license information, please see license.txt

frappe.ui.form.on('Staff', {
	after_save: function(frm) {
		if (!frm.doc.__islocal) {
	  $.ajax({
	  url : window.location.origin+"/api/resource/Affiliates",
	  dataType: 'text',
	  type: 'POST',
	  contentType: 'application/json',
	  data : JSON.stringify( {
	  "id" : frm.doc.name,
	  "name1" : frm.doc.staff_name,
	  
	  }
	  ),
	  beforeSend: function(xhr){
	  xhr.setRequestHeader(
	  'X-Frappe-CSRF-Token', frappe.csrf_token
	  );
	  },success: function(data){
	  console.log(data); 
	  }, error: function(error){
	  console.log(error);
	  }
	  });
	}
	else
	{
		frappe.throw(__("Save the Document first"));
	}
	},
	refresh: function(frm) {

	}
});
