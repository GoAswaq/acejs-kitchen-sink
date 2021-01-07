var entrycardObj = {
		
	init : function(){
		this.createGrid();
	},
	
	createGrid : function(){
		this.grid = $('#ace-entry-grid').ace('create',{
			
			type : 'grid',
			gtype : 'panel',
			idfield : 'student_id',
			selectiontype : 'row',
			
			rowtpl : 'test-ace-entry-tpl',
			
			width:'100%',
			
			allowedit:false,
			allowdelete:false,
			
			allowadd : false,
			allowrefresh : false,
			hideheader : true,
			
			selectfirstresult : true,
			
            net : {
        	   fid:'loadstudentsfilter',
        	   autoload:true,
        	   remote:true,
        	   size:9,
            }
		
		});
	},
}

function onEntryCardFullScreen(button){
	let target = button.parents('.ace-entry-card');
	
	if( target.hasClass('ace-full-screen') ){
		target.removeClass('ace-full-screen');
	}else{
		target.addClass('ace-full-screen');
	}
}

function onEntryCardCollapsed(button){
	let target = button.parents('.ace-entry-card');
	
	let newCollapsedState;
	if( target.hasClass('ace-colapsed') ){
		target.removeClass('ace-colapsed');
		newCollapsedState = 0;
	}else{
		target.addClass('ace-colapsed');
		newCollapsedState = 1;
	}
	
	target.find('.collapse-check').ace('value',newCollapsedState);
}

function toggleCardModifier(button,value){
	let target = button.parents('.example-container').first().find('.ace-icon-card');
    target.toggleClass(button.attr('label'));
}

entrycardObj.init();