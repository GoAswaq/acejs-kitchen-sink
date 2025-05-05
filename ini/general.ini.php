<?php
	global $TEMPLATE_DATA;
	$ARTICLE_TABLE_TEMPLATE_PREFIX = "ARTICLES_";

	$Date_separator = '/';
	/**
		variables needed for automatic template processing
	*/
	$PRESERVE_NULL_BLOCKS_VARIABLE_NAME = 'TPL_display_anyway'; //name of the variable which if is present, preserves an empty block
	$POSTFIX_FOR_FIELD_BLOCKS = '_field'; //post fix for a template variable name that represents a normal field that do not need special processing - only replaceing
	$POSTFIX_FOR_OPTION_BLOCKS = '_option';//post fix for a template variable name that represents a option field -> for this field the processing will iterate through an array and this will be the result of many options
	$POSTFIX_FOR_OPTION_BLOCKS_DATA = '_data';
	$POSTFIX_FOR_OPTION_BLOCKS_NAME = '_name';
	$POSTFIX_FOR_OPTION_BLOCKS_VALUE = '_value';
	$POSTFIX_FOR_OPTION_BLOCKS_SELECTED = '_selected';
	$APP_records_per_page = 10;

	$TEMPLATE_DATA = array();
	$TEMPLATE_DATA[$GLOBALS['PRESERVE_NULL_BLOCKS_VARIABLE_NAME']]['type'] ='field';
	$TEMPLATE_DATA[$GLOBALS['PRESERVE_NULL_BLOCKS_VARIABLE_NAME']]['value'] ='';
    $TEMPLATE_DATA['APP_language']['type'] ='field';
	$TEMPLATE_DATA['APP_language']['value'] =$_SESSION[__app_session_prefix.'APP_language'];
	$TEMPLATE_DATA['APP_version']['type'] ='field';
    $TEMPLATE_DATA['APP_version']['value'] ='2.1.21';
    $TEMPLATE_DATA['APP_js_version']['value'] = '2024121100';
	$TEMPLATE_DATA['APP_name']['type'] ='field';
	$TEMPLATE_DATA['APP_name']['value'] ='WiseMED';
	$TEMPLATE_DATA['TPL_break_line']['type'] ='field';
	$TEMPLATE_DATA['TPL_break_line']['value'] ='<br>';
	$TEMPLATE_DATA['controller_filename']['type'] = 'field';
	$TEMPLATE_DATA['controller_filename']['value'] = _base_dir . '/' . 'index.php';
	$TEMPLATE_DATA['app_path']['type'] = 'field';
	$TEMPLATE_DATA['app_path']['value'] = _base_dir . '/';
	$TEMPLATE_DATA['sources_path']['type'] = 'field';
	$TEMPLATE_DATA['sources_path']['value'] = _sources_base_dir . '/';
	$TEMPLATE_DATA['layout_path']['type'] = 'field';
	$TEMPLATE_DATA['layout_path']['value'] = 'layout/';
	$TEMPLATE_DATA['app_layout_path']['type'] = 'field';
	$TEMPLATE_DATA['app_layout_path']['value'] = _base_dir.'/layout/';
	$TEMPLATE_DATA['layout_imgs_path']['type'] = 'field';
	$TEMPLATE_DATA['layout_imgs_path']['value'] = 'layout/imgs/';
	$TEMPLATE_DATA['layout_unit_imgs_path']['type'] = 'field';
	$TEMPLATE_DATA['layout_unit_imgs_path']['value'] = 'layout/imgs/unit/';
	$TEMPLATE_DATA['editor_imgs_path']['type'] = 'field';
	$TEMPLATE_DATA['editor_imgs_path']['value'] = 'layout/imgs/editor/';
	$TEMPLATE_DATA['layout_css_path']['type'] = 'field';
	$TEMPLATE_DATA['layout_css_path']['value'] = 'layout/js_css/';
	$TEMPLATE_DATA['layout_activex_path']['type'] = 'field';
	$TEMPLATE_DATA['layout_activex_path']['value'] = 'layout/activex/';
	$TEMPLATE_DATA['pdf_save_path']['type'] = 'field';
	$TEMPLATE_DATA['pdf_save_path']['value'] = $GLOBALS['_path_dir'] . '/buletine_pdf/';
	$TEMPLATE_DATA['pdf_get_path']['type'] = 'field';
	$TEMPLATE_DATA['pdf_get_path']['value'] = 'buletine_pdf/';
	$TEMPLATE_DATA['layout_js_path']['type'] = 'field';
	$TEMPLATE_DATA['layout_js_path']['value'] = 'layout/js_css/';

	global $__accepted_languages_settings;
	if (
    (isset($__accepted_languages_settings)) &&
    (isset($__accepted_languages_settings[$_SESSION[__app_session_prefix.'APP_language']])) &&
    (isset($__accepted_languages_settings[$_SESSION[__app_session_prefix.'APP_language']]['text_direction'])) &&
    ($__accepted_languages_settings[$_SESSION[__app_session_prefix.'APP_language']]['text_direction']!=='rtl')
    ){
	    $TEMPLATE_DATA['APP_language_txt_dir']['value']='ltr';
	    $TEMPLATE_DATA['ltr_lft_name']['value']='left';
	    $TEMPLATE_DATA['ltr_rght_name']['value']='right';
	}
	else {
	    $TEMPLATE_DATA['APP_language_txt_dir']['value']='rtl';
	    $TEMPLATE_DATA['ltr_lft_name']['value']='right';
	    $TEMPLATE_DATA['ltr_rght_name']['value']='left';
	}
?>