<?php
/**
 *
 * the method returns an array, containig all the elements from source_arr which met the given criteria
 * a criteria is validated, if an element of source_arr has at least one field, which is equal, or which contains the given criteria
 *
 * @param array $source_arr an array, in which each element is an associative array
 * @param array $search_terms an, representing a collection of search criteria
 * @param bool $all_conditions - true, if all conditions must be met
 */
function filter_array_data(&$source_arr, &$search_terms, $all_conditions = false){

    if( count($search_terms) == 0 ){
        return $source_arr;
    }

    $filtered_data = array();

    foreach( $search_terms as &$criteria){
        $criteria = strtolower(trim($criteria));
    }
    unset($criteria);

    foreach($source_arr as &$source ){

        $matched_criterias_map = array();

        foreach($source as $k => $v ){

            $v = strtolower($v);

            foreach( $search_terms as $criteria ){

                if( $criteria == '' ){
                    continue;
                }

                if( $criteria == $v || strpos($v, $criteria) !== false ){
                    $matched_criterias_map[$criteria] = true;
                }

            }
        }

        if(     ($all_conditions && count(array_keys($matched_criterias_map)) == count($search_terms) )
            ||  (!$all_conditions && count(array_keys($matched_criterias_map)) > 0 )
        ){

            $filtered_data[] = $source;
        }

    }
    unset($source);

    return $filtered_data;
}

function get_pagination_from_array(&$source_arr, $start = 0, $limit = 25){
    $paged_data = array();

    $actual_limit = min( count($source_arr), $start+$limit);

    for($idx = $start; $idx < $actual_limit; $idx++){

        $paged_data[] = $source_arr[$idx];
    }

    return $paged_data;
}

function print_a($print_array ='', $editable=false, $formatted=false)
{
    $style='';
    if ($formatted) {
        $style = ' style="width:100%;height:30%;border:2px solid lightgray;padding:20px;font-family:courier, courier new;color:green;"';
    }
    $start_tag = '<pre'.$style.'>';
    $end_tag = '</pre>';
    if ($editable) {
        $start_tag = '<textarea'.$style.'>';
        $end_tag = '</textarea>';
    }

    if (is_array($print_array))
    {
        print($start_tag);
        print_r($print_array);
        print($end_tag);
    }
    else
    {
        if ($formatted) {
            print($start_tag);
            var_dump($print_array);
            print($end_tag);
        }
        else {
            print('<br>');
            var_dump($print_array);
        }
    }
}

function save_uploaded_file($uploaded_file_name, &$error_msg){
    /*
     *  check uploads for user profile
     */
    if( !$_FILES[$uploaded_file_name] || !is_uploaded_file($_FILES[$uploaded_file_name]['tmp_name']) ){
        $error_msg = 'The uploaded file could not be detected';
        return false;
    }

    if (! is_dir(_uploads_dir)) {
        if (! rmkdir(_uploads_dir, 0777)) {
            $error_msg = 'Failed to create uploads directory!';
            return false;
        }
    }

    if (!move_uploaded_file($_FILES[$uploaded_file_name]['tmp_name'], _uploads_dir.'/'.$_FILES['upload_image_file']['name'])) {
        $error_msg = 'Failed to save the uplaoded file!';
        return false;
    }

    return array(
        $uploaded_file_name.'_path' => _uploads_path.'/'.$_FILES['upload_image_file']['name'],
        $uploaded_file_name.'_iconcls' => get_extension_iconcls($_FILES['upload_image_file']['name'])
    );

}

function get_extension_iconcls($file_name) {

    $extension = pathinfo($file_name, PATHINFO_EXTENSION);

    switch( $extension ){
        case 'pdf': return 'fal fa-file-pdf';
        case 'txt': return 'fal fa-file-alt';
        default: return 'fal fa-file';
    }

}

function delete_uploaded_file($uploaded_file_name){
    unlink(_uploads_dir.'/'.$uploaded_file_name);
}

function rmkdir($path, $mode = 0755) {
    $path = rtrim(preg_replace(array("/\\\\/", "/\/{2,}/"), "/", $path), "/");
    $e = explode("/", ltrim($path, "/"));
    if(substr($path, 0, 1) == "/") {
        $e[0] = "/".$e[0];
    }
    $c = count($e);
    $cp = $e[0];
    for($i = 1; $i < $c; $i++) {
        if(!is_dir($cp) && !@mkdir($cp, $mode)) {
            return false;
        }
        $cp .= "/".$e[$i];
    }
    return @mkdir($path, $mode);
}

?>