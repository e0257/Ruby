<?php
session_start();

if(!isset($_SESSION["session_username"])){
	header("location: login.php");
}?>
<?php require_once("includes/connection.php"); ?>
<?php  
$query=mysql_query("SELECT state, projectId, taskId FROM usertbl WHERE username='".$_SESSION["session_username"]."'");
$stateOfUser = mysql_fetch_row($query);
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>ToDoList</title>
	<link rel="stylesheet" href="CSS/bootstrap.css">
	<link rel="stylesheet" href="CSS/bootstrap-theme.css">
	<link rel="stylesheet" href="CSS/style.css">
	
</head>
<body>
<div class="wrap">
<!-- HEADER -->	
<header>
	<div class = "user"> 
		<span class="glyphicon glyphicon-user"></span>
		<span>Hello, <?php echo $_SESSION['session_username'];?> </span> <br>
  		<a href="logout.php">Logout</a>
  		</div>
	<div class = "HEAD-TEXT"> <h1> SIMPLE TODO LISTS</h1></div>
</header>
<!-- CONTENT -->	
<?php echo '<div id="lastPrId" style="display: none">'.$stateOfUser[1].'</div>' ?>
<?php echo '<div id="lastTaskId" style="display: none">'.$stateOfUser[2].'</div>' ?>
<div class="container-fluid">
	<div class = "row">
 	  <div id = 'content' class = "content col-lg-12 col-md-12 col-sm-12">
	 <?php echo $stateOfUser[0]?> 
  	  </div>
   </div>	
</div>


<div class="pre-footer">

<button id="btnPr" class = "btnAddPr"> <span class="glyphicon glyphicon-plus"></span> Add TODO List</button>
</div>

<footer>
	© 2017 Все права защищены.	
</footer>
	
</div>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script type="text/javascript" src="js/bootstrap.js"></script>
<script type="text/javascript" src="js/main.js"></script>	
</body>
</html>