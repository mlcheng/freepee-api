<?php
/***********************************************

  "api.php"

  Created by Michael Cheng on 12/28/2015 11:51
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

require_once("../functions.php");


FreePeeAPI::request($_GET['request']);


$method = $_SERVER['REQUEST_METHOD'];
switch(FreePeeAPI::getEndpoint()) {
	case Constants::ENDPOINT_BATHROOM:
		FreePeeAPI::handleBathroomEndpoint($method);
		break;
	case Constants::ENDPOINT_GEOCODE:
		FreePeeAPI::handleGeocodeEndpoint($method);
		break;
	case Constants::ENDPOINT_LOGIN:
		FreePeeAPI::handleLoginEndpoint($method);
		break;
	case Constants::ENDPOINT_STATUS:
		FreePeeAPI::handleStatusEndpoint();
		break;
	default:
		break;
}
?>