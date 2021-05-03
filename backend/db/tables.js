'use strict'

const tables = {
	'users': {
		'id': 'int',
		'name': 'varchar',
		'surname': 'varchar',
		'email': 'varchar',
		'password': 'varchar',
		'salt': 'varchar',
		'PRIMARY KEY': '(id)',
	  },
	  'recipes': {
		'user_id': 'int',
		'photo_url': 'varchar',
		'rating': 'numeric',
		'category': 'varchar',
		'ingredients': 'varchar',
		'steps': 'varchar',
		'PRIMARY KEY': '(id)',
	  },
	  'comments': {
		'user_id': 'int',
		'content': 'varchar',
		'recipes_id':'int',
		'PRIMARY KEY': '(user_id)',
	  },
	  'marks': {
		'user_id': 'int',
		'recipes_id': '',
		'value': 'numeric',
	  },

}

module.exports = tables;
