$(document).ready(function() {
  // obfuscation
  var rotten = 'xrvgu.zvlnxr@tznvy.pbz'.replace(/[a-zA-Z]/g, 
  function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
  $('a[href^="mailto:spammy@mcspammerson"]').each(function () {
    this.href = 'mailto:' + rotten;
    if ($(this).text() === "spammy@mcspammerson") {
      $(this).text(rotten);
    }
  });
});
