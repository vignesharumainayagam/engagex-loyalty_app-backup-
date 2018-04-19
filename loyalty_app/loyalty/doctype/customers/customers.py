# -*- coding: utf-8 -*-
# Copyright (c) 2018, Loyalty and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils import getdate, validate_email_add

class Customers(Document):
	def validate(self):
		self.validate_email()

	def validate_email(self):
		if self.emailid:
			validate_email_add(self.emailid, True)