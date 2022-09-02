<?php

function checkTriangle($xVal,$yVal,$rVal){
    return $xVal <= 0 && $yVal <= 0 && $xVal <= $rVal + $yVal;
}
function checkRectangle($xVal,$yVal,$rVal){
    return $xVal >= 0 && $yVal <= 0 && $xVal <= $rVal && $xVal <= $rVal/2;
}
function checkCircle($xVal, $yVal, $rVal){
    return $xVal >= 0 && $yVal >= 0 && sqrt($xVal*$xVal + $yVal*$yVal) <= $rVal;
}
function checkPoint($xVal, $yVal, $rVal){
    return checkTriangle($xVal, $yVal,$rVal) || checkRectangle($xVal, $yVal,$rVal) || checkCircle($xVal, $yVal,$rVal);
}
$xVal = $_POST['xVal'];
$yVal = $_POST['yVal'];
$rVal = $_POST['rVal'];

$timezoneOffset = $_POST['timezone'];

$result = checkPoint($xVal, $yVal, $rVal);

date_default_timezone_set('UTC');
$current_time = date('d-m-y h:i:s',time()-$timezoneOffset*60);

$executionTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'],7);

$jsonArray = array($xVal,$yVal,$rVal,$current_time,$executionTime,$result);
$jsonData = json_encode($jsonArray);

echo $jsonData;

