(function(a){function d(c,d){a.each(b.hiddenContent,function(e){if(d||b.hiddenContent[e]&&b.hiddenContent[e].search(c)!=-1)b.shownRows[e]=b.hiddenRows[e],b.shownContent[e]=b.hiddenContent[e],a(b.hiddenRows[e]).removeClass("hide"),delete b.hiddenRows[e],delete b.hiddenContent[e]})}function c(c){a.each(b.shownContent,function(d){b.shownContent[d]&&b.shownContent[d].search(c)==-1&&(b.hiddenRows[d]=b.shownRows[d],b.hiddenContent[d]=b.shownContent[d],a(b.shownRows[d]).addClass("hide"),delete b.shownRows[d],delete b.shownContent[d])})}var b={text:"",shownRows:{},hiddenRows:{},shownContent:{},hiddenContent:{},handleInput:function(){typeof b.active=="number"&&clearTimeout(b.active);var c=a(this);b.active=setTimeout(function(){b.filter(a.trim(c.val().toLowerCase()))},250)},filter:function(a){b.text=a;a.length<=1?d(a,!0):a.search(b.text)!=-1?c(a):(d(a),c(a))},connectTo:function(c){$object=a(c),$object.prop("tagName")==="INPUT"?$object.keyup(b.handleInput).parents("form").submit(function(){return!1}):$object.bind("change",b.handleInput)}};a.fn.liveQuery=function(c){this.length&&(b.shownRows=this,b.shownContent=b.shownRows.map(function(){return a(this).text().toLowerCase()}),this.connectTo=b.connectTo,a("body").bind("liveQuery",function(a,c){b.filter(c||"")}));return this}})(jQuery)