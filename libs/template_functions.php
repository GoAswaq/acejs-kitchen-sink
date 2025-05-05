<?php
/**
	Based on the a array of values, this function replaces the variables from a given object of
	 type "PEAR::HTML_IT_IntegratedTemplate" with the values from the array of values, parsing the inner
	 blocks first, in order not to display the same block twice if not needed.


	 this function replaces values by inspecting the current block of the template:

	 if is a normal block: '_field' then it sets this block only once and then it replaces the
	 						variables from this block with the values from the given values array,
	 						if there are defined there and if the type of the variables is not .
	 					   '_option' then this will be seen like a block that has to fill in a select
	 					   	section with many options. Inside of this block the normal variables


*/
function buildValues(&$used_tpl, &$values_array)
{
	$debug_mode = 0;
	$template = $used_tpl->blockvariables;
	$reversed = array_reverse($template);
	global $PRESERVE_NULL_BLOCKS_VARIABLE_NAME;
	global $POSTFIX_FOR_OPTION_BLOCKS;
	global $POSTFIX_FOR_OPTION_BLOCKS_DATA;
	global $POSTFIX_FOR_OPTION_BLOCKS_NAME;
	global $POSTFIX_FOR_OPTION_BLOCKS_VALUE;
	global $POSTFIX_FOR_OPTION_BLOCKS_SELECTED;
	global $POSTFIX_FOR_FIELD_BLOCKS;


	if ($debug_mode) {

        print_a('$PRESERVE_NULL_BLOCKS_VARIABLE_NAME: '. $PRESERVE_NULL_BLOCKS_VARIABLE_NAME);
        print_a('$POSTFIX_FOR_OPTION_BLOCKS: '. $POSTFIX_FOR_OPTION_BLOCKS);
        print_a('$POSTFIX_FOR_OPTION_BLOCKS_DATA: '. $POSTFIX_FOR_OPTION_BLOCKS_DATA);
        print_a('$POSTFIX_FOR_OPTION_BLOCKS_NAME: '. $POSTFIX_FOR_OPTION_BLOCKS_NAME);
        print_a('$POSTFIX_FOR_OPTION_BLOCKS_VALUE: '. $POSTFIX_FOR_OPTION_BLOCKS_VALUE);
        print_a('$POSTFIX_FOR_OPTION_BLOCKS_SELECTED: '. $POSTFIX_FOR_OPTION_BLOCKS_SELECTED);
    }
	foreach($reversed as $tpl_entry => $tpl_val){
		if ($debug_mode) print('<br> Template entry:' . $tpl_entry);
		if ($values_array[$tpl_entry]['show'] != '0') {
            if ($debug_mode) print('<br> Template entry:' . $tpl_entry);
			
		    $my=[];
			if (__main_ereg('^APPLY_FUNCTION_(.*)_ON_(.*)', $tpl_entry, $my)) {
					$ret = $my[1]($values_array[$my[2]]['value']);
					$values_array['RETURN_VALUE_' . $my[1] . '_ON_' . $my[2]]['type'] = 'field';
					$values_array['RETURN_VALUE_' . $my[1] . '_ON_' . $my[2]]['value'] = $ret;
					if ($debug_mode) print('<br> Applying function :' . $my[1] . ' on ' . $my[2] . ' results ' . $ret);
			}

			$my=[];
			if (__main_ereg('^IF_FIELD_VOID_(.*)', $tpl_entry, $my)) {
                    if ($debug_mode) print('<br>Field ' . $values_array['MENU_ENTRY_name']['value'] . ' >>>'. $my[1] . ' == ' . 	$values_array[$my[1]]['value']);
					if (($values_array[$my[1]]['value']==NULL) || ($values_array[$my[1]]['value']=='')) {
						$replaced_vars = 0;
						$used_tpl->setCurrentBlock($tpl_entry);
						foreach ($tpl_val as $k => $v) {
							switch ($values_array[$k]['type']) {
								case 'checkbox' :
												if ($values_array[$k]['value'] == 1) {
													$used_tpl->setVariable($k, 'checked');
													$replaced_vars++;
												}
												else {
													$used_tpl->setVariable($k, $values_array[$k]['value']);
													$replaced_vars++;
												}
												break;
								case 'options' :  break;
								default:
										if (!is_array($values_array[$k]['value']))
											if ((trim($values_array[$k]['value'])!='') || ($k == $PRESERVE_NULL_BLOCKS_VARIABLE_NAME))
											{
												$used_tpl->setVariable($k, $values_array[$k]['value']);
												$replaced_vars++;
											}
										break;
							}
						}
						$used_tpl->parseCurrentBlock($tpl_entry);
						if ($replaced_vars == 0) $used_tpl->touchBlock($tpl_entry);
					}
			}
			else{
			    $my = [];
			    if (__main_ereg('^IF_FIELD_NOT_VOID_(.*)', $tpl_entry, $my)) {
                        if ($debug_mode) print('<br>NOT Field ' . $my[1] . ' == ' . 	$values_array[$my[1]]['value']);
    					if (($values_array[$my[1]]['value']!=NULL) && ($values_array[$my[1]]['value']!='')) {
    						$replaced_vars = 0;
    						$used_tpl->setCurrentBlock($tpl_entry);
    						foreach ($tpl_val as $k => $v) {
    							switch ($values_array[$k]['type']) {
    								case 'checkbox' :
    												if ($values_array[$k]['value'] == 1) {
    													$used_tpl->setVariable($k, 'checked');
    													$replaced_vars++;
    												}
    												else {
    													$used_tpl->setVariable($k, $values_array[$k]['value']);
    													$replaced_vars++;
    												}
    												break;
    								case 'options' :  break;
    								default:
    										if (!is_array($values_array[$k]['value']))
    											if ((trim($values_array[$k]['value'])!='') || ($k == $PRESERVE_NULL_BLOCKS_VARIABLE_NAME))
    											{
    												$used_tpl->setVariable($k, $values_array[$k]['value']);
    												$replaced_vars++;
    											}
    										break;
    							}
    						}
    						$used_tpl->parseCurrentBlock($tpl_entry);
    						if ($replaced_vars == 0) $used_tpl->touchBlock($tpl_entry);
    					}
    			}
    			else{
    			    $my = [];
    			    if (__main_ereg('^IF_FIELD_(.*)_IS_(.*)', $tpl_entry, $my)) {
                            if ($debug_mode) {
                                print('<br>'. $my[1] . ' == ');
                                var_dump($my[2]);
                                print('<br> should be ');
                                var_dump($values_array[$my[1]]['value']);
                            }
        					if ($values_array[$my[1]]['value'] == $my[2]) {
        						//print('  OKAY ');
        						$replaced_vars = 0;
        						$used_tpl->setCurrentBlock($tpl_entry);
        						foreach ($tpl_val as $k => $v) {
        							switch ($values_array[$k]['type']) {
        								case 'checkbox' :
        												if ($values_array[$k]['value'] == 1) {
        													$used_tpl->setVariable($k, 'checked');
        													$replaced_vars++;
        												}
        												else {
        													$used_tpl->setVariable($k, $values_array[$k]['value']);
        													$replaced_vars++;
        												}
        												break;
        								case 'options' :  break;
        								default:
        										if (!is_array($values_array[$k]['value']))
        											if ((trim($values_array[$k]['value'])!='') || ($k == $PRESERVE_NULL_BLOCKS_VARIABLE_NAME))
        											{
        												$used_tpl->setVariable($k, $values_array[$k]['value']);
        												$replaced_vars++;
        											}
        										break;
        							}
        						}
        						$used_tpl->parseCurrentBlock($tpl_entry);
        						if ($replaced_vars == 0) $used_tpl->touchBlock($tpl_entry);
        					}
        			}
        			else{
        			    $my = [];
        			    if (__main_ereg('^IF_NOT_FIELD_(.*)_IS_(.*)', $tpl_entry, $my)) {
                                if ($debug_mode) print('^IF_NOT_FIELD_(.*)_IS_(.*)');
            					if ($values_array[$my[1]]['value'] != $my[2]) {
            						$replaced_vars = 0;
            						$used_tpl->setCurrentBlock($tpl_entry);
            						foreach ($tpl_val as $k => $v) {
            							switch ($values_array[$k]['type']) {
            								case 'checkbox' :
            												if ($values_array[$k]['value'] == 1) {
            													$used_tpl->setVariable($k, 'checked');
            													$replaced_vars++;
            												}
            												else {
            													$used_tpl->setVariable($k, $values_array[$k]['value']);
            													$replaced_vars++;
            												}
            												break;
            								case 'options' :  break;
            								default:
            										if (!is_array($values_array[$k]['value']))
            											if ((trim($values_array[$k]['value'])!='') || ($k == $PRESERVE_NULL_BLOCKS_VARIABLE_NAME))
            											{
            												$used_tpl->setVariable($k, $values_array[$k]['value']);
            												$replaced_vars++;
            											}
            										break;
            							}
            						}
            						$used_tpl->parseCurrentBlock($tpl_entry);
            						if ($replaced_vars == 0) $used_tpl->touchBlock($tpl_entry);
            					}
            			}
            			elseif (substr($tpl_entry, strlen($tpl_entry) - strlen($POSTFIX_FOR_OPTION_BLOCKS),  strlen($tpl_entry)) == $POSTFIX_FOR_OPTION_BLOCKS) {
            			//this is a options in a select block and will be parsed for count($values_array[$tpl_entry . $POSTFIX_FOR_OPTION_BLOCKS_DATA]['value']) times
            			//if the type of the $values_array[$tpl_entry. $POSTFIX_FOR_OPTION_BLOCKS_DATA]['type'] is 'options' and if $values_array[$tpl_entry. $POSTFIX_FOR_OPTION_BLOCKS_DATA]['value']
            			//is an array;
                                if ($debug_mode) print('this is a options in a select block and will be parsed for count... POSTFIX_FOR_OPTION_BLOCKS:' . $POSTFIX_FOR_OPTION_BLOCKS);
                                if (($values_array[$tpl_entry . $POSTFIX_FOR_OPTION_BLOCKS_DATA]['type'] == 'options') && (is_array($values_array[$tpl_entry. $POSTFIX_FOR_OPTION_BLOCKS_DATA]['value']))) {
            					foreach ($values_array[$tpl_entry. $POSTFIX_FOR_OPTION_BLOCKS_DATA]['value'] as $option_k => $option_v) {
            						$used_tpl->setCurrentBlock($tpl_entry);
            						foreach ($tpl_val as $k => $v) {
            							//print('<br> ' . $k . ' == ' . $option_v['name']);
            							if ($k == $tpl_entry . $POSTFIX_FOR_OPTION_BLOCKS_NAME) {
            								$used_tpl->setVariable($k, $option_v['name']);
            							}
            							elseif ($k == $tpl_entry . $POSTFIX_FOR_OPTION_BLOCKS_VALUE) {
            								$used_tpl->setVariable($k, $option_v['value']);
            							}
            							elseif ($k == $tpl_entry . $POSTFIX_FOR_OPTION_BLOCKS_SELECTED) {
            								$used_tpl->setVariable($k, $option_v['selected']);
            							}
            							else {
            								if ((isset($option_v[$k])) && (is_array($option_v[$k]))) {
            									switch ($option_v[$k]['type']) {
            										case 'checkbox' :
            														if ($option_v[$k]['value'] == 1) $used_tpl->setVariable($k, 'checked');
            														else $used_tpl->setVariable($k, $option_v[$k]['value']);
            														break;
            										default:
            												if ((trim($option_v[$k]['value'])!='') || ($k == $PRESERVE_NULL_BLOCKS_VARIABLE_NAME))
            													$used_tpl->setVariable($k, $option_v[$k]['value']);
            												break;
            									}
            								}
            								else {
            									switch ($values_array[$k]['type']) {
            										case 'checkbox' :
            														if ($values_array[$k]['value'] == 1) $used_tpl->setVariable($k, 'checked');
            														else $used_tpl->setVariable($k, $values_array[$k]['value']);
            														break;
            										default:
            												if ((trim($values_array[$k]['value'])!='') || ($k == $PRESERVE_NULL_BLOCKS_VARIABLE_NAME))
            													$used_tpl->setVariable($k, $values_array[$k]['value']);
            												break;
            									}
            								}
            							}
            						}
            						$used_tpl->parseCurrentBlock($tpl_entry);
            					}
            				}
            			}
            			else { //if (substr($tpl_entry, strlen($tpl_entry) - strlen($POSTFIX_FOR_FIELD_BLOCKS),  strlen($tpl_entry)) == $POSTFIX_FOR_FIELD_BLOCKS)
            			    //here i'm in a field or something like this block!
            			    if ($debug_mode) print('<br> Normal field');
            				$used_tpl->setCurrentBlock($tpl_entry);
            				foreach ($tpl_val as $k => $v) {
            					if ($debug_mode) print('<br> &nbsp;&nbsp;&nbsp;Variable = ' . $k  . ' == ' . $values_array[$k]['value'] . ' --- type == ' . $values_array[$k]['type']);
            					switch ($values_array[$k]['type']) {
            						case 'checkbox' :
            										if ($values_array[$k]['value'] == 1) $used_tpl->setVariable($k, 'checked');
            										else $used_tpl->setVariable($k, $values_array[$k]['value']);
            										break;
            						case 'options' :  break;
            						default:
            								if (!is_array($values_array[$k]['value']))
            									if ((trim($values_array[$k]['value'])!='') || ($k == $PRESERVE_NULL_BLOCKS_VARIABLE_NAME))
            									{
            										$used_tpl->setVariable($k, $values_array[$k]['value']);
            									}
            								break;
            					}
            				}
            				$used_tpl->parseCurrentBlock($tpl_entry);
        			   }
        			}
    			}
			}
		}/////////////////////
		else{
            if ($debug_mode) print('<br>Ignoring: ' .  $tpl_entry);
		}

	}
}

/*
$tpl = new HTML_IT_IntegratedTemplate();
$template_file = 'test.tpl.html';
//print($template_file);
$tpl->loadTemplatefile($template_file , true, true);

print('<pre>');
print('<hr>');
print_r($tpl->blockvariables);
print('<hr>');
print('</pre>');

$options_vals = array();

$options_vals[0]['name'] = 'zero';
$options_vals[0]['value'] = '0';
$options_vals[0]['selected'] = '';

$options_vals[1]['name'] = 'unu';
$options_vals[1]['value'] = '1';
$options_vals[1]['selected'] = 'selected';

$options_vals[2]['name'] = 'doi';
$options_vals[2]['value'] = '2';
$options_vals[2]['selected'] = 'selected';


$vals = array();

$vals['ARTICLES_article_id_value']['value'] = 1;
$vals['ARTICLES_article_id_value']['type'] = 'field';
$vals['ARTICLES_article_id_inner1_value']['value'] = '';
$vals['ARTICLES_article_id_inner1_value']['type'] = 'field';
$vals['ARTICLES_article_id_inner_value']['value'] = '3';
$vals['ARTICLES_article_id_inner_value']['type'] = 'field';
$vals['ARTICLES_title_value']['value'] = '4';
$vals['ARTICLES_title_value']['type'] = 'field';
$vals['ARTICLES_title_field']['show'] = '1';
$vals['ARTICLES_article_id_innerrest_value']['value'] = 'checked';
$vals['ARTICLES_article_id_innerrest_value']['type'] = 'checkbox';
$vals['ARTICLES_article_id_inner2_option_data']['value'] = $options_vals;
$vals['ARTICLES_article_id_inner2_option_data']['type'] = 'options';

$vals['TPL_display_anyway']['value'] ='';

buildValues(&$tpl, &$vals);

$tpl->show();
*/

	function return_parsed_template_file($template_file, &$template_data_arr='', $dont_parse_error_file = true) {
		global $TEMPLATE_DATA;

		if ($template_file == '') return '';

		//print('<br>' . $template_file);
		$tpl = new HTML_IT_IntegratedTemplate();
		$tpl->loadTemplatefile($template_file, true, true);

		if (is_void($template_data_arr)) buildValues($tpl, $TEMPLATE_DATA);
		else buildValues($tpl, $template_data_arr);

		$template_content = $tpl->get();
		//loading errors for AJAX calls
		if ((!$dont_parse_error_file) && (file_exists($_SESSION[__app_session_prefix.'TemplatePath'].'shared/error_notice_vars.tpl.html'))) {
			$tpl->loadTemplatefile($_SESSION[__app_session_prefix.'TemplatePath'].'shared/error_notice_vars.tpl.html', true, true);

			if (is_void($template_data_arr)) buildValues($tpl, $TEMPLATE_DATA);
			else buildValues($tpl, $template_data_arr);

			$template_content .= $tpl->get();
		}
		return $template_content;
	}

	function return_parsed_template_text($template_text, &$template_data_arr='') {
		global $TEMPLATE_DATA;

		if ($template_text == '') return '';

		//print('<br>' . $template_file);
		$tpl = new HTML_IT_IntegratedTemplate();
		$tpl->setTemplate($template_text, true, true);

		if (is_void($template_data_arr)) buildValues($tpl, $TEMPLATE_DATA);
		else buildValues($tpl, $template_data_arr);

		return $tpl->get();
	}

?>