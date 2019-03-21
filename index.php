<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
<link href="bootstrap.min.css" rel="stylesheet">
<script src="jquery.js" type="text/javascript"></script>
<script src="acmodel.js" type="text/javascript"></script>
</head>
<body>

<div class="container">
	<div class="row">
		<div class="col-md-12">
			<div class="form-group">
				<label>Input (AJAX)</label>
				<input class="form-control" id="test">
			</div>
		</div>
		<div class="col-md-12">
			<div class="form-group">
				<label>Select (AJAX)</label>
				<select class="form-control" id="test1">
					<option>Select Value</option>
				</select>
			</div>
		</div>
		<div class="col-md-12">
			<div class="form-group">
				<label>Select (DATA) change Select acb</label>
				<select class="form-control" id="datatest">
					<option>Select Value</option>
				</select>
			</div>
		</div>

		<div class="col-md-12">
			<div class="form-group">
				<label>Select acb (DATA)</label>
				<select class="form-control" id="datatestacb">
					<option>Select Value</option>
				</select>
			</div>
		</div>

		<div class="col-md-12">
			<div class="form-group">
				<label>Select 1 change select 2 (AJAX)</label>
				<select class="form-control" id="change1">
					<option>Select Value</option>
				</select>
			</div>
		</div>

		<div class="col-md-12">
			<div class="form-group">
				<label>Select 2 (AJAX)</label>
				<select class="form-control" id="change2">
					<option>Select Value</option>
				</select>
			</div>
		</div>
	</div>
</div>


<script>
	$("#datatestacb").acmodel();
	$("#datatest").acmodel({
		data:[
			{a:1,b:"text"},
			{a:2,b:"text 1"},
			{a:3,b:"text 2"},
			{a:4,b:"text 3"},
		],
		change:function(){
			$("#datatestacb").acmodel({
				changeData:[
					{a:1,b:"text change 1"},
					{a:2,b:"text change 2"},
					{a:3,b:"text change 3"},
					{a:4,b:"text change 4"},
				]
			});
		}
	});
	$("#test").acmodel({
		url:"test.php"
	});
	$("#test1").acmodel({
		url:"test.php"
	});
	$("#change2").acmodel({
		url:"test.php"
	});
	var change2 = $("#change2").acmodel('return');
	$("#change1").acmodel({
		url:"test.php",
		change:function(){
			var val = $("#change1").val();
			var url = "test1.php?id="+val;
			// change2.setUrl(url);
			$("#change2").acmodel({
				changeUrl:url
			});
		}
	});
</script>
</body>
</html>