# -*- coding: utf-8 -*-
# Copyright (c) 2018, Loyalty and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document

class Quiz(Document):
	pass

@frappe.whitelist()
def get_questions(save_to):
	added_questions = get_questionlist(save_to)

	if added_questions:
		student_list = []
		for s in added_questions:
			if s.active:
				s.update({"active": 1})
			else:
				s.update({"active": 1})
			student_list.append(s)
		return student_list
	else:
		frappe.msgprint(_("No records found"))
		return []

def get_questionlist(save_to):
	
	# condition1 = " "
	condition2 = " "
	# if academic_term:
	# 	condition1 += " and pe.academic_term = %(academic_term)s"
	# if program:
	# 	condition1 += " and pe.program = %(program)s"
	# if batch:
	# 	condition1 += " and pe.student_batch_name = %(batch)s"
	# if save_to:
		
		# condition2 = ", `tabAnswers` pec"

	return frappe.db.sql('''
		select 
			question_type, mark, negative_mark, question
		from 
			`tabQuestions`
		where
			save_to = %(save_to)s
		order by
			name asc
		'''.format(condition2=condition2),
		({"save_to": save_to}), as_dict=1)
