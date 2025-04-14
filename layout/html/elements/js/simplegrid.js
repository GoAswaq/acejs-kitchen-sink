var simpleGridObj = {
		
	indexOffset : 0,
	
	colors : [
          'red',
          'blue',
          'black',
          'orange',
          'green',
          'turquoise',
          'gray',
          'pink',
          'violet',
          'brown'
    ],
		
	settings : {
		
		hideheader 					: false,
		gtype 	   					: 'table',
		
		pagination 					: true,
		displayrowlines 			: true,
		displaycolumnlines 			: true,
		displaycheckboxcolselectall : false,
		
		allowadd 					: false,
		allowrefresh 				: false,
		
		allowedit 					: false,
		alloweditinline 			: false,
		
		allowdelete 				: false,
		showdeletecolumn			: 'begin',
		
		infinitescroll				: false,
		infinitescrollfactor		: 2,
		
		enablekeybasednavigation 	: false,
		
		showtotalsrow				: false,
		
		oninsertgridsubgrouprow		: null,
		oninsertgriduppergrouprow	: null,
		
		
		
		net : {
			size : 10,
		}
	},
	
	toggleRowHeader : function(){
		if( this.settings.oninsertgriduppergrouprow ){
			this.settings.oninsertgriduppergrouprow = null;
		}else{
			this.settings.oninsertgriduppergrouprow = function(rowIdx, record){
				return '<h4 style="color:blue">Custom Row Header for ID: '+colorRenderer(record.val('id'),record)+'</span>';
			}
		}
		this.updateGridSettings();
	},
	toggleRowFooter : function(){
		if( this.settings.oninsertgridsubgrouprow ){
			this.settings.oninsertgridsubgrouprow = null;
		}else{
			this.settings.oninsertgridsubgrouprow = function(rowIdx, record){
				return '<h4 style="color:green">Custom Row Footer for ID: '+colorRenderer(record.val('id'),record)+'</span>';
			}
		}
		this.updateGridSettings();
	},
	
	toggleHeader : function(){
		this.settings.hideheader = !this.settings.hideheader;
		this.updateGridSettings();
	},
	toggleTotals : function(){
		this.settings.showtotalsrow = !this.settings.showtotalsrow;
		this.updateGridSettings();
		
		if( this.settings.showtotalsrow ){
			$('#custom-totals-grid').removeClass('ace-hide');
		}else{
			$('#custom-totals-grid').addClass('ace-hide');
		}
	},
	toggleInfiniteScroll : function(){
		this.settings.infinitescroll = !this.settings.infinitescroll;
		this.updateGridSettings();
		$.aceOverWatch.field.grid.displayPage(this.grid);
	},
	toggleCheckColumns : function(){
		this.settings.displaycheckboxcolselectall = !this.settings.displaycheckboxcolselectall;
		this.updateGridSettings(true);
		
		if( this.settings.displaycheckboxcolselectall ){
			$('#get-checked-items').removeClass('ace-hide');
		}else{
			$('#get-checked-items').addClass('ace-hide');
		}
	},
	togglePagination : function(){
		this.settings.pagination = !this.settings.pagination;
		this.updateGridSettings();
	},
	
	toggleRowLines : function(){
		this.settings.displayrowlines = !this.settings.displayrowlines;
		this.updateGridSettings();
	},
	
	toggleColumnLines : function(){
		this.settings.displaycolumnlines = !this.settings.displaycolumnlines;
		this.updateGridSettings();
	},
	toggleDelete : function(){
		this.settings.allowdelete = !this.settings.allowdelete;
		this.updateGridSettings(true);
		
		if( this.settings.allowdelete ){
			$('#delete-end-grid').removeClass('ace-hide');
		}else{
			$('#delete-end-grid').addClass('ace-hide');
		}
	},
	toggleDeleteEnd : function(){
		this.settings.showdeletecolumn = this.settings.showdeletecolumn == 'begin' ? 'end' : 'begin';
		this.updateGridSettings(true);
	},
	toggleAdd : function(){
		this.settings.allowadd = !this.settings.allowadd;
		this.updateGridSettings();
	},
	toggleEdit : function(){
		this.settings.allowedit = !this.settings.allowedit;
		this.settings.alloweditinline = this.settings.allowedit;
		this.updateGridSettings(true);
		
		if( this.settings.allowedit ){
			$.aceOverWatch.toast.show('success','INLINE EDIT is <b>ENABLED</b>!');
		}else{
			$.aceOverWatch.toast.show('warning','INLINE EDIT is <span style="color:red">DISABLED</style>!');
		}
		
	},
	toggleRefresh : function(){
		this.settings.allowrefresh = !this.settings.allowrefresh;
		this.updateGridSettings();
	},
	
	toggleRenderers : function(){
		this.otherSettings.withRenderers = !this.otherSettings.withRenderers;
		this.updateGridSettings(true);
	},
	
	toggleTotalsCustom : function(){
		this.otherSettings.customTotals = !this.otherSettings.customTotals;
		this.updateGridSettings(true);
	},
	
	toggleHeaderIcons : function(){
		this.otherSettings.headerIcons = !this.otherSettings.headerIcons;
		this.updateGridSettings(true);
	},
	
	toggleGroupHeader : function(){
		this.otherSettings.groupHeader = !this.otherSettings.groupHeader;
		this.updateGridSettings(true);
	},
	
	toggleSort: function(){
		this.otherSettings.allowSort = !this.otherSettings.allowSort;
		this.updateGridSettings(true);
		
		if( this.otherSettings.allowSort ){
			$.aceOverWatch.prompt.show(
			        '<b style="color:red">Attention</b> Sorting is now: ENABLED.<br>\
					For this <b>TEST</b> sorting is enabled only on the first column: ID.<br>\
					By Clicking on the Column Header, the grid will cycle through sorting <i>ascending</i>, or <i>descending</i> the information displayed	 on the page based on the value in the ID field.<br>\
					On page refresh operations (refresh, page changes, etc), the sorting criteria is ignored.<br>\
					Using aditional custom logic, the sorting example could be expanded to take into account multiple columns, and be persistent between page refresh operations, but it is beyond the purpose of this simple test.',
			        '',
			        {type: 'alert'}
		    );
		}
	},
	
	otherSettings : {
		withRenderers : false,
		customTotals : false,
		headerIcons : false,
		allowSort : false,
		groupHeader : false,
	},
	
	generateDataset : function(newSize = false){
		let datasetSize = newSize;
		if( newSize <= 0 ){
			datasetSize = 25;//default
		}
		if( datasetSize > 100 ){
			datasetSize = 100;
		}
		let dataSet = [];
		
		let startDate = new Date(1980, 0, 1);
		let now = new Date();
		
		for(let idx = 1; idx <= datasetSize; idx++){
			dataSet.push({
				id : ++this.indexOffset,
				random_text : Math.random().toString(36).substring(7),
				random_color : this.colors[parseInt(Math.random()*10)%10],
				random_binary : parseInt(Math.random()*10)%2,
				random_date: this.getRandomDate(startDate,now),
			});
		}
		return dataSet;
	},
	
	loadNewDataSet : function(){
		this.getGrid().ace('modify',{
			data : this.generateDataset(100)
		});
	},
	
	updateGridSettings : function(regenerateColumns = false){
		let newSettings = {};
		if( regenerateColumns ){
			newSettings.columns = this.getColumns();
		}
		$.extend(true,newSettings,this.settings);
		
		if( this.settings.showtotalsrow &&  this.otherSettings.customTotals){
			
			newSettings.totalscolumns = [
			                             
             {
				   align : 'center',
				   aditionalclasses : 'ace-col-6',
				   totalsoprenderer : function(){
					   return 'Custom totals Footer Text - CENTER';
				   },
			  },
			  
			  {
				   align : 'center',
				   aditionalclasses : 'ace-col-6',
				   fieldname : 'random_binary',
				   totalsoprenderer : rendererZeroesCount
			  },
			                             
            ];
			
		}else{
			newSettings.totalscolumns = [];
		}
		
		this.getGrid().ace('modify',newSettings);
	},
	
	getColumns : function(){
		let columns = [
         {
      	   title : '#',
      	   fieldname : 'id',
      	   align : 'left',
      	   aditionalclasses : 'ace-col-1',
      	   totalsoprenderer : 'sum',
      	   iconcls : 'fal fa-sort-numeric-down-alt',
      	   
      	   allowsort : true,
      	   hidesorticonuntilfirstclick : true,
      	   oncolumntitleclick : function(target, clickedHeaderCell, clickedHeaderColIdx, clickedHeaderColDefinition){
      		   simpleGridObj.processClickSortOnId(target, clickedHeaderCell, clickedHeaderColIdx, clickedHeaderColDefinition);
      	   },
         },
         {
      	   title : 'Text',
      	   fieldname : 'random_text',
      	   align : 'center',
      	   aditionalclasses : 'ace-col-2',
      	   renderer : colorRenderer,
      	   totalsoprenderer : 'count',
      	   iconcls : 'fal fa-spell-check',
      	   groupheader : 'Appearance',
         },
         {
      	   title : 'Color',
      	   fieldname : 'random_color',
      	   align : 'center',
      	   aditionalclasses : 'ace-col-2',
      	   renderer : colorRenderer,
      	   iconcls : 'fal fa-palette',
      	   groupheader : 'Appearance',
         },
		{
			title : 'Other',
			fieldname : 'test',
			align : 'center',
			aditionalclasses : 'ace-col-1',
			iconcls : 'fal fa-tag',
			groupheader : 'Appearance',
		},
			{
				title : 'Other 2',
				fieldname : 'test',
				align : 'center',
				aditionalclasses : 'ace-col-1',
				iconcls : 'fal fa-tag',
				groupheader : 'Appearance',
			},
         {
      	   title : 'Binary',
      	   fieldname : 'random_binary',
      	   align : 'center',
      	   aditionalclasses : 'ace-col-1',
      	   renderer : function(value, record){
      		   return value == 1 ? 'ONE' : 'ZERO';
      	   },
      	   totalsoprenderer : rendererZeroesCount,
      	   iconcls : 'far fa-lightbulb-on',
      	   groupheader : 'Details',
         },
         {
      	   title : 'Date',
      	   fieldname : 'random_date',
      	   align : 'left',
      	   aditionalclasses : 'ace-col-2',
      	   iconcls : 'fal fa-calendar-week',
      	   groupheader : 'Details',
         },
         {
        	   title : 'Action Buttons',
        	   aditionalclasses: 'ace-col-2',
        	   type: 'action',
        	   actions:[
    	            {
        	   
						callback:function(target, row, call, record){
							$.aceOverWatch.toast.show('success','This button appears always!');
						},
						iconcls:'fad fa-sign-in',
						tooltip:'appears always',
						actionrenderer : function(value, record){
							var val = parseInt(record.val('_stare_fisa'));
							if (val >= 20) {
								return false;
							}
							return true;
						}
	               },
	               {
	            	   
	            	   callback:function(target, row, call, record){
	            		   $.aceOverWatch.toast.show('success','This button appears if the ID field has an even value!');
	            	   },
	            	   iconcls:'fad fa-plus',
	            	   tooltip:'appears for even id values',
	            	   actionrenderer : function(value, record){
	            		   return (record.val('id') % 2 == 0) ? true : false;
	            	   }
	               },
        	   ],
         },
      ];
		
		if( !this.otherSettings.withRenderers ){
			/*
			 * we remmove the renders, if we don't want them!
			 */
			for(let idx in columns ){
				delete columns[idx]['renderer'];
			}
		}
		
		if( !this.otherSettings.headerIcons ){
			/*
			 * we remmove the renders, if we don't want them!
			 */
			for(let idx in columns ){
				delete columns[idx]['iconcls'];
			}
		}
		if( !this.otherSettings.groupHeader ){
			/*
			 * we remmove the renders, if we don't want them!
			 */
			for(let idx in columns ){
				delete columns[idx]['groupheader'];
			}
		}
		
		if( !this.otherSettings.allowSort ){
			/*
			 * we remmove the renders, if we don't want them!
			 */
			for(let idx in columns ){
				delete columns[idx]['allowsort'];
			}
		}
		
		if( this.settings.displaycheckboxcolselectall ){
			/*
			 * in this case, we'll add an extra check column
			 */
			columns.push({
				   type:'checkboxcol',
		      	   fieldname : 'check_me_field',
		      	   align : 'left',
		      	   aditionalclasses : 'ace-col-1',
		      	   rowtitle : 'On/Off',
			});
		}
		
	   return columns;
	},
	
	getGrid : function(){
		if( !this.grid ){
			
			let gridSettings = $.extend(
				{
					type : 'grid',
					idfield : 'id',
					selectiontype : 'row',
					
					norecordstpl : 'simple-grid-no-records-tpl',
					width:'100%',
					
					columns : this.getColumns(),
					
					onrefreshstaticpage : function(target, page, pageSize){
						return simpleGridObj.refreshStaticPage(pageSize);
					}
				},
				this.settings
			);
			
			this.grid = $('#simple-grid').ace('create',gridSettings);
		}
		return this.grid;
	},
	
	getRandomDate : function(start, end) {
	    return moment(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).format('YYYY-MM-DD');
	},
	
	displayCheckedItems : function(){
		let checkedItems = $.aceOverWatch.field.grid.getColCheckedRecords(this.getGrid());
		if( !checkedItems || checkedItems.length == 0 ){
			$.aceOverWatch.toast.show('warning','There are <b>NO</b> checked items currently in the grid!');
			return;
		}
		
		$.aceOverWatch.prompt.show(
		        '<b>The items with the following ids are checked:</b>:<br>' + checkedItems.map(x => x.val('id') ).join(', ')+'.',
		        '',
		        {type: 'alert'}
	    );
	},
	
	clearData : function(){
		$.aceOverWatch.field.grid.setData(this.getGrid(),[],0,true);
	},
	
	replaceAllGridData : function(){
		let dataSet = this.generateDataset(100);
		$.aceOverWatch.field.grid.setData(this.getGrid(),dataSet,dataSet.length,true);
	},

	/**
	 * this method will be called when a sorting Click is performed on the ID column header.
	 * Because we are dealing here with a local grid,
	 * we will signal now, that the grid, on the next page refresh action, to sort the existing items, and not generate others
	 * the grid itself will call the page refresh, as soon as this method endds
	 */
	processClickSortOnId : function(target, clickedHeaderCell, clickedHeaderColIdx, clickedHeaderColDefinition){
		if( !this.otherSettings.allowSort ){
			return;
		}
		this.onTimePageSort = true;
	},
	
	/**
	 * this method is called the grid wants to reload the information displayed on the page
	 */
	refreshStaticPage : function(pageSize){
		if( this.onTimePageSort !== true ){
			/*
			 * we did not have a signal, that the page want to refresh itself, so we regenerate the entire data
			 */
			return simpleGridObj.generateDataset(pageSize);
		}
		this.onTimePageSort = false;
		
		/*
		 * ok.. we DO want to sort the existing data, in this case
		 * we sort the existing information
		 */
		let gridSettings = this.grid.data($.aceOverWatch.settings.aceSettings);
		this.gridSortIdAsc = gridSettings.orderbyarr['id'] == 'asc';
		
		let pageData = [];
		let startIdx = (gridSettings.page-1)*gridSettings.net.size;
		let maxIdx = startIdx + gridSettings.net.size; 
		for(let idx  = startIdx; idx < maxIdx; idx++){
			if( !gridSettings.data[idx] ){
				break;
			}
			pageData.push(gridSettings.data[idx].convert());
		} 
		
		pageData.sort(function(a,b){
			if( simpleGridObj.gridSortIdAsc ){
				return a['id'] <= b['id'] ? -1 : 1;
			}else{
				return a['id'] >= b['id'] ? -1 : 0;
			}
		});
		
		
		return pageData;
	}

};

function toggleRowHeader(button){
	simpleGridObj.toggleRowHeader();
}
function toggleRowFooter(button){
	simpleGridObj.toggleRowFooter();
}

function toggleHeader(button) {
	simpleGridObj.toggleHeader();
}
function toggleHeaderIcons(button) {
	simpleGridObj.toggleHeaderIcons();
}
function toggleGroupHeader(button) {
	simpleGridObj.toggleGroupHeader();
}
function toggleSort(button) {
	simpleGridObj.toggleSort();
}
function toggleTotalsCustom(button) {
	simpleGridObj.toggleTotalsCustom();
}
function toggleTotals(button) {
	simpleGridObj.toggleTotals();
}
function toggleInfiniteScroll(button) {
	simpleGridObj.toggleInfiniteScroll();
}
function toggleCheckColumns(button) {
	simpleGridObj.toggleCheckColumns();
}
function togglePagination(button) {
	simpleGridObj.togglePagination();
}
function toggleRowLines(button) {
	simpleGridObj.toggleRowLines();
}
function toggleColumnLines(button) {
	simpleGridObj.toggleColumnLines();
}
function toggleDelete(button) {
	simpleGridObj.toggleDelete();
}
function toggleDeleteEnd(button) {
	simpleGridObj.toggleDeleteEnd();
}
function toggleAdd(button) {
	simpleGridObj.toggleAdd();
}
function toggleEdit(button) {
	simpleGridObj.toggleEdit();
}
function toggleRefresh(button) {
	simpleGridObj.toggleRefresh();
}
function toggleRenderers(button) {
	simpleGridObj.toggleRenderers();
}
function getCheckedItems(button){
	simpleGridObj.displayCheckedItems();
}
function clearGridData(){
	simpleGridObj.clearData();
}
function replaceAllGridData(){
	simpleGridObj.replaceAllGridData();
}

function rendererZeroesCount(totalsDataArr, columnFieldName){
	let zeroCounts = 0;
    $.each(totalsDataArr, function (idx, rec) {
 	   let val = parseInt(rec.val(columnFieldName));
  		if( val === 0 ){
  			zeroCounts++;
  		}
    });
    
    return '<span style="color:red">'+zeroCounts+'</span> ZEROES!';
}

function colorRenderer(value, record){
   return '<span style="color:'+record.val('random_color')+'">'+value+'</span>';
}

simpleGridObj.loadNewDataSet();