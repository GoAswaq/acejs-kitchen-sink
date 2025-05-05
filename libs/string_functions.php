<?php
function __main_mail($to, $subject, $message , $additional_headers = null, $additional_parameter = null) {
	//mail();
	if (is_void($additional_headers)) {
		return send_mail($to, $subject, $message);
	}
	else {
		if (is_void($additional_parameter)) return send_mail($to, $subject, $message , $additional_headers);
		else return send_mail($to, $subject, $message , $additional_headers, $additional_parameter);
	}
}

function __main_strlen($str) {
	//strlen()
	return strlen($str);
}

function __main_strlen_real_bytes($str) {
	//strlen()
	return strlen($str, '8bit');
}

function __main_strpos($haystack, $needle, $offset = null) {
	//strpos()
	if (is_void($offset)) return strpos($haystack, $needle);
	else return strpos($haystack, $needle, $offset);
}

function __main_strrpos($haystack, $needle, $offset = null) {
	//strrpos()
	if (is_void($offset)) return strrpos($haystack, $needle);
	else return strrpos($haystack, $needle, $offset);
}

function __main_strreplace($search, $replace, $subject, $count = null) {
	return str_replace($search, $replace, $subject, $count);
}

function __main_substr($str,$start,$length = null) {
	//substr()
	//if (is_void($length)) $length = __main_strlen($str);
	if (is_void($length)) return substr($str,$start);
	return substr($str,$start,$length);
}

function __main_strtolower($str) {
	//strtolower()
	return strtolower($str);
}

function __main_strtoupper($str) {
	//strtoupper()
	return strtoupper($str);
}

function __main_substr_count($haystack,$needle) {
	//substr_count()
	return substr_count($haystack,$needle);
}

function __main_ereg($pattern,$string,&$regs = null) {
    if( function_exists('ereg') ){
    	if ($regs === null ){
    	    return ereg($pattern,$string);
    	}
    	return ereg($pattern,$string,$regs);
    }else{
        if (is_void($regs)) return preg_match('/'.addcslashes($pattern, '/').'/',$string);
        return preg_match('/'.addcslashes($pattern, '/').'/',$string, $regs);
    }
}

function __main_eregi($pattern,$string,&$regs = null) {

    if( function_exists('eregi') ){
         if ($regs === null) return eregi($pattern,$string);
     	return eregi($pattern,$string,$regs);
    }else{
        if (is_void($regs)) return preg_match('/'.addcslashes($pattern, '/').'/i',$string);
        return preg_match('/'.addcslashes($pattern, '/').'/i',$string, $regs);
    }
}

function __main_ereg_replace($pattern, $replacement, $string, $option=null) {
    if( function_exists('ereg_replace') ){
    	return ereg_replace($pattern, $replacement, $string);
    }else{
        return preg_replace('/'.addcslashes($pattern, '/').'/',$replacement,$string, $option);
    }
}

function __main_eregi_replace($pattern, $replacement, $string, $option=null) {
    if( function_exists('eregi_replace') ){
        return eregi_replace($pattern, $replacement, $string);
    }else{
        return preg_replace('/'.addcslashes($pattern, '/').'/i',$replacement,$string, $option);
    }
}

function __main_split($pattern,$string,$limit = null) {
	//split()
	//regex_encoding() ;
	if (is_void($limit)) return explode($pattern,$string);
	else return explode($pattern,$string,$limit);
}


function safe_json_encode($value){
    if (version_compare(PHP_VERSION, '5.4.0') >= 0) {
        $encoded = json_encode($value);
    } else {
        $encoded = json_encode($value);
    }
    switch (json_last_error()) {
        case JSON_ERROR_NONE:
            return $encoded;
        case JSON_ERROR_DEPTH:
            return 'Maximum stack depth exceeded'; // or trigger_error() or throw new Exception()
        case JSON_ERROR_STATE_MISMATCH:
            return 'Underflow or the modes mismatch'; // or trigger_error() or throw new Exception()
        case JSON_ERROR_CTRL_CHAR:
            return 'Unexpected control character found';
        case JSON_ERROR_SYNTAX:
            return 'Syntax error, malformed JSON'; // or trigger_error() or throw new Exception()
        case JSON_ERROR_UTF8:
            $clean = utf8ize($value);
            return safe_json_encode($clean);
        default:
            return 'Unknown error'; // or trigger_error() or throw new
            Exception();
    }
}


function utf8ize($mixed) {
    if (is_array($mixed)) {
        foreach ($mixed as $key => $value) {
            $mixed[$key] = utf8ize($value);
        }
    } else if (is_string ($mixed)) {
        return utf8_encode($mixed);
    }
    return $mixed;
}

function __main_json_encode($valueToEncode, $cycleCheck = false) {
	/*require_once 'Zend/Json.php';
	$res = Zend_Json::encode($valueToEncode, $cycleCheck);
	$res = str_replace('\\"', '\\\\\\"', $res);
	*/
    $res = safe_json_encode($valueToEncode);
	return $res;
	
	
	
}

function __main_json_decode($valueToDecode) {
	require_once 'Zend/Json.php';
	try {
		return isset($valueToDecode) && !is_void($valueToDecode)
		       ? Zend_Json::decode($valueToDecode, Zend_Json::TYPE_ARRAY)
		       : null;
	}
	catch (Exception $e) {
		throw $e;
	}
}

function __main_extract_text_from_html($html_data) {
	$document = $html_data.'<span></span>'; //hack to make it look like a HTML anyway
	// $document should contain an HTML document.
	// This will remove HTML tags, javascript sections
	// and white space. It will also convert some
	// common HTML entities to their text equivalent.

	$search = array ("'<script[^>]*?>.*?</script>'si",  // Strip out javascript
	                 "'<[/!]*?[^<>]*?>'si",          // Strip out HTML tags
	                 "'([rn])[s]+'",                // Strip out white space
	                 "'&(quot|#34);'i",                // Replace HTML entities
	                 "'&(amp|#38);'i",
	                 "'&(lt|#60);'i",
	                 "'&(gt|#62);'i",
	                 "'&(nbsp|#160);'i",
	                 "'&(iexcl|#161);'i",
	                 "'&(cent|#162);'i",
	                 "'&(pound|#163);'i",
	                 "'&(copy|#169);'i",
	                 "'&#(d+);'e");                    // evaluate as php

	$replace = array ("",
	                 "",
	                 "\1",
	                 "\"",
	                 "&",
	                 "<",
	                 ">",
	                 " ",
	                 chr(161),
	                 chr(162),
	                 chr(163),
	                 chr(169),
	                 "chr(\1)");

	return preg_replace($search, $replace, $document);
}

function encodeURIComponent($str) {
    $revert = array('%21'=>'!', '%2A'=>'*', '%27'=>"'", '%28'=>'(', '%29'=>')');
    return strtr(rawurlencode($str), $revert);
}

function base64url_encode($data) {
	return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode($data) {
	return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
}

function main_sprintf($format) {
	$argv = func_get_args() ;
	array_shift($argv) ;
	return mb_vsprintf($format, $argv,'UTF-8') ;
}

function mb_vsprintf($format, $argv, $encoding=null) {
	if (is_null($encoding))
		$encoding = mb_internal_encoding();

	// Use UTF-8 in the format so we can use the u flag in preg_split
	$format = mb_convert_encoding($format, 'UTF-8', $encoding);

	$newformat = ""; // build a new format in UTF-8
	$newargv = array(); // unhandled args in unchanged encoding

	while ($format !== "") {

		// Split the format in two parts: $pre and $post by the first %-directive
		// We get also the matched groups
		list ($pre, $sign, $filler, $align, $size, $precision, $type, $post) =
		preg_split("!\%(\+?)('.|[0 ]|)(-?)([1-9][0-9]*|)(\.[1-9][0-9]*|)([%a-zA-Z])!u",
				$format, 2, PREG_SPLIT_DELIM_CAPTURE) ;

		$newformat .= mb_convert_encoding($pre, $encoding, 'UTF-8');

		if ($type == '') {
			// didn't match. do nothing. this is the last iteration.
		}
		elseif ($type == '%') {
			// an escaped %
			$newformat .= '%%';
		}
		elseif ($type == 's') {
			$arg = array_shift($argv);
			$arg = mb_convert_encoding($arg, 'UTF-8', $encoding);
			$padding_pre = '';
			$padding_post = '';

			// truncate $arg
			if ($precision !== '') {
				$precision = intval(substr($precision,1));
				if ($precision > 0 && mb_strlen($arg,$encoding) > $precision)
					$arg = mb_substr($precision,0,$precision,$encoding);
			}

			// define padding
			if ($size > 0) {
				$arglen = mb_strlen($arg, $encoding);
				if ($arglen < $size) {
					if($filler==='')
						$filler = ' ';
					if ($align == '-')
						$padding_post = str_repeat($filler, $size - $arglen);
					else
						$padding_pre = str_repeat($filler, $size - $arglen);
				}
			}

			// escape % and pass it forward
			$newformat .= $padding_pre . str_replace('%', '%%', $arg) . $padding_post;
		}
		else {
			// another type, pass forward
			$newformat .= "%$sign$filler$align$size$precision$type";
			$newargv[] = array_shift($argv);
		}
		$format = strval($post);
	}
	// Convert new format back from UTF-8 to the original encoding
	$newformat = mb_convert_encoding($newformat, $encoding, 'UTF-8');
	return vsprintf($newformat, $newargv);
}

function strip_all_empty_lines($text){

    /*
     * the bellow regular exprasion removes all empty lines
     * Explanation:
     */

    //         /(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/
    //         1st Capturing group (^[\r\n]*|[\r\n]+)
    //             1st Alternative: ^[\r\n]*
    //                 ^ assert position at start of the string
    //                 [\r\n]* match a single character present in the list below
    //                 Quantifier: Between zero and unlimited times, as many times as possible, giving back as needed [greedy]
    //                 \r matches a carriage return (ASCII 13)
    //                 \n matches a fine-feed (newline) character (ASCII 10)
    //             2nd Alternative: [\r\n]+
    //                 [\r\n]+ match a single character present in the list below
    //                 Quantifier: Between one and unlimited times, as many times as possible, giving back as needed [greedy]
    //                 \r matches a carriage return (ASCII 13)
    //                 \n matches a fine-feed (newline) character (ASCII 10)
    //         [\s\t]* match a single character present in the list below
    //             Quantifier: Between zero and unlimited times, as many times as possible, giving back as needed [greedy]
    //             \s match any white space character [\r\n\t\f ]
    //             \tTab (ASCII 9)
    //         [\r\n]+ match a single character present in the list below
    //             Quantifier: Between one and unlimited times, as many times as possible, giving back as needed [greedy]
    //             \r matches a carriage return (ASCII 13)
    //             \n matches a fine-feed (newline) character (ASCII 10)
    return preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "\n",$text);
}

function  from_arabic_to_english_numbers($text){
    $arb_en_map=array(
        '\\xd8\\xa1' => '\'', '\\xd8\\xa2' => '|', '\\xd8\\xa3' => '>',
        '\\xd8\\xa4' => '&', '\\xd8\\xa5' => '<', '\\xd8\\xa6' => '}',
        '\\xd8\\xa7' => 'A', '\\xd8\\xa8' => 'b', '\\xd8\\xa9' => 'p',
        '\\xd8\\xaa' => 't', '\\xd8\\xab' => 'v', '\\xd8\\xac' => 'j',
        '\\xd8\\xad' => 'H', '\\xd8\\xae' => 'x', '\\xd8\\xaf' => 'd',
        '\\xd8\\xb0' => '*', '\\xd8\\xb1' => 'r', '\\xd8\\xb2' => 'z',
        '\\xd8\\xb3' => 's', '\\xd8\\xb4' => '$', '\\xd8\\xb5' => 'S',
        '\\xd8\\xb6' => 'D', '\\xd8\\xb7' => 'T', '\\xd8\\xb8' => 'Z',
        '\\xd8\\xb9' => 'E', '\\xd8\\xba' => 'g', '\\xd9\\x80' => '_',
        '\\xd9\\x81' => 'f', '\\xd9\\x82' => 'q', '\\xd9\\x83' => 'k',
        '\\xd9\\x84' => 'l', '\\xd9\\x85' => 'm', '\\xd9\\x86' => 'n',
        '\\xd9\\x87' => 'h', '\\xd9\\x88' => 'w', '\\xd9\\x89' => 'Y',
        '\\xd9\\x8a' => 'y', '\\xd9\\x8b' => 'F', '\\xd9\\x8c' => 'N',
        '\\xd9\\x8d' => 'K', '\\xd9\\x8e' => 'a', '\\xd9\\x8f' => 'u',
        '\\xd9\\x90' => 'i', '\\xd9\\x91' => '~', '\\xd9\\x92' => 'o',
        '\\xd9\\xb0' => '`', '\\xd9\\xb1' => '{',
        '٠'=>'0','١'=>'1','٢'=>'2','٣'=>'3','٤'=>'4','٥'=>'5','٦'=>'6','٧'=>'7','٨'=>'8','٩'=>'9'
    );

    foreach($arb_en_map as $key=>$value)
    {
        $text=preg_replace("/$key/",$value,$text);
    }

    return $text;
}
?>