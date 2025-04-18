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

$actual_main_page = 'main_page.html';
$custom_content = '';

global $fid,$cmd;
switch( $fid ){

    case 'loadstudents'://this returns all students

        switch( $cmd ){
            case 'create':
            case 'update':

                if( !$_SESSION[__app_session_prefix]['extra_student'] ){
                    $_SESSION[__app_session_prefix]['extra_student'] = [];
                }

                $new_student_data = ['student_name'=>$student_name,'student_id'=>time()];
                $_SESSION[__app_session_prefix]['extra_students'][] = $new_student_data;

                print(json_encode(['success'=>true,'data'=>$new_student_data]));
                break;

            default:
                global $students;
                include(_path_dir.'/datastores/students.php');
                print(json_encode(['success'=>true,'rows'=>$students,'totalCount'=>count($students)]));
        }
        die();

    case 'loadstudentsfilter'://the students list is filtered by query, size and limit
        global $students;
        include(_path_dir.'/datastores/students.php');

        global $query,$queries,$start,$limit;
        $limit = intval($limit);
        $start = intval($start);

        if( $limit < 0 ){
            $limit = 25;
        }

        if( $start < 0 ){
            $start = 0;
        }

        $search_terms = [];
        $all_conditions = false;
        if( isset($queries) ){
            $all_conditions = true;
            $search_terms = explode(';', trim($queries));
        }elseif( isset($query) ){
            $search_terms = explode(';', trim($query));
        }

        $filtered_array = filter_array_data($students,$search_terms,$all_conditions);

        print(json_encode([
            'success'=>true,
            'rows'=>get_pagination_from_array($filtered_array, $start,$limit),
            'totalCount'=>count($filtered_array)])
        );

        die();

    case 'loadcountries'://this returns all countries

        global $countries;
        include(_path_dir.'/datastores/countries.php');
        print(json_encode(['success'=>true,'rows'=>$countries,'totalCount'=>count($countries)]));

        die();

    case 'loadcountriesfilter'://this returns all countries

        global $countries;
        include(_path_dir.'/datastores/countries.php');

        global $query,$queries,$start,$limit;
        $limit = intval($limit);
        $start = intval($start);

        if( $limit < 0 ){
            $limit = 25;
        }

        if( $start < 0 ){
            $start = 0;
        }

        $search_terms = [];
        $all_conditions = false;
        if( isset($queries) ){
            $all_conditions = true;
            $search_terms = explode(';', trim($queries));
        }elseif( isset($query) ){
            $search_terms = explode(';', trim($query));
        }

        $filtered_array = filter_array_data($countries,$search_terms,$all_conditions);

        print(json_encode([
            'success'=>true,
            'rows'=>get_pagination_from_array($filtered_array, $start,$limit),
            'totalCount'=>count($filtered_array)])
        );

        die();

    case 'uploadimage':

        global $delete_file_operation,$delete_file_name;
        if( $delete_file_operation == '-' && $delete_file_name ){
            delete_uploaded_file($delete_file_name);
            print(json_encode([
                'success'=>true,
            ]));

            die();
        }

        $error_msg = '';
        $upload_file_data = save_uploaded_file('upload_image_file',$error_msg);
        if( $upload_file_data === false ){
            print(json_encode([
                'success'=>false,
                'error'=>'Something went wrong when saving the uploaded file'
            ])
            );

            die();
        }

        print(json_encode([
            'success'=>true,
            'data'=>$upload_file_data]));

        die();

        break;

    case 'evenvalidation':
        global $even_number;
        $number = intval($even_number);
        if( $number % 2 == 0 && strval($number) == $even_number ){
            print(json_encode([
                'success'=>true,
                'data' => [
                    'even_number' => $number
                ]
            ])
            );
        }else{
            print(json_encode([
                'success'=>false,
                'error' => 'Houps, the text entered is not exactly an even number, or it contains illigal charactes. Please try again!'
            ])
            );
        }
        die();

    case 'getremotedata':
        print(json_encode([
            'success'=>true,
            'data' => [
                'field_1' => 'This Message',
                'field_2' => 'was loaded',
                'field_3' => 'from the Server',
            ]
        ])
        );
        die();
        break;

    case 'testview':
        $actual_main_page = 'test_view.html';
        break;

    case 'appview':
        $actual_main_page = 'app_view.html';
        break;

    case 'appview_v2':
        $actual_main_page = 'app_view_v2.html';
        break;

    case 'readme':
        $actual_main_page = 'readme.html';
        require_once(_path_dir.'/libs/parsedown-1.7.4/Parsedown.php');
        $Parsedown = new Parsedown();
        $custom_content = $Parsedown->text(file_get_contents(_path_dir.'/documentation/general_readme_first.md'));

    default:
        /*
         * assumed it is a normal page request
         */
        break;

}

/*
 * cleaning up the session
 */
$_SESSION[__app_session_prefix] = [];

$page_content = file_get_contents(_path_dir.'/layout/html/main/'.$actual_main_page);

/*
 * based on the current cookies, we'll make a few modifications to the main page
 * 
 * step 1: determing the lage alignament, ltr or rt;
 */
$page_alignement = $_COOKIE['ks_algn'] != 'rtl' ? 'ltr' : 'rtl';

/*
 * step 2: determining the theme used, if any
 */
$page_themes = '';
switch( $_COOKIE['ks_theme'] ){

    case 'beyond':
        $page_themes = '<link href="https://cdn.jsdelivr.net/gh/GoAswaq/acejs/themes/beyond/beyond.css" type="text/css" rel="stylesheet" />';
        break;

    case 'deepsea':
        $page_themes = '<link href="https://cdn.jsdelivr.net/gh/GoAswaq/acejs/themes/deep-sea/deep-sea.css" type="text/css" rel="stylesheet" />';
        break;

    case 'flex':
        $page_themes = '<link href="https://cdn.jsdelivr.net/gh/GoAswaq/acejs/themes/flex-theme/flex-theme.css" type="text/css" rel="stylesheet" />';
        break;

    case 'rubystone':
        $page_themes = '<link href="https://cdn.jsdelivr.net/gh/GoAswaq/acejs/themes/ruby-stone/fx.css" type="text/css" rel="stylesheet" />
                        <link href="https://cdn.jsdelivr.net/gh/GoAswaq/acejs/themes/ruby-stone/base-stone.css" type="text/css" rel="stylesheet" />
                        <link href="https://cdn.jsdelivr.net/gh/GoAswaq/acejs/themes/ruby-stone/ruby-stone.css" type="text/css" rel="stylesheet" />';
        break;

    case 'whitestone':
        $page_themes = '<link href="https://cdn.jsdelivr.net/gh/GoAswaq/acejs/themes/white-stone/fx.css" type="text/css" rel="stylesheet" />
                        <link href="https://cdn.jsdelivr.net/gh/GoAswaq/acejs/themes/ruby-stone/base-stone.css" type="text/css" rel="stylesheet" />
                        <link href="https://cdn.jsdelivr.net/gh/GoAswaq/acejs/themes/white-stone/white-stone.css" type="text/css" rel="stylesheet" />';
        break;

    case 'waterflow':
        $page_themes = '<link href="https://cdn.jsdelivr.net/gh/GoAswaq/acejs/themes/waterflow/waterflow.css" type="text/css" rel="stylesheet" />';
        break;

    case 'amethyst':
        $page_themes = '<link href="https://cdn.jsdelivr.net/gh/GoAswaq/acejs/themes/amethyst/amethyst.css" type="text/css" rel="stylesheet" />';
        break;

}


//$css_link = 'https://cdn.jsdelivr.net/gh/GoAswaq/acejs/css/ace.css';
$css_link = 'https://sbox2.7sab.com/thinkITShared///js_csslibs/thinkITJQplugins/ace/css/wisemed_ace.css?v=2.0.1';
//if ($_GET['local']=='1')  $css_link = 'http://127.0.0.1/git/acejs-4/css/scss/ace.css';
//$css_link = 'http://127.0.0.1/git/thinkITShared//js_csslibs/thinkITJQplugins/ace/css/wisemed_ace.css?v=2.0.1';
//$css_link = 'http://127.0.0.1/git/thinkITShared//js_csslibs/thinkITJQplugins/ace/css/7sab_ace.css?v=2.0.1';
//print_a($css_link);

$page_content = str_replace([
    '{__PH_ALGN}',
    '{__PH_THEMES}',
    '{__PH_ACE_TOP_BAR}',
    '{__PH_ACE_SIDE_MENU}',
    '{__PH_ACE_BOTTOM_BAR}',
    '{__PH_ACE_GROUP_MAIN_CONTENT}',
    '{__PH_ACE_CSS_LINK}',
    '{__APP_PATH}',
    '{__CUSTOM_CONTENT}'
],
    [
        $page_alignement,
        $page_themes,
        $_COOKIE['ks_app_tb'] == 1 ? 1 : 0,
        $_COOKIE['ks_app_sm'] == 1 ? 1 : 0,
        $_COOKIE['ks_app_bb'] == 1 ? 1 : 0,
        $_COOKIE['ks_app_gmc'] == 1 ? 1 : 0,
        $css_link,
        _base_dir,
        $custom_content,
    ],
    $page_content);

print $page_content;

?>