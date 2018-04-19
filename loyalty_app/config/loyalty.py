from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
	{
			"label": _("Promotions"),
			"items": [
                {
					"type": "doctype",
					"name": "Advertisement"
				},
				{
					"type": "doctype",
					"name": "Scholarship"
				},
				  
			]
		},
		
		{
			"label": _("Products"),
			"items": [
				{
					"type": "doctype",
					"name": "Category"
				},
				{
					"type": "doctype",
					"name": "Products"
				},
				{
					"type": "doctype",
					"name": "Coupons"
				}

			]
		},
		
		# {
		# 	"label": _("Reward/Redeem Points"),
		# 	"items": [
		# 		{
		# 			"type": "doctype",
		# 			"name": "Reward Point"
		# 		},
		# 		{
		# 			"type": "doctype",
		# 			"name": "Bonus Points"
		# 		},
		# 		{
		# 			"type": "doctype",
		# 			"name": "Discount Template"
		# 		},
		# 		{
		# 			"type": "doctype",
		# 			"name": "Scholarship"
		# 		},
		# 		{
		# 			"type": "doctype",
		# 			"name": "Student Scholarship"
		# 		}
  #       	]
		# },
		# {
		# 	"label": _("Sales/Orders"),
		# 	"items": [
		# 	{
		# 			"type": "doctype",
		# 			"name": "Sales"
		# 		},
		# 		{
		# 			"type": "doctype",
		# 			"name": "Redeem Orders"
		# 		}
		# 	]
		# },
		
		{
			"label": _("Scholarship Exams"),
			"items": [
				{
					"type": "doctype",
					"name": "Questions"
				},
				{
					"type": "doctype",
					"name": "Exam"
				},	
				{
					"type": "doctype",
					"name": "Exam Result"
				},	
			]
		},
		# {
		# 	"label": _("Support"),
		# 	"items": [
		# 		{
		# 			"type": "doctype",
		# 			"name": "Knowledge centre"
		# 		},
		# 		{
		# 			"type": "doctype",
		# 			"name": "Ticket Management"
		# 		}

		# 	]
		# },
		{
			"label": _("Referral Program"),
			"items": [
				 {
					"type": "doctype",
					"name": "Affiliates"
				},
				{
					"type": "doctype",
					"name": "Reward Point"
				},
				{
					"type": "doctype",
					"name": "Sales"
				},
			]
		},
		{
			"label": _("Setup"),
			"items": [
			  {
					"type": "doctype",
					"name": "Discount Template"
				},
				
			]
		},
		
	]