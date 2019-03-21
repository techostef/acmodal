<?php
$data = array();

$item = ['a'=>1,'b'=>"text"];
array_push($data,$item);

$item = ['a'=>2,'b'=>"asdf "];
array_push($data,$item);


$item = ['a'=>3,'b'=>"ggggg "];
array_push($data,$item);

echo json_encode($data);