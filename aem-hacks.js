// ==UserScript==
// @name         AEM hacks
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://author1.prod.acsorg.adobecqms.net/content/*
// @grant        none
// ==/UserScript==

(()=>{
	keepViewingAsPublished();
})();

/**
 * Append preview qsp to page links to maintain "View as Published" view when
 * navigating to new pages. Fires if wcmmode=disabled is present in the document URL
 */
function keepViewingAsPublished() {
	if( document.URL.match('wcmmode=disabled') ) {
		console.log('View as Publish persist mode enabled');
		$('a').each(function() {
			const href = $(this).attr('href');
			// determine delimiter for qsp
			let delim = '';
			( href.match('\\?') ? delim = '&' : delim = '?' );
			// append option
			$(this).attr('href', `${href}${delim}wcmmode=disabled`);
		});
	}
}
