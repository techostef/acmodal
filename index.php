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
				<label>Input</label>
				<input class="form-control" id="test">
			</div>
		</div>
		<div class="col-md-12">
			<div class="form-group">
				<label>Select</label>
				<select class="form-control" id="test1">
					<option>Select Value</option>
				</select>
			</div>
		</div>

		<div class="col-md-12">
			<div class="form-group">
				<label>Select 1 change select 2</label>
				<select class="form-control" id="change1">
					<option>Select Value</option>
				</select>
			</div>
		</div>

		<div class="col-md-12">
			<div class="form-group">
				<label>Select 2</label>
				<select class="form-control" id="change2">
					<option>Select Value</option>
				</select>
			</div>
		</div>
	</div>
</div>


<script>
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
			change2.setUrl(url);
		}
	});
</script>
</body>
</html>