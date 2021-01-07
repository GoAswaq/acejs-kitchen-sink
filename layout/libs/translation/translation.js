/********************************************************************
 * 
 * @param obj - a jquery object from which to get the attributes
 * 
 *  the attributes must be defined like: v1=".." v2=".." and so on; they have to use consecutive numbers starting with 1
 * 
 * the function is used by the translate function to retrieve the attributes to be passed as parameters to a sprintf style function
 */
function return_variables_arr(obj) {
	var replVals = [];
	var i=1;
	while ($(obj).attr('v'+i)!=undefined) {
		replVals.push($(obj).attr('v'+i));i++;
	}
	return replVals;
}
String.prototype.replaceAllOccurences = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function getSimpleJSTranslation(strKey) {
	if ($.aceOverWatch.utilities.isVoid(strKey)) return '';
	if (!$.aceOverWatch.utilities.isVoid(_L[strKey]))  return _L[strKey];
	if (!$.aceOverWatch.utilities.isVoid(_aceL[strKey]))  return _aceL[strKey];
	
	return strKey.replaceAllOccurences('_',' ');
}
function getSimpleJSTranslation(strKey) {
	if ($.aceOverWatch.utilities.isVoid(strKey)) return '';
	
	if (!$.aceOverWatch.utilities.isVoid(_L[strKey]))  return _L[strKey];
	if (!$.aceOverWatch.utilities.isVoid(_aceL[strKey]))  return _aceL[strKey];
	return strKey.replaceAllOccurences('_',' ');
}
function getVarJSTranslation(strKey) {
	if ($.aceOverWatch.utilities.isVoid(strKey)) return '';
	if ($.aceOverWatch.utilities.isVoid(_V[strKey])) return strKey.replaceAllOccurences('_',' ');
	return _V[strKey];
}

/********************************************************************
 * 
 *  @param id - undefined, or a selector string
 *  
 *  the function translates the entire page, or just an element specified by the id
 */
function translate(id){
	var el = id;
	if( id == undefined ){
		id='';
		//modify title manualy to avoid displaying page_title for a few moments before the text is parsed
		$(id+'title').html(vsprintf(_V.page_title, return_variables_arr($('title'))));
		el = $('*');
	}else{
		el = $(id);
	}

	el.find('l').replaceWith(function(){
        return  getSimpleJSTranslation($(this).html());
    });
	el.find('._t_content').each(function(){
    	$(this).html( getSimpleJSTranslation($(this).html()));
    });
	el.find('._t_content_attr').each(function(){
    	$(this).attr('content', getSimpleJSTranslation($(this).attr('content')));
    });
	el.find('._t_value').each(function(){
    	$(this).val(getSimpleJSTranslation($(this).val()));
    });
	el.find('._t_valuex').each(function(){
		if ($(this).attr('value')=='rfs_userrights') {
		}
		$(this).attr('value', getSimpleJSTranslation($(this).attr('value')));
    });
	el.find('._t_title').each(function(){
    	$(this).attr('title', getSimpleJSTranslation($(this).attr('title')));
    });
	el.find('._t_label').each(function(){
    	$(this).attr('label', getSimpleJSTranslation($(this).attr('label')));
    });
	el.find('._t_alt').each(function(){
    	$(this).attr('alt', getSimpleJSTranslation($(this).attr('alt')));
    });
	el.find('._t_alttitle').each(function(){
    	$(this).attr('alt', getSimpleJSTranslation($(this).attr('alt')));
    	$(this).attr('title', getSimpleJSTranslation($(this).attr('title')));
    });
	el.find('._t_customtxt').each(function(){
    	$(this).attr('customText', getSimpleJSTranslation($(this).attr('customText')));
    });
	el.find('._t_customtxtval').each(function(){
    	$(this).attr('customText', getSimpleJSTranslation($(this).attr('customText')));
    	$(this).val(getSimpleJSTranslation($(this).val()));
    });
	el.find('._t_placeholder').each(function(){
    	$(this).attr('placeholder', getSimpleJSTranslation($(this).attr('placeholder')));
    });
	el.find('select._t_options > option').each(function(){
    	$(this).text(getSimpleJSTranslation($(this).text().trim()));
    });

	el.find('lv').replaceWith(function(){
        return vsprintf(getVarJSTranslation($(this).html()), return_variables_arr(this));
    });
	el.find('._tv_content').each(function(){
    	$(this).html(vsprintf(getVarJSTranslation($(this).html()), return_variables_arr(this)));
    });
	el.find('._tv_value').each(function(){
    	$(this).val( vsprintf(getVarJSTranslation($(this).val()), return_variables_arr(this)));
    });
	el.find('._tv_tile').each(function(){
    	$(this).attr('title', vsprintf(getVarJSTranslation($(this).attr('title')), return_variables_arr(this)));
    });
	el.find('._tv_placeholder').each(function(){
    	$(this).attr('placeholder', vsprintf(getVarJSTranslation($(this).attr('placeholder')), return_variables_arr(this)));
    });
}