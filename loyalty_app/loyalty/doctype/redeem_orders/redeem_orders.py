# -*- coding: utf-8 -*-
# Copyright (c) 2018, Loyalty and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import msgprint, _
from frappe.model.document import Document
from frappe import _
from frappe.model.mapper import get_mapped_doc

class RedeemOrders(Document):
	def on_update(self):
		if self.status == "Confirmed":
			self.validate_student_duplication()
			# self.validate_staff_duplication()
			
	def validate_student_duplication(self):
		
		enrollment = frappe.get_list("Bonus Points History", fields=["student","remaining_points", "redeemed_points", "name"])
		match = "true"
		for x in enrollment:
			if x.student == self.student:
				print(x.remaining_points)
				if int(self.total_points) <= int(x.remaining_points):
					total_points = int(x.remaining_points) - int(self.total_points)
					remaining_points=int(x.redeemed_points) + int(self.total_points)
					update_bonuspoint(x.name,total_points,remaining_points)
					match = "false"
				else:
					frappe.throw(_("Student Bonus Point is less than Product Points"))
		
		if match == "true":
			frappe.throw(_("Student Bonus Point is less than Product Points"))

	def validate_staff_duplication(self):
		enrollment = frappe.get_list("Reward Points History", fields=["staff","remaining_points", "redeemed_points", "name"])
		match = "true"
		for x in enrollment:
			    if x.staff == self.staff:
				    print(x.remaining_points)
				    if int(self.total_points) <= int(x.remaining_points):
					    total_points = int(x.remaining_points) - int(self.total_points)
					    remaining_points=int(x.redeemed_points) + int(self.total_points)
					    update_rewardpoint(x.name,total_points,remaining_points)
					    match = "false"
				    else:
					    frappe.throw(_("Staff Reward Point is less than Product Points"))
		if match == "true":
			frappe.throw(_("Reward Point is less than Product Points"))

def update_rewardpoint(lead,points,total_points):
	frappe.db.set_value("Reward Points History", lead, "remaining_points", points)
	frappe.db.set_value("Reward Points History", lead, "redeemed_points", total_points)

def update_bonuspoint(lead,points,total_points):
	frappe.db.set_value("Bonus Points History", lead, "remaining_points", points)
	frappe.db.set_value("Bonus Points History", lead, "redeemed_points", total_points)

