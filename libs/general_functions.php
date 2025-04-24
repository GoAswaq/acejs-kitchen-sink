<?php
	function push_ini_path($iniPath = '') {
		if (is_void($iniPath)) return true;
		ini_get('include_path');
		if ((strpos(__main_strtoupper(PHP_OS), 'WIN') !== false)
		    &&
		   (strtoupper(PHP_OS)!=='DARWIN'))
		    ini_set('include_path', ini_get('include_path').';'.$iniPath);
		else ini_set('include_path', ini_get('include_path').':'.$iniPath);
		return true;
	}

	/**
	 * @return bool
	 * @param var_to_check mixed
	 * @desc This function checks to see if the given varible is NULL or '' as string
	 */
	function is_void($var_to_check) {
		if (is_null($var_to_check)) return true;
		elseif ($var_to_check === '') return true;
		else return false;
	}

	function __main_cnt($arr) {
		return (is_void($arr)) || (!is_countable($arr)) ? 0 : count($arr);
	}
?>
