var positioningObj = {
		
	lastEx2Class : '',
		
	init : function(){
		this.controlsContrainerEx2 = $('#ex2-positioning-controls');
		this.targetEx2 = $('#ex2-positioning-target');
	},
	
	changeEx2Position : function(){
		let newClass = this.controlsContrainerEx2.find('[fieldname="helperClass"]').ace('value');
		this.targetEx2.removeClass(this.lastEx2Class).addClass(newClass);
		
		if( newClass == 'ace-to-bottom' ){
			this.targetEx2.css({
				top : '',
				right : '',
				bottom : '',
				left : '',
			});
		}else{
			this.targetEx2.css({
				top : this.controlsContrainerEx2.find('[fieldname="top"]').ace('value'),
				right : this.controlsContrainerEx2.find('[fieldname="right"]').ace('value'),
				bottom : this.controlsContrainerEx2.find('[fieldname="bottom"]').ace('value'),
				left : this.controlsContrainerEx2.find('[fieldname="left"]').ace('value'),
			});
		}
		
		
		this.lastEx2Class = newClass; 
	}
}

function onChangePositioningEx2Helpers(){
	positioningObj.changeEx2Position();
}

positioningObj.init();
