# -*- coding: utf-8 -*-
# Copyright (c) 2018, Loyalty and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils import cstr, nowdate

class Affiliates(Document):
	pass

@frappe.whitelist()
def add_role(user):
	result= frappe.get_doc({
		"doctype": "Has Role",
		"name": nowdate(),
		"parent": user,
		"parentfield": "roles",
		"parenttype": "User",
		"role": "Affiliate",
	}).insert()

	return result

@frappe.whitelist()
def delete_role(user):
	enrollment =frappe.db.sql("""DELETE FROM `tabHas Role` WHERE role="Affiliate" and parent=%s""",user)
	
	return enrollment