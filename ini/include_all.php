<?php
error_reporting(E_ALL & ~ E_NOTICE& ~ E_WARNING & ~ E_CORE_WARNING & ~ E_USER_WARNING & ~ E_USER_NOTICE & ~ E_STRICT & ~ E_DEPRECATED);
ini_set('display_errors', 1);

if (! function_exists('__ksace_autoload')) {
    function __ksace_autoload($class_name)
    {
        //$idx = strrpos($class_name, '\\');
        //if ($idx!==false) $class_name = substr($class_name, $idx+1);
        include (str_replace('_', '/', $class_name . '.php'));
    }
}
spl_autoload_register('__ksace_autoload', true);

$__unset_vars = array(
    '_base_dir',
    '_sources_base_dir',
    '_thinkit_shared_dir',
    '_path_dir',
    'APP_language',
    'TEMPLATE_DATA'
);
foreach ($__unset_vars as $k => $v) {
    unset($_GET[$v]);
    unset($_POST[$v]);
}

global $_base_dir;
global $_resources_base_dir;
global $_path_dir;

$ip = getenv('SERVER_ADDR');

$_base_dir = 'http://'.$ip.'/git/ace-kitchen-sink';
$_sources_base_dir = 'http://'.$ip.'/git/ace-kitchen-sink';
$_resources_base_dir = 'http://'.$ip.'/git/ace-kitchen-sink-resources';

if (is_dir('/Volumes/SHARED/www')) {
    $dir_prefix = '/Volumes/SHARED/www';
    $git_dir = '/git';
}else {
    $dir_prefix='D:/www';
}

$_path_dir = $dir_prefix.'/git/ace-kitchen-sink';
$_resources_dir = $dir_prefix.'/git/ace-kitchen-sink-resources';
$_uploads_dir = $dir_prefix.'/git/ace-kitchen-sink/uploads';
$_uploads_path = $_base_dir.'/uploads';

define(__app_session_prefix, 'KSACE_');
define(_base_dir, $_base_dir);
define(_sources_base_dir, $_sources_base_dir);
define(_resources_base_dir, $_resources_base_dir);
define(_uploads_dir, $_uploads_dir);
define(_uploads_path, $_uploads_path);

define(_path_dir, $_path_dir);
define(_resources_dir, $_resources_dir);

ini_set('include_path', '.');

ini_set('session.auto_start', '1');
session_start();
ini_set('display_errors', '1');

include(_path_dir.'/utils/various_utils.php');

srand((double) microtime() * 1000000);

?>