<?php

// Taking all values
$firstName 		= $_POST['firstName'];
$email 		= $_POST['email'];
$msg 		= $_POST['msg'];
$output 	= "Name: ".$firstName."\n\nMessage: ".$msg;

$to 		= 'asamshahadat@gmail.com';
$headers	= 'FROM: "'.$email.'"';

$send = mail($to, $firstName, $output."\n\n***This message has been sent from Educus", $headers);


