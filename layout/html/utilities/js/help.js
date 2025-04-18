var helpObj = {

}

function onLinkBadgesChanged(target,value){
    $('#help-badges-area .ace-auto-gen').ace('modify', {
        'infolink': value == 1 ? "http://info.cern.ch" : '',
    });
}
function onTextBadgesChanged(target,value){
    $('#help-badges-area .ace-auto-gen').ace('modify', {
        'infotext': value == 1 ? 'this is an ACE '+target.data($.aceOverWatch.settings.aceSettings).type+' field!' : '',
    });
}

function onInfoBadgesPosChanged(target,value){
    $('#help-badges-area .ace-auto-gen').ace('modify', {
        'infopos': value == 1 ? '' : 'right',
    });
}

function onInfoBadgesPosHoverChanged(target,value){
    $('#help-badges-area .ace-auto-gen').ace('modify', {
        'infohover': value == 1
    });
}
