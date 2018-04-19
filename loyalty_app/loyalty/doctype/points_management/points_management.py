# -*- coding: utf-8 -*-
# Copyright (c) 2018, Loyalty and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class PointsManagement(Document):
	def on_update(self):
		if self.status == "Approved":
			self.validate_duplication()
	
	def validate_duplication(self):
		enrollment = frappe.get_list("Reward Points History", fields=["customer", "remaining_points", "total_points","name"])
		match = "true"
		for x in enrollment:
			if x.customer == self.customer:
				total_points = int(x.total_points) + int(self.points)
				remaining_points = int(x.remaining_points) + int(self.points)
				update_rewardpoint(x.name,total_points,remaining_points)
				match = "false"
		
		if match == "true":
			create_reward(self)

		 	 
		


def update_rewardpoint(lead,points,remaining_points):
	frappe.db.set_value("Reward Points History", lead, "total_points", points)
	frappe.db.set_value("Reward Points History", lead, "remaining_points", remaining_points)

def create_reward(self):
	fees = frappe.new_doc("Reward Points History")
	fees.update({
		"customer": self.customer,
		"customername": self.customername,
		"total_points": self.points,
		"remaining_points": self.points,
		"redeemed_points": 0
	})
	
	fees.save()
