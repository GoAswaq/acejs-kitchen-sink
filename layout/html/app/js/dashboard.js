var dashboardObj = {
		
	init : function(){
		if( this.wasItInit ){
			return;
		}
		this.wasItInit = true;
		
		$('[appcode]').each(function(){
			let el = $(this);
			el.ace('value',ksSettingsObj.val('ks_app_'+el.attr('appcode')));
		});
		
		$('#page-alignament-combo').ace('value',ksSettingsObj.val('ks_algn'));
		$('#page-theme-combo').ace('value',ksSettingsObj.val('ks_theme'));
	},
		
	onShow : function(){
	},
	
};

function onAppChanges(button,value){
	ksSettingsObj.val('ks_app_'+button.attr('appcode'),value);
	location.reload();
}


/**
 * This method is called when then ace content is changed, and the dashboard becomes active
 * @param tag
 */
function onDisplayContentForTagdashboardmenutag(tag,data) {
	dashboardObj.onShow();
}


