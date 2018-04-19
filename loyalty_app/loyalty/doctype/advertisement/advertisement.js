// Copyright (c) 2018, Loyalty and contributors
// For license information, please see license.txt

frappe.ui.form.on('Advertisement', {
	refresh: function(frm) {
 if(!frm.doc.__islocal){	
   
    console.log(frappe.session.user_email)
    console.log(frappe.session.user)
    console.log(frm.doc.name)
		
			frm.add_custom_button(__("Facebook"), function() {
			    var network = "Facebook"
				frm.events.share_via_facebook(frm,network);
			});
			frm.add_custom_button(__("Whatsapp"), function() {
				
				var	network = "Whatsapp"
				frm.events.share_via_whatsapp(frm,network);
			});
			frm.add_custom_button(__("Twitter"), function() {
				var network = "Twitter"
				frm.events.share_via_twitter(frm,network);
			});
		}
	},
	share_via_facebook: function(frm,network) {
		var url= 'http://engagex.tridotstech.com/?utm_affiliate_id='+frappe.session.user_email+'&utm_user='+frappe.session.user+'&utm_medium=Website&utm_source='+network+'&utm_campaign='+frm.doc.name+'#lead'

		window.open('https://www.facebook.com/dialog/share?app_id=302921383146801&display=popup&href='+encodeURIComponent(url))     	
	},
	share_via_whatsapp: function(frm,network) {
		var url= 'http://engagex.tridotstech.com/?utm_affiliate_id='+frappe.session.user_email+'&utm_user='+frappe.session.user+'&utm_medium=Website&utm_source='+network+'&utm_campaign='+frm.doc.name+'#lead'

			window.open('https://api.whatsapp.com/send?text='+encodeURIComponent(url),"popupWindow")     
	},
	share_via_twitter: function(frm,network) {
		var url= 'http://engagex.tridotstech.com/?utm_affiliate_id='+frappe.session.user_email+'&utm_user='+frappe.session.user+'&utm_medium=Website&utm_source='+network+'&utm_campaign='+frm.doc.name+'#lead'

		window.open('https://twitter.com/intent/tweet/?text='+encodeURIComponent(url),"popupWindow")
    },
});
// window.open("http://engagex.tridotstech.com/");
// let url= 'http://engagex.tridotstech.com/?utm_affiliate_id='+this.affiliate.name+'&utm_user='+this.affiliate.affiliate_id+'&utm_medium=Website&utm_source='+network+'&utm_campaign='+this.advertisementdetail.advertisement_name+'#lead'

// if(network == 'Whatsapp'){
//     	window.open('https://api.whatsapp.com/send?text='+encodeURIComponent(url),"popupWindow")
//     }
//      else if (network == 'Facebook')
//     {
//     	window.open('https://www.facebook.com/dialog/share?app_id=302921383146801&display=popup&href='+encodeURIComponent(url))
//     }
//     else if (network == 'Twitter')
//     {
//     	window.open('https://twitter.com/intent/tweet/?text='+encodeURIComponent(url),"popupWindow")
//     }

