var breadcrumbsObj = {
	visibility : true,
	updateVisibility : function(breadcrumb){
		this.visibility = !this.visibility;
		$.aceOverWatch.field.breadcrumbs.setVisibility(breadcrumb,0,this.visibility);
		$.aceOverWatch.field.breadcrumbs.setVisibility(breadcrumb,2,this.visibility);
		$.aceOverWatch.field.breadcrumbs.setVisibility(breadcrumb,4,this.visibility);
		$.aceOverWatch.field.breadcrumbs.setVisibility(breadcrumb,6,this.visibility);
		$.aceOverWatch.field.breadcrumbs.setVisibility(breadcrumb,8,this.visibility);
	}
}

function gotoBCPrevious(button) {
	$.aceOverWatch.field.breadcrumbs.gotoPreviousIndex(button.parents('.example-container').first().find('[type="breadcrumbs"]'));
}

function gotoBCNext(button) {
	$.aceOverWatch.field.breadcrumbs.gotoNextIndex(button.parents('.example-container').first().find('[type="breadcrumbs"]'));
}

function onWizardBreadcrumbsClick(breadcrumbs, idx, value){
	$.aceOverWatch.toast.show('success','Hurray, the current breadcrumb is the one with the index: '+idx+'! Its value is: '+value);
}

function addNewDestination(button){
	$.aceOverWatch.prompt.show(
			'Where do you want to go next?',
			function(newDestination, cfg){
				
				if( $.aceOverWatch.utilities.isVoid(newDestination,true) ){
					newDestination = 'nowhere';
				}
				
				cfg.bc.ace('value',newDestination);
				$.aceOverWatch.field.breadcrumbs.switchToLastIndex(cfg.bc);
				
			},
			{
				type: 'prompt',

				bc : button.parents('.example-container').first().find('[type="breadcrumbs"]'),
						
				okText :'Yes, go there',
				cancelText: 'Nevermind',
			}
	);
}


function toggleBCVisibility(button){
	breadcrumbsObj.updateVisibility(button.parents('.example-container').first().find('[type="breadcrumbs"]'));
}