ksSettingsObj = {
		
	defaultValues : {
		ks_sel_el : 'text',//the last selected element type
		ks_algn : 'ltr',
		ks_theme : 'none',
		ks_viewres : 1,
		
		ks_app_tb : 0,
		ks_app_sm : 0,
		ks_app_bb : 0,
		ks_app_gmc : 0,
	},
	
	currentValues : {
		
	},
	
	/**
	 * sets of returns a value setting
	 * when requesting the value of a setting,
	 * if the settng has not been used before on the session, we'll load it from the cookies
	 * if it is not found on the cookies, we'll return the default value, if there is one,
	 * @param name the name of the setting
	 * @param value leave empty or null, to return the current value, or else, the it will set the value
	 */
	val : function(name, value){
		
		if( $.aceOverWatch.utilities.isVoid(value) ){
			
			if( !$.aceOverWatch.utilities.isVoid(this.currentValues[name]) ){
				return this.currentValues[name];
			}
			
			value = this.getCookie(name);
			if( $.aceOverWatch.utilities.isVoid(value,true) ){
				value = this.defaultValues[name];
			}
		}
		
		if( value != this.currentValues[name] ){
			this.setCookie(name, value);
		}
		this.currentValues[name] = value;
		
		return value;
	},

	setCookie : function(cname, cvalue, exdays = 1000) {
	    let d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    let expires = "expires="+ d.toUTCString();
	    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	},
	
	getCookie : function(cname) {
	    let name = cname + "=";
	    let ca = document.cookie.split(';');
	    for(let i = 0; i <ca.length; i++) {
	    	let c = ca[i];
	        while (c.charAt(0)==' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length,c.length);
	        }
	    }
	    return '';
	}
}

function eetRendererYesNo(value, data,colId){
	if( value == 1 ){
		return '<span class="ace-primary-color">Yes</span>';
	}else{
		return '<span class="ace-red">No</span>';
	}
}

function eetRendererSex(value, data,colId){
	if( value == 'Male' || value == 'M' ){
		return '<i class="fa fa-mars"></i>';
	}else{
		return '<i class="fa fa-venus"></i>';
	}
}

function groupRendererAlive(value, data){
	return 'Alive: '+eetRendererYesNo(value);
}
function groupRendererSex(value, data){
	return 'Sex: '+eetRendererSex(value);
}

function rendererYesNo(value){
	if( value == 1 ){
		return '<span style="color:green"> YES </span>';
	}else{
		return '<span style="color:red"> NO </span>';
	}
}
function rendererSimpleComboValueId(value, record){
	if( !record ){
		return value;
	}
	return value + ', Id: '+record.val('id');
}
function rendererSimpleRadiogroupValueId(idx, recordSet){
	if( !recordSet ){
		return idx;
	}
	return recordSet[idx].val('name') + ', Id: '+recordSet[idx].val('id');
}
function rendererStudent(value, record){
	if( !record ){
		return value;
	}
	return [record.val('student_name'),record.val('student_sex'),record.val('student_country'),record.val('student_birthday')].join(', ');
}
function rendererStudentRadiogroup(idx, recordSet){
	
	if( !recordSet ){
		return idx;
	}
	return rendererStudent(idx,recordSet[idx]);
}

function rendererStudentV2(value, record){
	if( !record ){
		return value;
	}
	return '<b>'+record.val('student_id')+':</b> '+[record.val('student_name'),record.val('student_sex'),record.val('student_country'),record.val('student_birthday')].join(', ');
}

function rendererSex(value, record){
	return value == 'F' ? "It's a girl!" : "It's a boy!";
}

function rendererBCEvenRedColor(breadcrumb, index, value, record){
	return '<span style="color:'+(index % 2? 'red' : 'green')+'">'+value+'</span>';
}

function rendererNotSet(value){
	return $.aceOverWatch.utilities.isVoid(value,true) ? ' not set ' : value;
}

function onPageAlignamentChange(combobox, value){
	if( value == ksSettingsObj.val('ks_algn') ){
		return;
	}
	ksSettingsObj.val('ks_algn',value);
	location.reload();
}

function onPageThemeChange(combobox, value){
	if( value == ksSettingsObj.val('ks_theme') ){
		return;
	}
	ksSettingsObj.val('ks_theme',value);
	location.reload();
}

function attemptToOpenPopup(url){
	
	var ref = window.open(url);
	if( !ref ){
		window.location.href = url;
	}
}

/*
 * setting up some global ace settings
 */
$.aceOverWatch.settings.debugEnabled = true;
$.aceOverWatch.settings.showAllLogsAsToasts = true;
$.aceOverWatch.settings.useflex=true;
