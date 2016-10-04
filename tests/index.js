/***********************************************

  'index.js'

  Created by Michael Cheng on 10/03/2016 21:53
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

'use strict';

/* globals require */
const { Test } = require('./../../../playground/lib-js/test/test');

const HIDDEN = '---API-TEST---';
const FreePeeAPI = require('./api')(HIDDEN);


Test('Get a bathroom by ID')
	.using(Test.ValidationFunction.OBJECT_DEEP)
	.expect(FreePeeAPI.get('bathroom/get/id/2'))
	.toBe([
		{
			'lat': 59.39678929534,
			'lng': 24.669965095818,
			'approx_address': 'Tallinn University of Technology, Akadeemia Tee 3, 12611 Tallinn, Estonia',
			'description': 'In the SOC building, first floor. Has toilet paper.',
			'sponsored': '',
			'date': 1414825088,
			'userid': HIDDEN,
			'id': 2,
			'upvotes': 2,
			'downvotes': 0,
			'total_score': 2
		}
	]);

Test('Get a list of bathrooms by coordinates and zoom level')
	.using(Test.ValidationFunction.OBJECT_DEEP)
	.expect(FreePeeAPI.get('bathroom/get/coords/59.39678929534,24.669965095818,21z'))
	.toBe([
		{
			'lat': 59.39678929534,
			'lng': 24.669965095818,
			'approx_address': 'Tallinn University of Technology, Akadeemia Tee 3, 12611 Tallinn, Estonia',
			'description': 'In the SOC building, first floor. Has toilet paper.',
			'sponsored': '',
			'date': 1414825088,
			'userid': HIDDEN,
			'id': 2
		},
		{
			'lat': 59.394994317976,
			'lng': 24.67182956636,
			'approx_address': 'Tallinn University of Technology, Ehitajate tee 5, 12616 Tallinn, Estonia',
			'description': 'Next to the cafeteria. Has toilet paper.',
			'sponsored': '',
			'date': 1415043884,
			'userid': HIDDEN,
			'id': 143
		}
	]);

Test('Get a user\'s voting status of a bathroom')
	.using(Test.ValidationFunction.OBJECT_DEEP)
	.expect(FreePeeAPI.get('bathroom/query/id/2?vote&gid=1'))
	.toBe({
		'id': '2',
		'userid': HIDDEN,
		'vote': -2
	});

Test('Retrieve address location given coordinates')
	.using(function geocodeComparator(expected, actual) {
		return Test.ValidationFunction.OBJECT_DEEP(
			expected,
			actual.results.shift().formatted_address
		);
	})
	.expect(FreePeeAPI.get('geocode/get/coords/59.39678929534,24.669965095818'))
	.toBe('Akadeemia tee 3, 12611 Tallinn, Estonia');

Test('Attempted badly structured hit on login endpoint returns empty')
	.expect(FreePeeAPI.post('login'))
	.toBe(null);

Test('Attempted invalid login returns an error object')
	.using(Test.ValidationFunction.OBJECT_DEEP)
	.expect(FreePeeAPI.post('login', {
		gid: 1,
		ukey: 1
	}))
	.toBe({
		'status': 'bad',
		'issues': {
			'authenticated': false
		}
	});