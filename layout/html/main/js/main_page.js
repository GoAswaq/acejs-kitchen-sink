navigatorObj = {
	wasItInit : false,
	
	elementsLoaded : {},
	utilitiesLoaded : {},
	
	availableElements : {
		text : {
			name : 'Text',
			category : 'Data Input',
		},
		textarea : {
			name : 'Textarea',
			category : 'Data Input',
		},
		
		display : {
			name : 'Display',
			category : 'Data Input',
		},
		
		prompt : {
			name : 'Prompt',
			category : 'Notification',
		},
		
		toast : {
			name : 'Toast',
			category : 'Notification',
		},
		
		combobox : {
			name : 'Combobox',
			category : 'Data Input',
		},

		multicheck : {
			name : 'Multicheck',
			category : 'Data Input',
		},
		
		checkbox : {
			name : 'Checkbox',
			category : 'Data Input',
		},
		'switch' : {
			name : 'Switch',
			category : 'Data Input',
		},
		'password' : {
			name : 'Password',
			category : 'Data Input',
		},
		datepicker : {
			name : 'Date Picker',
			category : 'Data Input',
		},
		daterangepicker : {
			name : 'Date Range Picker',
			category : 'Data Input',
		},
		autocomplete : {
			name : 'Autocomplete',
			category : 'Data Input',
		},
		button : {
			name : 'Button',
			category : 'Control',
		},
		ibutton : {
			name : 'Icon Button',
			category : 'Control',
		},
		breadcrumbs : {
			name : 'Breadcrumbs',
			category : 'Control',
		},
		pbar : {
			name : 'Progress Bar',
			category : 'Control',
		},
		accordion : {
			name : 'Accordion',
			category : 'Control',
		},
		chips : {
			name : 'Chips',
			category : 'Data Input',
		},
		upload : {
			name : 'Upload Button',
			category : 'Data Input',
		},
		
		menubutton : {
			name : 'Menubutton',
			category : 'Control',
		},
		cardview : {
			name : 'Cardview',
			category : 'Control',
		},
		form : {
			name : 'Form',
			category : 'Complex',
		},
		radiogroup : {
			name : 'Radiogroup',
			category : 'Data Input',
		},
		simplegrid : {
			name : 'Grid - Simple',
			category : 'Complex',
		},
		gridmod : {
			name : 'Grid - Modifiers',
			category : 'Complex',
		},
		wizard : {
			name : 'Wizard',
			category : 'Complex',
		},
	},
	
	availableUtilities : {
		cols : {
			name : 'Columns',
			category : 'CSS Classes',
		},
		heights : {
			name : 'Heights',
			category : 'CSS Classes',
		},
		flexl : {
			name : 'Flex Layout',
			category : 'CSS Classes',
		},
		font : {
			name : 'Font',
			category : 'CSS Classes',
		},
		pam : {
			name : 'P & M',
			category : 'CSS Classes',
		},
		positioning : {
			name : 'Positioning',
			category : 'CSS Classes',
		},
		extra : {
			name : 'Ace Field Modifiers',
			category : 'CSS Classes',
		},
		masks : {
			name : 'Masks',
			category : 'Tools',
		},
		blur : {
			name : 'Blur',
			category : 'Tools',
		},
		collaps : {
			name : 'Collapse',
			category : 'Tools',
		},
		thumbs : {
			name : 'Thumbs Up',
			category : 'Tools',
		},
		validations : {
			name : 'Validations',
			category : 'Tools',
		},
		
		titleb : {
			name : 'Title Bars',
			category : 'Panels',
		},
		advancedp : {
			name : 'Advanced Panel',
			category : 'Panels',
		},
		presentation : {
			name : 'Presentation Panel',
			category : 'Panels',
		},

		iform : {
			name : 'Independent Form',
			category : 'Panels',
		},
		entrycard : {
			name : 'Cards',
			category : 'Panels',
		},
		
		quickbar : {
			name : 'Quick access Bar',
			category : 'Panels',
		},
		popover : {
			name : 'Popover',
			category : 'Panels',
		},
		pbkcolor : {
			name : 'Markings',
			category : 'Panels',
		},
		label : {
			name : 'Labels',
			category : 'Tools',
		},
		help : {
			name : 'Help',
			category : 'Tools',
		},
		app : {
			name : 'App',
			category : 'Panels',
		},
		app_v2 : {
			name : 'App v2',
			category : 'Panels',
		},

		readme : {
			name : 'Readme',
			category : 'Panels',
			cls : 'ace-hide',
		},

		eet_intro : {
			name : 'Intro',
			category : 'Easy Edit Table',
		},
		eet_plugins : {
			name : 'Plugins',
			category : 'Easy Edit Table',
		},
	},
	
	init : function(){
		
		if( this.wasItInit ){
			return;
		}
		this.wasItInit = true;
		this.elementsContainer = $('#ks-elements-container');
		this.utilitiesContainer = $('#ks-utilities-container');
		this.exampleSelector = $('#ks-example-selector');
		this.exampleDetails = $('#ks-example-details');
		
		$('#page-alignament-combo').ace('value',ksSettingsObj.val('ks_algn'));
		$('#page-theme-combo').ace('value',ksSettingsObj.val('ks_theme'));
		
		this.initElementsNavigator();
		this.initUtilitiesNavigator();



	},
	
	initElementsNavigator : function(){
		let navigatorDataCategories = {};
		for(let element in this.availableElements ){
			if( !navigatorDataCategories[this.availableElements[element].category] ){
				navigatorDataCategories[this.availableElements[element].category] = {
					name : this.availableElements[element].category,
					tag : this.availableElements[element].category,
					children : []
				};
			}
			navigatorDataCategories[this.availableElements[element].category].children.push({
				name : this.availableElements[element].name,
				tag : element,
			});
		}
		
		let navigatorData = [];
		for(let category in navigatorDataCategories ){
			navigatorData.push(navigatorDataCategories[category]);
		}
		
		this.elementsNavigator = $('#ace-elements-navigator').ace('create',{
			type : 'accordion',
			handler : function(tag){navigatorObj.onFieldElementsTypeSelection(tag);},
			activetag : 'text',
			data : navigatorData,
			enabledexpand : false,
		});
		
		let lastViewed = ksSettingsObj.val('ks_sel_el');
		if( this.availableElements[lastViewed] ){
			$.aceOverWatch.field.accordion.openTag(this.elementsNavigator,lastViewed);
		}
		$.aceOverWatch.field.accordion.openAllTags(this.elementsNavigator);
	},
	initUtilitiesNavigator : function(){
		let navigatorDataCategories = {};
		for(let element in this.availableUtilities){
			if( !navigatorDataCategories[this.availableUtilities[element].category] ){
				navigatorDataCategories[this.availableUtilities[element].category] = {
						name : this.availableUtilities[element].category,
						tag : this.availableUtilities[element].category,
						children : []
				};
			}
			navigatorDataCategories[this.availableUtilities[element].category].children.push({
				name : this.availableUtilities[element].name,
				tag : element,
				cls : $.aceOverWatch.utilities.isVoid(this.availableUtilities[element].cls) ? '' : this.availableUtilities[element].cls,
			});
		}
		
		let navigatorData = [];
		for(let category in navigatorDataCategories ){
			navigatorData.push(navigatorDataCategories[category]);
		}
		
		this.utilitiesNavigator = $('#ace-utilities-navigator').ace('create',{
			type : 'accordion',
			handler : function(tag){navigatorObj.onFieldUtilitiesTypeSelection(tag);},
			activetag : 'text',
			data : navigatorData,
			enabledexpand : false,
		});
		
		let lastViewed = ksSettingsObj.val('ks_sel_el');
		if( this.availableUtilities[lastViewed] ){
			$.aceOverWatch.field.accordion.openTag(this.utilitiesNavigator,lastViewed);
		}
		$.aceOverWatch.field.accordion.openAllTags(this.utilitiesNavigator);
	},
	
	onFieldElementsTypeSelection : function(elementName){
		ksSettingsObj.val('ks_sel_el',elementName);
		
		if( !this.availableElements[elementName] ){
			elementName = 'no-element-selected';
		}else{
			this.insertAndLoadElementCodeIfNeeded(elementName);
		}
		
		this.elementsContainer.find('[tag="'+elementName+'"]').removeClass('ace-hide').siblings().addClass('ace-hide');
		this.elementsContainer.removeClass('ace-hide').siblings().addClass('ace-hide');
		this.toggleExampleDetailsForMobile(true);
	},
	
	onFieldUtilitiesTypeSelection : function(utilityName){
		ksSettingsObj.val('ks_sel_el',utilityName);
		
		if( !this.availableUtilities[utilityName] ){
			utilityName = 'no-utility-selected';
		}else{
		
			this.insertAndLoadUtilityCodeIfNeeded(utilityName);
			
		}
		
		this.utilitiesContainer.find('[tag="'+utilityName+'"]').removeClass('ace-hide').siblings().addClass('ace-hide');
		this.utilitiesContainer.removeClass('ace-hide').siblings().addClass('ace-hide');
		this.toggleExampleDetailsForMobile(true);
	},
	
	toggleExampleDetailsForMobile : function(show = true){
		if( show ){
			this.exampleSelector.removeClass('ace-show');
			this.exampleDetails.addClass('ace-show');
		}else{
			this.exampleSelector.addClass('ace-show');
			this.exampleDetails.removeClass('ace-show');
		}
	},
	
	insertAndLoadElementCodeIfNeeded  : function(elementName){
		
		if( this.elementsLoaded[elementName] ){
			return;
		}
		
		this.elementsLoaded[elementName] = true;
		if( !this.tplElementContainer ){
			this.tplElementContainer = $('#element-template').html(); 
		}
		let newElHtml = this.tplElementContainer.replaceAll('[PLACEHOLDER]',elementName);
		let newElement = $(newElHtml.trim());
		this.elementsContainer.append(newElement);
		
		newElement.ace('loadtpl');
	},
	
	insertAndLoadUtilityCodeIfNeeded  : function(elementName){
		
		if( this.utilitiesLoaded[elementName] ){
			return;
		}
		
		this.utilitiesLoaded[elementName] = true;
		if( !this.tplUtilityContainer ){
			this.tplUtilityContainer = $('#utility-template').html(); 
		}
		let newElHtml = this.tplUtilityContainer.replaceAll('[PLACEHOLDER]',elementName);
		let newElement = $(newElHtml.trim());
		this.utilitiesContainer.append(newElement);
		
		newElement.ace('loadtpl');
	}
};

var testViewObj = {
		
	init : function(){
		this.testArea = $('#test-view');
		this.iframeEl = this.testArea.find('#test-iframe'); 
		this.widthEl = this.testArea.find('#test-width');
		this.heightEl = this.testArea.find('#test-height');		
		this.titleEl = this.testArea.find('#test-view-title');
		
		this.resSelectorEle = this.testArea.find('#test-view-res-selector').ace('create',{
			type : 'combobox',
			labelalign:'left',
			label:'Resolution',
			labelwidth:'150px',
			value : ksSettingsObj.val('ks_viewres'),
			data : this.getResolutionData(),
			onchange : onViewTestResolutionChange
		});
		
		this.onChange(ksSettingsObj.val('ks_viewres'));
	},
	
	onChange : function(resolutionId){
		if( !this.resolutionsStore[resolutionId] ){
			return;
		}
		
		this.widthEl.ace('value',this.resolutionsStore[resolutionId]['width']);
		this.heightEl.ace('value',this.resolutionsStore[resolutionId]['height']);
		
		this.iframeEl.css({
			width : this.resolutionsStore[resolutionId]['width'],
			height : this.resolutionsStore[resolutionId]['height'],
		});
		
		if( ksSettingsObj.val('ks_viewres') != resolutionId ){
			ksSettingsObj.val('ks_viewres',resolutionId);
		}
	},
	
	getResolutionData : function(){
		let data = [];
		for(let idx in this.resolutionsStore ){
			data.push($.extend({id : idx},this.resolutionsStore[idx]));
		}
		return data;
	},
	
	resolutionsStore : {
        1 : {
        	name : 'Moto G4',
        	width : 360,
        	height : 640,
        },
        2 : {
        	name : 'Galaxy S5',
        	width : 360,
        	height : 640,
        },
        3 : {
        	name : 'Pixel 2',
        	width : 411,
        	height : 731,
        },
        4 : {
        	name : 'Pixel 2 XL',
        	width : 411,
        	height : 823,
        },
        5 : {
        	name : 'iPhone 5/SE',
        	width : 320,
        	height : 586,
        },
        6 : {
        	name : 'iPhone 6/7/8',
        	width : 375,
        	height : 667,
        },
        7 : {
        	name : 'iPhone 6/7/8 Plus',
        	width : 414,
        	height : 736,
        },
        8 :{
        	name : 'iPhone X',
        	width : 375,
        	height : 812,
        },
        9: {
        	name : 'iPad',
        	width : 768,
        	height : 1024,
        },
        10 : {
        	name : 'iPad Pro',
        	width : 1024,
        	height : 1366,
        },
        11 : {
        	name : 'Surface Duo',
        	width : 540,
        	height : 720,
        },
        12 : {
        	name : 'Galaxy Fold',
        	width : 280,
        	height : 653,
        },
	},
		
	view : function(button){
		
		this.updateIFrameContents(button);
		this.testArea.removeClass('ace-hide').addClass('ace-show');
		
	},
	
	updateIFrameContents : function(button){
		if( !button ){
			return;
		}
		
		let exampleContainer = button.parents('.example-container').first().clone();
		let headerSection = exampleContainer.find('.ks-example-header').remove();
		let headerH3 = headerSection.find('h3').html();
		this.titleEl.html(headerH3.substr(headerH3.lastIndexOf('</div>')+6));
		
		exampleContainer.find('.ks-example-controls').remove();
		testViewObj.iframeEl.contents().find('body').html(exampleContainer.html());
		
	},
	
	hide : function(button){
		this.testArea.removeClass('ace-show').addClass('ace-hide');
	}
		
}; 

function shownMobileExampleSelector(){
	navigatorObj.toggleExampleDetailsForMobile(false);
}

function viewTestView(button){
	testViewObj.view(button);
}
function hideTestView(){
	testViewObj.hide();
}

function onViewTestResolutionChange(target, value){
	testViewObj.onChange(value);
}

$(function(){
	navigatorObj.init();
	testViewObj.init();
});


function addAfterLoadElements(tpl) {
	var link = $('<a>', {
		class: 'ace-hide after-auto-gen',
		href: '#',
	}).append("<i class='fa fa-code'>").click(function() {
		showCode(this);
	});
	$("#ks-example-details").find(".ace-auto-gen").after(link);
	$("#ks-example-details").find(".ace-auto-gen").unbind('mouseenter mouseleave').hover(function() {
		var el = $(this).siblings('.after-auto-gen').eq(0);
		el.removeClass('ace-hide').fadeIn(100).position({
			my:        "left top",
			at:       	"right-20 top+2",
			of:        $(this),
			collision: "fit"
		});

	}, function() {
		var el = $(this).siblings('.after-auto-gen').eq(0);

		if (el.parent().find(el.selector + ":hover").length > 0) {
			el.hover(function() {

			}, function() {
				el.addClass('ace-hide');
			})
			return false;
		}
		el.addClass('ace-hide');

	});
}

function showCode(el) {
	console.log(arguments);
	console.log($(el));
	var innerHTML = $(el).prev('.ace-auto-gen').html();
	var outerHTML = $(el).prev('.ace-auto-gen')[0].outerHTML;
	outerStripHTML = outerHTML.replace(innerHTML, '');
	console.log(process_html(outerHTML));
	console.log(process_html(outerStripHTML));
}



function process_html(str) {

	var div = document.createElement('div');
	div.innerHTML = str.trim();

	return format_html(div, 0).innerHTML;
}

function format_html(node, level) {

	var indentBefore = new Array(level++ + 1).join('  '),
		indentAfter  = new Array(level - 1).join('  '),
		textNode;

	for (var i = 0; i < node.children.length; i++) {

		textNode = document.createTextNode('\n' + indentBefore);
		node.insertBefore(textNode, node.children[i]);

		format_html(node.children[i], level);

		if (node.lastElementChild == node.children[i]) {
			textNode = document.createTextNode('\n' + indentAfter);
			node.appendChild(textNode);
		}
	}

	return node;
}

function viewDocumentation(){
	navigatorObj.onFieldUtilitiesTypeSelection('readme');
}