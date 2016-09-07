# Free Pee API v2

This document details how to use the Free Pee API (henceforth known as **API**) for your application. The API provides locations of free bathrooms, among other things.

The base URL of the API is

`https://www.iqwerty.net/freepee/api/v2/`

Please note that the API is currently in the *development* phase. Endpoints that you see here have finished development but are not in production yet.

## `bathroom/`
The `bathroom` endpoint is for manipulation of bathrooms in Free Pee.

### `GET bathroom/get/id/{id}`
This endpoint retrieves a bathroom by its internal reference ID. The response is a JSON object containing the bathroom details. A sample request is

`GET bathroom/get/id/8748`

And the response would contain the bathroom details

```json
[
	{
		"lat": 25.002334319315,
		"lng": 121.51069711894,
		"approx_address": "No. 501, Zhonghe Road, Yonghe District, New Taipei City, Taiwan 234",
		"description": "Inside the McDonald's",
		"sponsored": "",
		"date": 1416102871,
		"userid": "101721422330493865185",
		"id": 8748,
		"upvotes": 1,
		"downvotes": 0,
		"total_score": 1
	}
]
```

### `GET bathroom/get/coords/{lat},{lng},{zoom}z`
This endpoint gets bathrooms within a certain range given a GPS coordinate and a zoom level. The actual range is decided based on an internal algorithm.

A sample request would be

`GET bathroom/get/coords/25.00420705107481,121.49994291792986,17z`

The response would be an array of bathroom objects.

### `GET bathroom/query/id/{id}?vote&gid={gid}`
The `query` endpoint will allow retrieval of certain aspects of a bathroom. Specify the bathroom ID as well as `vote`. Then pass the user's Google ID. The API will return a JSON object specifying the user's voting status for the given bathroom. The request would look something like

`GET bathroom/query/id/48?vote&gid=GOOGLE_ID`

The response would be a JSON object

```json
{
	"id": 48,
	"userid": GOOGLE_ID,
	"vote": 1
}
```

### `POST bathroom/vote/(up|down)/{id}`
The `vote` endpoint takes an `up`vote or a `down`vote and the bathroom ID as its parameters. The user must be authenticated in order to vote. See the `login` endpoint for more details.

Supply the `gid` and `ukey` as `POST` parameters, which are the Google ID and OAuth token respectively.

A sample request would be

```
POST bathroom/vote/up/47
content-type: application/x-www-form-urlencoded

gid=GOOGLE_ID&ukey=USER_KEY
```

### `POST bathroom/create`

## `login/`
The `login` endpoint will allow users to be authenticated or login to Free Pee. Logging in will allow users to add, edit, and vote on bathrooms. Authenticated users can also remove bathrooms that they created.

### `POST login`
Sending a POST request to the `login` endpoint allows the user to login. Sending a login request will update the user's OAuth token in the database.

Supply a `gid` as the user's Google ID, and `ukey` as the OAuth authentication token. A sample request would look like

```
POST login
content-type: application/x-www-form-urlencoded

gid=GOOGLE_ID&ukey=USER_KEY
```

If the user is unauthenticated, the response will will have a bad status and return `authenticated: false`

```json
{
	"status": "bad",
	"issues": {
		"authenticated": false
	}
}
```

If the login is successful, the response header will have a status of `200`.

### `POST login/query`
Query whether or not a user is logged in.

```
POST login/query
content-type: application/x-www-form-urlencoded

gid=GOOGLE_ID&ukey=USER_KEY
```

If the user is not authenticated the response will have a bad status and return `authenticated: false`

```json
{
	"status": "bad",
	"issues": {
		"authenticated": false
	}
}
```

If the user is logged in, the response will return

```json
{
	"authenticated": true
}
```

Cross-Origin Resource Sharing