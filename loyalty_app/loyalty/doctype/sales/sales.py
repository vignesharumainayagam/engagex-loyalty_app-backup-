# -*- coding: utf-8 -*-
# Copyright (c) 2018, Loyalty and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import msgprint, _
from frappe.model.document import Document
from frappe import _
from frappe.model.mapper import get_mapped_doc

class Sales(Document):
	def on_update(self):
		if self.status == "Confirmed":
			if self.payment_type !="Cash":
				self.validate_staff_duplication()
			# self.update_order_id()
			
	def validate_staff_duplication(self):
		enrollment = frappe.get_list("Affiliates", fields=["affiliate_id","affiliate_name","remaining_points", "redeemed_points", "name"])
		match = "true"
		for x in enrollment:
				if x.affiliate_id == self.user:
					if int(self.total_points) <= int(x.remaining_points):
						total_points = int(x.remaining_points) - int(self.total_points)
						remaining_points=int(x.redeemed_points) + int(self.total_points)
						update_rewardpoint(x.name,total_points,remaining_points)
						update_remaining(self.name,total_points)
						match = "false"
					else:
						frappe.throw(_("Reward Point is less than Product Points"))
		if match == "true":
			frappe.throw(_("Reward Point is less than Product Points"))

def update_rewardpoint(lead,points,total_points):
	frappe.db.set_value("Affiliates", lead, "remaining_points", points)
	frappe.db.set_value("Affiliates", lead, "redeemed_points", total_points)

@frappe.whitelist()
def update_order_id(user,point,order):
	aff_id = frappe.get_list("Affiliates", filters = {"affiliate_id": user}, fields=["affiliate_id","affiliate_name", "name"])
	match = "true"
	for x in aff_id:
		enrollment = frappe.get_list("Reward Point",filters = {"user": x.name, "status": "Approved", "order_id":""}, fields=["user","user_name","reward_points", "status", "name","order_id"],
		order_by="creation")
		return enrollment

@frappe.whitelist()
def update_orderid(user,orderid):
	frappe.db.set_value("Reward Point", user, "order_id", orderid)

@frappe.whitelist()
def update_remaining(user,remaining_points):
	frappe.db.set_value("Sales", user, "remaining_points", remaining_points)

	
@frappe.whitelist()
def remaining_points(user):
	remain = frappe.get_list("Affiliates", filters = {"affiliate_id": user}, fields=["affiliate_id","affiliate_name","remaining_points", "redeemed_points", "name"])
	return remain