var appViewObj = {};

/*
 * empty translation dictionaries
 */
var _L = [];
var _V = [];

var app_user_name = 'Test APP';

/**
 * This method will be called AFTER the ACE application is initiated
 */
function aceAfterAppInit(){
	window.aceApp.ace('hide');
	window.aceApp.loaderEl = $('#app-loader'); 
	window.aceApp.loaderEl.removeClass('ace-hide').detach().appendTo('body');
	
	/*
	 * after all is set and done, we're displaying the dashboard
	 */
	switchMainMenuContent('dashboardmenutag')
}

function showsettingswnd() {
	switchMainMenuContent('settingsmenutag')
}


$(function(){
	/*
	 * setting up some global ace settings
	 */
	$.aceOverWatch.settings.debugEnabled = true;
	$.aceOverWatch.settings.showAllLogsAsToasts = true;
	$.aceOverWatch.settings.useflex=true;
	
	window.aceApp.ace('show');
});