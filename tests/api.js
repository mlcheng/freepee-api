/***********************************************

  "api.js"

  Created by Michael Cheng on 10/04/2016 19:33
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

'use strict';

/* globals require, module */
const request = require('request');
const Method = {
	GET: 'GET',
	POST: 'POST'
};

function handle(method, endpoint, params, HIDDEN) {
	return new Promise(function(resolve) {
		request({
			method,
			url: `http://localhost:54321/freepee2/api/v2/${endpoint}`,
			form: params,
			gzip: true
		}, function(err, resp, body) {

			let result;
			try {
				result = JSON.parse(body);
			} catch(e) {
				return resolve(null);
			}

			// Rewrite possibly sensitive/irrelevant information (?)
			if(result.userid) {
				result.userid = HIDDEN;
			}
			if(Array.isArray(result)) {
				result.forEach(r => {
					if(r.userid) {
						r.userid = HIDDEN;
					}
				});
			}

			resolve(result);
		});
	});
}

module.exports = HIDDEN => ({
	get: (endpoint, params = null) => handle(Method.GET, endpoint, params, HIDDEN),
	post: (endpoint, params = null) => handle(Method.POST, endpoint, params, HIDDEN)
});