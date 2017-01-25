<?php
	session_start();
	?>
<?php require_once("includes/connection.php"); ?>
<?php 

$stateOfUser = $_POST['state'];
$projectId = $_POST['projectId'];
$taskId = $_POST['taskId'];

if(isset($_SESSION["session_username"])){
	

	$query=mysql_query("SELECT * FROM usertbl WHERE username='".$_SESSION["session_username"]."'");
	$numrows=mysql_num_rows($query);
	if($numrows!=0){
		$sql = "UPDATE usertbl set state = '$stateOfUser' WHERE username='".$_SESSION["session_username"]."'";
		mysql_query($sql);
		
		if ($projectId) {
			
		$sql = "UPDATE usertbl set projectId = $projectId WHERE username='".$_SESSION["session_username"]."'";
		mysql_query($sql);
		};
	}

	if ($taskId) {
		$sql = "UPDATE usertbl set taskId = ".$taskId." WHERE username='".$_SESSION["session_username"]."'";
		mysql_query($sql);
	};
}


?>