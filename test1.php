<?php
$data = array();

if(isset($_GET['id'])){
    if($_GET['id']==1){
        $item = ['a'=>1,'b'=>"test id 1 - hahah"];
        array_push($data,$item);
        
        $item = ['a'=>1,'b'=>"test id 1 - asdffasf"];
        array_push($data,$item);
        
        
        $item = ['a'=>1,'b'=>"test id 1 - vvvvvvvv"];
        array_push($data,$item);
    }else if($_GET['id']==2){
        $item = ['a'=>1,'b'=>"test id 2 - zzzzzzzz"];
        array_push($data,$item);
        
        $item = ['a'=>1,'b'=>"test id 2 - oky"];
        array_push($data,$item);
        
        
        $item = ['a'=>1,'b'=>"test id 2 - dwi"];
        array_push($data,$item);
    }
}



echo json_encode($data);