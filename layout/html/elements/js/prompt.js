var promptObj = {
		
	lastGuessNumber : -1,
		
	guess : function(lastGuessedNumber = false, extraText = false){
		
		if( lastGuessedNumber === this.lastGuessNumber ){
			$.aceOverWatch.toast.show('success','Hurray! You guessed the number! It was: '+this.lastGuessNumber);
			return;
		}
		
		let text = 'I am thinking of a number between 1 and 10! Which number could that be?';
		if( lastGuessedNumber === false && extraText === false ){
			this.lastGuessNumber = parseInt(Math.random()*10) + 1;
		}else{
			if( extraText === false ){
				if( lastGuessedNumber < this.lastGuessNumber ){
					text += '<br> My number is <b>greater</b> than: '+lastGuessedNumber;
				}else{
					text += '<br> My number is <b>less</b> than: '+lastGuessedNumber;
				}
			}else{
				text = extraText + '<br>'+text;
			}
		}

		$.aceOverWatch.prompt.show(
				text,
				function(value, cfg){
					
					let extraText = false;
					
					value = parseInt(value);
		            if( (Math.round(value) !== value)) {
		            	extraText = 'Hey, you should type an integer! Lets continue shall we?';
		                value = false;
		            }
					
		            promptObj.guess(value, extraText);
				},
				{
					type: 'prompt',
					callbackCancel : function(){
						$.aceOverWatch.toast.show('error','Oh no! You will never know what number I was thinking about... :( ');
					},
					value : lastGuessedNumber === false ? '' : lastGuessedNumber,
							
					okText :'This is it!',
					cancelText: 'I give up!',
				}
		);
		
		
	}
}

function displayAlert(button){
	$.aceOverWatch.prompt.show(
        'Hi, this is a simple <b>Alert</b> message! <br> Press ESCAPE key, or the ok button to dismiss it.',
        '',
        {type: 'alert'}
    );
}

function displayQuestion() {
    $.aceOverWatch.prompt.show(
        'Which button do you wish to press? The OK, or CANCEL button?',
        function(){
        	
        	$.aceOverWatch.toast.show('success','You have chose to press OK! Well done!');
        	
        },
        {
        	type: 'question',
        	callbackCancel : function(){
        		$.aceOverWatch.toast.show('error','Oh no! You have pressed the CANCEL button, or you have pressed escape!');
        	}
		}
    );
}

function displayQuestionWithTextPrompt() {
	promptObj.guess();
}