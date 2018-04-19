# -*- coding: utf-8 -*-
# Copyright (c) 2018, Loyalty and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class BonusPoints(Document):
	def on_update(self):
		if self.status == "Approved":
			self.validate_duplication()
		if self.status == "Rejected":
			self.Delete_reward()
	
	def validate_duplication(self):
		enrollment = frappe.get_list("Bonus Points History", fields=["student", "remaining_points", "total_points","name"])
		match = "true"
		for x in enrollment:
			if x.student == self.student:
				total_points = int(x.total_points) + int(self.points)
				remaining_points = int(x.remaining_points) + int(self.points)
				update_rewardpoint(x.name,total_points,remaining_points)
				match = "false"
		
		if match == "true":
			create_reward(self)

	def Delete_reward(self):
		enrollment = frappe.get_list("Bonus Points History", fields=["student", "remaining_points", "total_points","name"])
		match = "true"
		for x in enrollment:
			if x.student == self.student:
				total_points = int(x.total_points) - int(self.points)
				remaining_points = int(x.remaining_points) - int(self.points)
				update_rewardpoint(x.name,total_points,remaining_points)	 
		


def update_rewardpoint(lead,points,remaining_points):
	frappe.db.set_value("Bonus Points History", lead, "total_points", points)
	frappe.db.set_value("Bonus Points History", lead, "remaining_points", remaining_points)

def create_reward(self):
	fees = frappe.new_doc("Bonus Points History")
	fees.update({
		"student": self.student,
		"student_name": self.student_name,
		"total_points": self.points,
		"remaining_points": self.points,
		"redeemed_points": 0
	})
	
	fees.save()

