<?php
$data = array();

if(isset($_GET['id'])){
    if($_GET['id']==1){
        $item = ['a'=>1,'b'=>"test id 1 - hahah",'c'=>"text 1"];
        array_push($data,$item);
        
        $item = ['a'=>1,'b'=>"test id 1 - asdffasf",'c'=>"text 1"];
        array_push($data,$item);
        
        
        $item = ['a'=>1,'b'=>"test id 1 - vvvvvvvv",'c'=>"text 1"];
        array_push($data,$item);
    }else if($_GET['id']==2){
        $item = ['a'=>1,'b'=>"test id 2 - zzzzzzzz",'c'=>"text 1"];
        array_push($data,$item);
        
        $item = ['a'=>1,'b'=>"test id 2 - oky",'c'=>"text 1"];
        array_push($data,$item);
        
        
        $item = ['a'=>1,'b'=>"test id 2 - dwi",'c'=>"text 1"];
        array_push($data,$item);
    }
}



echo json_encode($data);