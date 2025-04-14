var settingsObj = {
		
	onShow : function(){
		
	}	
		
};

function onDisplayContentForTagsettingsmenutag(tag,data) {
	settingsObj.onShow();
	
	/*
	 * for additional operations on display
	 */
	if( $.isArray(data) && data.length > 0 ){
		
		switch( data[0] ){
		
		case 'preferences':
			$.aceOverWatch.prompt.show('The Preferences section should be open now, if it was implemented',null,{type:'alert'});
			break;
			
		case 'personal':
			$.aceOverWatch.prompt.show('The Personal Details section should be open now, if it was implemented',null,{type:'alert'});
			break;
			
		}
		
	}
}