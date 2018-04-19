# -*- coding: utf-8 -*-
# Copyright (c) 2018, Loyalty and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class StudentScholarship(Document):
	pass

@frappe.whitelist()
def get_scholarship(marks_obtained,scholarship_name,name):
	enrollment = frappe.get_list("Mark Range", fields=["from_mark","to_mark", "scholarship"],  filters = {"parent": ("like", scholarship_name)})
	return enrollment

# select marks_obtained, eligible_scholarship from `tabStudent Scholarship` where  student=self.student

# @frappe.whitelist()
# def get_student_scholarship(self):
# 	enrollment = frappe.get_list("Student Scholarship", fields=["student", "student_name"])
# 	match = "true"
# 	if enrollment:
# 		student_list = []
# 	for s in enrollment:
# 			s.update({"is_scholarship_eligible": 1})
# 			student_list.append(s)
# 	return student_list
# def update_scholarship(scholarship,name):

# 	frappe.db.sql("""update `tabStudent Scholarship` set eligible_scholarship=%s where name=%s""",scholarship,name)

	# fees = frappe.new_doc("Student Scholarship")
	# fees.update({
	# 	# "student": self.student,
	# 	# "student_name": self.student_name,
	# 	# "total_points": self.points,
	# 	# "marks_obtained":self.points,
	# 	"eligible_scholarship":self.scholarship
	# })
	
	# fees.save()
