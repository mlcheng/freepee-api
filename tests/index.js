/***********************************************

  'index.js'

  Created by Michael Cheng on 10/03/2016 21:53
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

'use strict';

/* globals require */
const { Test } = require('./../../../playground/lib-js/janus/janus');

const HIDDEN = '---API-TEST---';
const FreePeeAPI = require('./api')(HIDDEN);


Test('Get a bathroom by ID', ({ async, expect }) => {
	async(done => {
		FreePeeAPI.get('bathroom/get/id/2').then(result => {
			expect(result).toEqual([
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

			done();
		});
	});
});

Test('Get a list of bathrooms by coordinates and zoom level', ({ async, expect }) => {
	async(done => {
		FreePeeAPI.get('bathroom/get/coords/59.39678929534,24.669965095818,21z').then(result => {
			expect(result).toEqual([
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

			done();
		});
	});
});

Test('Get the voting status of a bathroom for a user', ({ async, expect }) => {
	async(done => {
		FreePeeAPI.get('bathroom/query/id/2?vote&gid=1').then(result => {
			expect(result).toEqual({
				'id': '2',
				'userid': HIDDEN,
				'vote': -2
			});

			done();
		});
	});
});

Test('Retrieve address location given coordinates', ({ async, expect }) => {
	async(done => {
		FreePeeAPI.get('geocode/get/coords/59.39678929534,24.669965095818').then(result => {
			expect(result.results.shift().formatted_address).toBe('Akadeemia tee 3, 12611 Tallinn, Estonia');

			done();
		});
	});
});

Test('Badly structured hit on login endpoint returns empty', ({ async, expect }) => {
	async(done => {
		FreePeeAPI.post('login').then(result => {
			expect(result).toBe(null);

			done();
		});
	});
});

Test('Invalid login returns an error object', ({ async, expect }) => {
	async(done => {
		FreePeeAPI.post('login', {
			gid: 1,
			ukey: 1
		}).then(result => {
			expect(result).toEqual({
				'status': 'bad',
				'issues': {
					'authenticated': false
				}
			});

			done();
		});
	});
});