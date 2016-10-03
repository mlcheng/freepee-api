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
const request = require('request');

const API_TEST = Symbol('---API-TEST---');
const promisify = endpoint => new Promise(function(resolve) {
	request(`http://localhost:54321/freepee2/api/v2/${endpoint}`, function(err, resp, body) {
		// console.log(body);

		let result = JSON.parse(body);

		// Rewrite possibly sensitive information (?)
		if(result.userid) {
			result.userid = API_TEST;
		}
		if(Array.isArray(result)) {
			result.forEach(r => {
				if(r.userid) {
					r.userid = API_TEST;
				}
			});
		}

		resolve(result);
	});
});


Test('Get a bathroom by ID')
	.using(Test.ValidationFunction.OBJECT_DEEP)
	.expect(promisify('bathroom/get/id/2'))
	.toBe([
		{
			'lat': 59.39678929534,
			'lng': 24.669965095818,
			'approx_address': 'Tallinn University of Technology, Akadeemia Tee 3, 12611 Tallinn, Estonia',
			'description': 'In the SOC building, first floor. Has toilet paper.',
			'sponsored': '',
			'date': 1414825088,
			'userid': API_TEST,
			'id': 2,
			'upvotes': 2,
			'downvotes': 0,
			'total_score': 2
		}
	]);

Test('Get bathrooms by coordinates and radius')
	.using(Test.ValidationFunction.OBJECT_DEEP)
	.expect(promisify('bathroom/get/coords/59.39678929534,24.669965095818,21z'))
	.toBe([
		{
			'lat': 59.39678929534,
			'lng': 24.669965095818,
			'approx_address': 'Tallinn University of Technology, Akadeemia Tee 3, 12611 Tallinn, Estonia',
			'description': 'In the SOC building, first floor. Has toilet paper.',
			'sponsored': '',
			'date': 1414825088,
			'userid': API_TEST,
			'id': 2
		},
		{
			'lat': 59.394994317976,
			'lng': 24.67182956636,
			'approx_address': 'Tallinn University of Technology, Ehitajate tee 5, 12616 Tallinn, Estonia',
			'description': 'Next to the cafeteria. Has toilet paper.',
			'sponsored': '',
			'date': 1415043884,
			'userid': API_TEST,
			'id': 143
		}
	]);

Test('Get the voting status of a bathroom')
	.using(Test.ValidationFunction.OBJECT_DEEP)
	.expect(promisify('bathroom/query/id/2?vote&gid=1'))
	.toBe({
		'id': '2',
		'userid': API_TEST,
		'vote': -2
	});