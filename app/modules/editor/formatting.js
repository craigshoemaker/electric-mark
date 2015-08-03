(function (module) {

	'use strict';

	var editor = null;
	
	var path = require('path');
	
	var formatter = require(path.resolve(__dirname, '../formats')).get('markdown');
	
	var wrapSelectedText = function(format){
		var range = editor.getSelectionRange();
		var selectedText = editor.session.getTextRange(range);
		editor.getSession().replace(range, format.left + selectedText + format.right);
		
		if(format.cursorOffset > 0){
			editor.getSelection().moveCursorLeft();
			editor.clearSelection();
		}
	};
	
	var buildCommand = function(name, shortcut){
		return {
			name: name,
			bindKey: { 
				win: shortcut.replace(/Command/, 'Ctrl'), 
				mac: shortcut.replace(/Ctrl/, 'Command') },
			exec: function(){
				wrapSelectedText(formatter[name]);
			}
		}
	};

	module.init = function (editorInstance) {
		
		editor = editorInstance;
		
		editor.commands.addCommand(buildCommand('bold', 'Ctrl-B'));
		editor.commands.addCommand(buildCommand('italic', 'Ctrl-I'));
		editor.commands.addCommand(buildCommand('code', 'Ctrl-D'));
		editor.commands.addCommand(buildCommand('link', 'Ctrl-K'));
		editor.commands.addCommand(buildCommand('image', 'Ctrl-Shift-I'));
		editor.commands.addCommand(buildCommand('h1', 'Ctrl-1'));
		editor.commands.addCommand(buildCommand('h2', 'Ctrl-2'));
		editor.commands.addCommand(buildCommand('h2', 'Ctrl-3'));
		editor.commands.addCommand(buildCommand('quote', 'Ctrl-\''));
		editor.commands.addCommand(buildCommand('unordered', 'Ctrl-.'));
		editor.commands.addCommand(buildCommand('ordered', 'Ctrl-,'));
		editor.commands.addCommand(buildCommand('hr', 'Ctrl-H'));
	};

} (module.exports));