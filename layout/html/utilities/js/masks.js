var masksObj = {
		
	withMaks : false,
		
	init : function(){
		this.loaderText = $('#ex1-masks-text');
		this.elementsToMask = $('#ex-2-masks').find('.ace-auto-gen');
	},
	
	displayScreenMask : function(withLoader){
		$.aceOverWatch.screenMask.show(this.loaderText.ace('value'),withLoader);
		setTimeout(function(){$.aceOverWatch.screenMask.hide();},3000);
	},
	
	toggleMasks : function(){
		this.withMaks = !this.withMaks;
		
		this.elementsToMask.each(function(){
			$.aceOverWatch.field.mask($(this),masksObj.withMaks);
		});
	}	
		
}

function displayScreenMaskWithLoader(){
	masksObj.displayScreenMask(true);
}

function displayScreenMaskWithoutLoader(){
	masksObj.displayScreenMask(false);
}

function toggleMasks(){
	masksObj.toggleMasks();
}

masksObj.init();