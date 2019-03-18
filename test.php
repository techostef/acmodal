<?php
$data = array();

$item = ['a'=>1,'b'=>"text",'c'=>"text 1"];
array_push($data,$item);

$item = ['a'=>2,'b'=>"asdf ",'c'=>"asdf 1"];
array_push($data,$item);


$item = ['a'=>3,'b'=>"ggggg ",'c'=>"gggg 1"];
array_push($data,$item);

echo json_encode($data);