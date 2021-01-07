var validationsObj = {
		
	init : function(){
		this.targetFields = $('#ex-1-validations').find('.ace-auto-gen');
		setTimeout(function(){
				validationsObj.reset();
				validationsObj.reveal();
			},1000
		);
	},
	
	reveal : function(){
		this.targetFields.removeClass('ace-hide');
	},
	
	validate : function(withTriesReset){
		this.targetFields.ace('validate',{resetTries : withTriesReset ? true : false});
	},
	
	reset : function(){
		this.targetFields.ace('value','');
		this.validate(true);
	}
		
}

function toggleValidations(){
	validationsObj.validate();
}

function customValidationOne(target, value, errorObj){
	if( value == 1 ){
		return true;
	}
	
	errorObj.errMsg = 'You need to have this checked in order to continue!';
	
	return false;
}
function customValidationJohnDoe(target, value, errorObj){
	if( value != 20 ){
		return true;
	}
	
	errorObj.errMsg = 'John Doe is not a valid selection!';
	
	return false;
}

function resetValidationFields(){
	validationsObj.reset();
}

validationsObj.init();