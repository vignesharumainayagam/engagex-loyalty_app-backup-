frappe.listview_settings['Products'] = {
	enable_menu:true,
	in_filter :"Category",
	filt_field:"category"
};
exec_filter("Category","Products");
