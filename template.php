<?php
//! ACE Kitchen Sink
//! version : 1.0
//! authors : Radu ICHIM <radu.ichim@think-it.ro>, Silviu MORMOCEA <silviu.mormocea@think-it.ro> authors of ace.js
//! license : MIT
//! momentjs.com

include ('ini/include_all.php');

$key_prefix = '_';
$key_prefix_length = 1;

//parsing all the possible relevant data
foreach($_POST as $key=>$val){
    $$key = $val;
    if (!is_array($val)) {
        if ($key[0]===$key_prefix) $APP_data[substr($key,$key_prefix_length)] = $val;
    }
    //print_a("$key = $val;");
}

foreach($_GET as $key=>$val)
{
    $$key = $val;
    if (!is_array($val)) {
        if ($key[0]===$key_prefix) $APP_data[substr($key,$key_prefix_length)] = $val;
    }
}

$payload = '';
$fp = fopen('php://input','r');
while (!feof($fp)) {
    $payload .= fgets($fp);
}

fclose($fp);
if (isset($payload)) {
    try {
        try{
            $arr_payload = json_decode($payload,true);
        }
        catch(Exception $e){
            $received = explode('&',$payload);
            $arr_payload = array();
            foreach($received as $value) {
                $val = explode('=',$value);
                $arr_payload[$val[0]] = $val[1];
            }
        }

        $__input_data['payload']=$arr_payload;
        foreach($arr_payload as $key=>$val) {
            $$key = $val;
            if (!is_array($val)) {
                if ($key[0]===$key_prefix) $APP_data[substr($key,$key_prefix_length)] = $val;
            }
        }
    }
    catch (Exception $e) {
    }
}
$TEMPLATE_DATA['cmd']['value'] = $cmd;
switch ($cmd) {
    case "s2":    $tpl_name = 'second.tpl.html';
                break;
    case "s3":    $tpl_name = 'third.tpl.html';
                $TEMPLATE_DATA['li_options_option_data']['type'] = 'options';
                $TEMPLATE_DATA['li_options_option_data']['value'] = [];
                for($idx=1;$idx<10;$idx++) {
                    $no_opts = count($TEMPLATE_DATA['li_options_option_data']['value']);
                    $TEMPLATE_DATA['li_options_option_data']['value'][$no_opts]['opt_idx']['value'] = $idx;
                    $TEMPLATE_DATA['li_options_option_data']['value'][$no_opts]['opt_name']['value'] = 'Optiunea este '. ($idx % 2 == 0 ? 'PARA' : 'IMPARA');
                }
                break;
    default:    $tpl_name = 'first.tpl.html';
                break;
}

print(return_parsed_template_file(_path_dir.'/layout/tpls/'.$tpl_name, $TEMPLATE_DATA, true, true));

?>