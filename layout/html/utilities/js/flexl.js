var flexlObj = {
	settingsContainer : {
		direction : 'ace-flex-row',
		wrap : 'ace-flex-wrap-yes',
		justifyContent : 'ace-flex-justify-center',
		alignItems : 'ace-flex-align-center',
	},
	settingsElements : {
		alignSelf : '',
	},
	
	settingsEx2 : {
		lastClass : '',
	},
	
	applyGroth : false,
	applyShrink : false,
	
	elements : 10,
	
	init : function(){
		this.ex1FlexContainer = $('#ex-1-flex-container');
		this.ex2FlexContainer = $('#ex-2-flex-container');
		
		this.applySettingsContainers();
		this.applySettingsElements();
	},
	
	applySettingsContainers : function(){
		for(let type in this.settingsContainer ){
			this.ex1FlexContainer.addClass(this.settingsContainer[type]);
		}
	},
	applySettingsElements : function(){
		for(let type in this.settingsElements ){
			this.ex1FlexContainer.children('div:nth-child(even)').addClass(this.settingsElements[type]);
		}
	},
	
	modifySettingsContainer : function(type, newClass){
		this.ex1FlexContainer.removeClass(this.settingsContainer[type]).addClass(newClass);
		this.settingsContainer[type] = newClass;
	},
	
	modifySettingsElements: function(type, newClass){
		this.ex1FlexContainer.children('div:nth-child(even)').removeClass(this.settingsElements[type]).addClass(newClass);
		this.settingsElements[type] = newClass;
	},
	
	toggleGroth : function(){
		this.applyGroth = !this.applyGroth;
		for(let idx = 0; idx <= 10; idx++){
			if( this.applyGroth ){
				this.ex1FlexContainer.children('div:nth-child('+idx+')').addClass('ace-flex-'+idx);
			}else{
				this.ex1FlexContainer.children('div:nth-child('+idx+')').removeClass('ace-flex-'+idx);
			}
		}
	},
	
	toggleShrink : function(){
		this.applyShrink = !this.applyShrink;
		for(let idx = 0; idx <= 10; idx++){
			if( this.applyShrink ){
				this.ex1FlexContainer.children('div:nth-child('+idx+')').addClass('ace-flex-shrink-'+idx);
			}else{
				this.ex1FlexContainer.children('div:nth-child('+idx+')').removeClass('ace-flex-shrink-'+idx);
			}
		}
	},
	
	setHelperClasses : function(newClass){
		this.ex2FlexContainer.removeClass(this.settingsEx2.lastClass).addClass(newClass);
		this.settingsEx2.lastClass = newClass;
	}
}

function onChangeFLEXLDirection(target, value){
	flexlObj.modifySettingsContainer('direction',value);
}
function onChangeFLEXLWrap(target, value){
	flexlObj.modifySettingsContainer('wrap',value);
}
function onChangeFLEXLJustifyContent(target, value){
	flexlObj.modifySettingsContainer('justifyContent',value);
}
function onChangeFLEXLAlignItems(target, value){
	flexlObj.modifySettingsContainer('alignItems',value);
}

function onChangeFLEXLAlignSelf(target, value){
	flexlObj.modifySettingsElements('alignSelf',value);
}

function toggleFlexGroth(){
	flexlObj.toggleGroth();
}

function toggleFlexShrink(){
	flexlObj.toggleShrink();
}

function onChangeFLEXLHelperClasses(taget, value){
	flexlObj.setHelperClasses(value);
}

flexlObj.init();