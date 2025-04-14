var wizardObj = {
	
	redPanelHidden : 0,
	greenPanelHidden : 0,
		
	init : function(){
		this.ex1 = $('#wizard-ex-1').ace('create',{
			type : 'wizard',
			finalbuttontext : 'Yes it is!',
			
			onwizardend : function(wizard,record){
				
				let simpleData = record.convert();
				let fields = [];
				for(let field in simpleData ){
					fields.push(field+' = '+simpleData[field]);
				}
				
				$.aceOverWatch.prompt.show('Congratulations, the wizard is at the end! This is the data you have entered:<br>'+fields.join('<br><br>')+'<br><b>Would you like to reset it</b>?',function(){
					$.aceOverWatch.field.wizard.reset(wizardObj.ex1);
				},{type:'question'});				
			},
			
			steps : [
		         {
		        	 template : 'ex-1-step-1',
		         },
		         {
		        	 validate : false,
		        	 template : 'ex-1-step-2',
		         },
		         {
		        	 template : 'ex-1-step-custom-validation',
		        	 customvalidation : function(form, record, forword){
		        		 if( record.val('the_answer') != 42 ){
		        			 $.aceOverWatch.prompt.show('Oh, I am sorry, but that is not the correct answer!',null,{type:'alert'});
		        			 return false;
		        		 }
		        		 
		        		 return true;
		        	 }
		         },
		         {
		        	 savedataon : 'both',
		        	 template : 'ex-1-step-server-validation',
		        	 net : {
		        		 autoload : true,
		        		 remote : true,
		        		 fid : 'evenvalidation',
		        	 }
		         },
		         
		         {
		        	 template : 'ex-1-step-visibility',
		        	 oncustomstepchange : function(wizard, record, forword){
		        		 
		        		 if( forword ){
		        			 
		        			 /*
		        			  * we go forword
		        			  */
		        			 
			        		 let updateObj = {}; 
			        		 if( wizardObj.redPanelHidden != record.val('hide_red') ){
			        			 wizardObj.redPanelHidden = record.val('hide_red');
			        			 updateObj['red'] = wizardObj.redPanelHidden == 1 ? false : true; 
			        		 }
			        		 if( wizardObj.greenPanelHidden != record.val('hide_green') ){
			        			 wizardObj.greenPanelHidden = record.val('hide_green');
			        			 updateObj['green'] = wizardObj.greenPanelHidden == 1 ? false : true; 
			        		 }
			        		 
			        		 $.aceOverWatch.field.wizard.setTagVisibility(wizard, updateObj);
		        		 }
		        		 
		        		 return true;
		        	 }
		         },
		         {
		        	 tag : 'red',
		        	 template : 'ex-1-step-visibility-red',
		         },
		         {
		        	 tag : 'green',
		        	 template : 'ex-1-step-visibility-green',
		         },
		         {
		        	 savedataon : 'none',
		        	 autoloadon : 'next',
		        	 template : 'ex-1-step-nosave',
		        	 net : {
		        		 remote : true,
		        		 fid : 'getremotedata',
		        	 }
		         },
		         {
		        	 template : 'ex-1-step-final',
		         },
			         
	        ]
		});
		
		this.ex1Overview = $('#wizard-ex-1-overview').ace('create',{
			type : 'form',
			ftype : 'custom',
			template : 'ex-1-overview',
            renderto : 'ex-1-overview',
            displaysavebtn : false,
            displaycancelbtn : false,
		});
	}
		
};

function toggleWizzardPB(target, value){
	wizardObj.ex1.ace('modify',{
		progressbar : {
			withprogressbar : value ? true : false
		}
	});
}
function toggleWizzardPBText(target, value){
	wizardObj.ex1.ace('modify',{
		progressbar : {
			withtext : value ? true : false
		}
	});
}

function toggleWizzardPBPosition(target, value){
	wizardObj.ex1.ace('modify',{
		progressbar : {
			displayposition : value ? 'top' : 'bottom'
		}
	});
}

function toggleOverview(target, value){
	wizardObj.ex1.ace('modify',{
		overviewform : value == 1 ? wizardObj.ex1Overview : null
	});
	
	wizardObj.ex1.toggleClass('ace-col-12 ace-col-8 ace-col-fm-8');
	wizardObj.ex1Overview.toggleClass('ace-hide');
}

wizardObj.init();