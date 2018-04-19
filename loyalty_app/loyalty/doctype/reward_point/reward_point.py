# -*- coding: utf-8 -*-
# Copyright (c) 2018, Loyalty and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class RewardPoint(Document):
	def on_update(self):
		if self.status == "Approved":
			self.validate_duplication()
		if self.status == "Rejected":
			self.Delete_reward()
	
	def validate_duplication(self):
		enrollment = frappe.get_list("Affiliates", fields=["affiliate_id", "affiliate_name", "remaining_points", "total_points","name"])
		match = "true"
		for x in enrollment:
			if x.name == self.user:
				total_points = int(x.total_points) + int(self.reward_points)
				remaining_points = int(x.remaining_points) + int(self.reward_points)
				update_rewardpoint(x.name,total_points,remaining_points)
				

	def Delete_reward(self):
		enrollment = frappe.get_list("Affiliates", fields=["affiliate_id", "affiliate_name", "remaining_points", "total_points","name"])
		match = "true"
		for x in enrollment:
			if x.name == self.user:
				total_points = int(x.total_points) - int(self.reward_points)
				remaining_points = int(x.remaining_points) - int(self.reward_points)
				update_rewardpoint(x.name,total_points,remaining_points)

		 	 
def update_rewardpoint(lead,reward_points,remaining_points):
	frappe.db.set_value("Affiliates", lead, "total_points", reward_points)
	frappe.db.set_value("Affiliates", lead, "remaining_points", remaining_points)

