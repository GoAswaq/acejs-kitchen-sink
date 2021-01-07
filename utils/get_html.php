<?php
    //needed to allow other ajax request for view data to start
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// next two lines are necessary to allow cross domain ajax calls
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	include('../ini/include_all.php');
	
	session_write_close();
	flush();
	
	$__html = $_GET['__html'];
	$actual_file_path = _path_dir.'/layout/html/'.$__html.'.html';
	
	if ( !$__html || !file_exists($actual_file_path)){
	    print('The requested file does not exist: '.$__html.'.html');
	}else{
	    print(file_get_contents($actual_file_path));
	}
?>