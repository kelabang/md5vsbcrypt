/*
* @Author: d4r
* @Date:   2017-12-15 00:45:57
* @Last Modified by:   d4r
* @Last Modified time: 2017-12-15 01:29:39
*/

var selectors = [
	'ben',
	'bcr',
	'md5',
] 
var $selectors = []
selectors.map(function (selector) {
	var $selector = $('li.'+selector)
	$selector.on('click', function (selector) {
		selectors.map(function(_selector){if(selector !== _selector) $('#'+_selector).hide()})
		$('#'+selector).toggle()
	}.bind(this, selector))
	$selectors.push($selector)
})