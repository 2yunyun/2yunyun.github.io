"use strict";var xhr,Home=location.href,Pages=4,xhrUrl="",Diaspora={L:function(a,e,o){if(a==xhrUrl)return!1;xhrUrl=a,xhr&&xhr.abort(),xhr=$.ajax({type:"GET",url:a,timeout:1e4,success:function(t){e(t),xhrUrl=""},error:function(t,e){"abort"==e?o&&o():window.location.href=a,xhrUrl=""}})},P:function(){return!!("ontouchstart"in window)},PS:function(){window.history&&history.pushState&&(history.replaceState({u:Home,t:document.title},document.title,Home),window.addEventListener("popstate",function(t){var e=t.state;e&&(document.title=e.t,e.u==Home?($("#preview").css("position","fixed"),setTimeout(function(){$("#preview").removeClass("show"),$("#container").show(),window.scrollTo(0,parseInt($("#container").data("scroll"))),setTimeout(function(){$("#preview").html(""),$(window).trigger("resize")},300)},0)):(Diaspora.loading(),Diaspora.L(e.u,function(t){document.title=e.t,$("#preview").html($(t).filter("#single")),Diaspora.preview(),setTimeout(function(){Diaspora.player()},0)})))}))},HS:function(t,e){var a=t.data("id")||0,o=t.attr("href"),i=t.attr("title")+" - "+$("#config-title").text();$("#preview").length&&window.history&&history.pushState||(location.href=o),Diaspora.loading();var n={d:a,t:i,u:o};Diaspora.L(o,function(t){if($(t).filter("#single").length){switch(e){case"push":history.pushState(n,i,o);break;case"replace":history.replaceState(n,i,o)}switch(document.title=i,$("#preview").html($(t).filter("#single")),e){case"push":Diaspora.preview();break;case"replace":window.scrollTo(0,0),Diaspora.loaded()}setTimeout(function(){Diaspora.player(),$("#top").show(),comment=$("#gitalk-container"),1==comment.data("ae")&&comment.click()},0)}else location.href=o})},preview:function(){$("#preview").one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){$("#preview").hasClass("show")?$("#container").hide():$("#container").show(),Diaspora.loaded()}),setTimeout(function(){$("#preview").addClass("show"),$("#container").data("scroll",window.scrollY),setTimeout(function(){$("#preview").css({position:"static","overflow-y":"auto"})},500)},0)},player:function(){var e=$("#audio");e.length?(""==$("#audio source").eq(0).attr("src")&&""==e[0].src&&(audiolist=$("#audio-list li"),mp3=audiolist.eq([Math.floor(Math.random()*audiolist.size())]),e[0].src=mp3.data("url")),1==e.eq(0).data("autoplay")&&e[0].play(),e.on({timeupdate:function(){var t=e[0].currentTime/e[0].duration*100;$(".bar").css("width",t+"%"),e[0].volume=t/5<=1?t/5:1},ended:function(){$(".icon-pause").removeClass("icon-pause").addClass("icon-play")},playing:function(){$(".icon-play").removeClass("icon-play").addClass("icon-pause")}})):$(".icon-play").css({color:"#dedede",cursor:"not-allowed"})},loading:function(){var t=window.innerWidth,e='<style class="loaderstyle" id="loaderstyle'+t+'">@-moz-keyframes loader'+t+"{100%{background-position:"+t+"px 0}}@-webkit-keyframes loader"+t+"{100%{background-position:"+t+"px 0}}.loader"+t+"{-webkit-animation:loader"+t+" 3s linear infinite;-moz-animation:loader"+t+" 3s linear infinite;}</style>";$(".loaderstyle").remove(),$("head").append(e),$("#loader").removeClass().addClass("loader"+t).show()},loaded:function(){$("#loader").removeClass().hide()},F:function(t,e,a){var o=$(t).parent().height(),i=$(t).parent().width(),n=a/e;n<o/i?(t.style.height=o+"px",t.style.width=o/n+"px"):(t.style.width=i+"px",t.style.height=i*n+"px"),t.style.left=(i-parseInt(t.style.width))/2+"px",t.style.top=(o-parseInt(t.style.height))/2+"px"}};$(function(){if(Diaspora.P()&&$("body").addClass("touch"),$("#preview").length){var t,n={};n.t=$("#cover"),n.w=n.t.attr("width"),n.h=n.t.attr("height"),(n.o=function(){$("#mark").height(window.innerHeight)})(),n.t.prop("complete")&&setTimeout(function(){n.t.load()},0),n.t.on("load",function(){(n.f=function(){var t,e,a,o=$("#mark").width(),i=$("#mark").height();a=1e3<=o||1e3<=i?1e3:500,i<=o?t=(e=o/a*50)*o/i:e=(t=i/a*50)*i/o,$(".layer").css({width:o+t,height:i+e,marginLeft:-.5*t,marginTop:-.5*e}),n.w||(n.w=n.t.width(),n.h=n.t.height()),Diaspora.F($("#cover")[0],n.w,n.h)})(),setTimeout(function(){$("html, body").removeClass("loading")},1e3),$("#mark").parallax();var t=new Vibrant(n.t[0]).swatches();t.DarkVibrant&&($("#vibrant polygon").css("fill",t.DarkVibrant.getHex()),$("#vibrant div").css("background-color",t.DarkVibrant.getHex())),t.Vibrant&&($(".icon-menu").css("color",t.Vibrant.getHex()),$(".icon-search").css("color",t.Vibrant.getHex()))}),n.t.attr("src")||alert("Please set the post thumbnail"),$("#preview").css("min-height",window.innerHeight),Diaspora.PS(),$(".pview a").addClass("pviewa"),$(window).on("resize",function(){clearTimeout(t),t=setTimeout(function(){Diaspora.P()||location.href!=Home||(n.o(),n.f()),$("#loader").attr("class")&&Diaspora.loading()},500)})}else $("#single").css("min-height",window.innerHeight),setTimeout(function(){$("html, body").removeClass("loading")},1e3),window.addEventListener("popstate",function(t){t.state&&(location.href=t.state.u)}),Diaspora.player(),$(".icon-icon, .image-icon").attr("href","/"),$("#top").show();$(window).on("scroll",function(){if($(".scrollbar").length&&!Diaspora.P()&&!$(".icon-images").hasClass("active")){var t=$(window).scrollTop(),e=$("#top").width()/(document.body.scrollHeight-$(window).height())*t;$(".scrollbar").width(e),80<t&&800<window.innerWidth?$(".subtitle").fadeIn():$(".subtitle").fadeOut()}}),$(window).on("touchmove",function(t){$("body").hasClass("mu")&&t.preventDefault()});function c(t,i,n){$.ajax({url:t,dataType:"xml",success:function(t){var e=$("entry",t).map(function(){return{title:$("title",this).text(),content:$("content",this).text(),url:$("url",this).text()}}).get(),a=document.getElementById(i),o=document.getElementById(n);a.addEventListener("input",function(){var h='<ul class="search-result-list">',p=this.value.trim().toLowerCase().split(/[\s\-]+/);o.innerHTML="",this.value.trim().length<=0||(e.forEach(function(t){var a=!0,o=t.title.trim().toLowerCase(),i=t.content.trim().replace(/<[^>]+>/g,"").toLowerCase(),e=t.url,n=-1,r=-1,s=-1;if(""!=o&&""!=i&&p.forEach(function(t,e){n=o.indexOf(t),r=i.indexOf(t),n<0&&r<0?a=!1:(r<0&&(r=0),0==e&&(s=r))}),a){h+="<li><a href='"+e+"' class='search-result-title' target='_blank'>"+o+"</a>";var l=t.content.trim().replace(/<[^>]+>/g,"");if(0<=s){var c=s-6,d=s+6;c<0&&(c=0),0==c&&(d=10),d>l.length&&(d=l.length);var u=l.substr(c,d);p.forEach(function(t){var e=new RegExp(t,"gi");u=u.replace(e,'<em class="search-keyword">'+t+"</em>")}),h+='<p class="search-result">'+u+"...</p>"}}}),o.innerHTML=h)})}})}var d="/search.xml";null!==document.getElementById("local-search-input")&&c(d,"local-search-input","local-search-result");var u=null;$("body").on("click",function(o){var i=$(o.target).attr("class")||"",t=$(o.target).attr("rel")||"";if("IMG"==o.target.nodeName&&0<$(o.target).parents("div.content").length&&(i="pimg"),i||t)switch(!0){case-1!=i.indexOf("switchmenu"):return window.scrollTo(0,0),$("html, body").toggleClass("mu"),null!==u?(u.destroy(),u=null):1==$("#hitokoto").data("st")&&$.get("https://v1.hitokoto.cn/",function(t){var e={strings:[(t=t).hitokoto+" ——  By "+t.from],typeSpeed:90,startDelay:500};u=new Typed(".hitokoto .typed",e)}),!1;case-1!=i.indexOf("switchsearch"):return $("body").removeClass("mu"),null!==u&&(u.destroy(),u=null),setTimeout(function(){Diaspora.HS($(o.target),"push"),$(".toc").fadeIn(1e3),c(d,"local-search-input","local-search-result")},300),!1;case-1!=i.indexOf("more"):if("loading"==(i=$(".more")).data("status"))return!1;var e=parseInt(i.data("page"))||1;if(1==e&&i.data("page",1),Pages<=e)return;return i.html("加载中...").data("status","loading"),Diaspora.loading(),Diaspora.L(i.attr("href"),function(t){var e=$(t).find(".more").attr("href");null!=e?(i.attr("href",e).html("加载更多").data("status","loaded"),i.data("page",parseInt(i.data("page"))+1)):$("#pager").remove();var a=$(window).scrollTop();$("#primary").append($(t).find(".post")),$(window).scrollTop(a+100),Diaspora.loaded(),$("html,body").animate({scrollTop:a+400},500)},function(){i.html("加载更多").data("status","loaded")}),!1;case-1!=i.indexOf("icon-home"):return $(".toc").fadeOut(100),$("#preview").hasClass("show")?history.back():location.href=$(".icon-home").data("url"),!1;case-1!=i.indexOf("icon-scan"):return $(".icon-scan").hasClass("tg")?$("#qr").toggle():($(".icon-scan").addClass("tg"),$("#qr").qrcode({width:128,height:128,text:location.href}).toggle()),!1;case-1!=i.indexOf("icon-play"):return $("#audio")[0].play(),$(".icon-play").removeClass("icon-play").addClass("icon-pause"),!1;case-1!=i.indexOf("icon-pause"):return $("#audio")[0].pause(),$(".icon-pause").removeClass("icon-pause").addClass("icon-play"),!1;case-1!=i.indexOf("cover"):return Diaspora.HS($(o.target).parent(),"push"),!1;case-1!=i.indexOf("posttitle"):return Diaspora.HS($(o.target),"push"),!1;case"prev"==t||"next"==t:if("prev"==t)var a=$("#prev_next a")[0].text;else a=$("#prev_next a")[1].text;return $(o.target).attr("title",a),Diaspora.HS($(o.target),"replace"),!1;case-1!=i.indexOf("toc-text")||-1!=i.indexOf("toc-link")||-1!=i.indexOf("toc-number"):return hash="",hash="SPAN"==o.target.nodeName?$(o.target).parent().attr("href"):$(o.target).attr("href"),to=$("a.headerlink[href='"+hash+"']"),$("html,body").animate({scrollTop:to.offset().top-50},300),!1;case-1!=i.indexOf("pviewa"):return $("body").removeClass("mu"),null!==u&&(u.destroy(),u=null),setTimeout(function(){Diaspora.HS($(o.target),"push"),$(".toc").fadeIn(1e3)},300),!1;case-1!=i.indexOf("pimg"):var n=$(".pswp").get(0);if(n){var r=[],s=0,l=[];$(".content img").each(function(t,e){o.target.src==e.src&&(s=t);var a={src:e.src,w:e.naturalWidth,h:e.naturalHeight};l.push(e),r.push(a)}),new PhotoSwipe(n,PhotoSwipeUI_Default,r,{index:s,shareEl:!1,zoomEl:!1,allowRotationOnUserZoom:!0,history:!1,getThumbBoundsFn:function(t){var e=l[t],a=window.pageYOffset||document.documentElement.scrollTop,o=e.getBoundingClientRect();return{x:o.left,y:o.top+a,w:o.width}}}).init()}return!1;case-1!=i.indexOf("comment"):return 1==$("#gitalk-container").data("enable")?(Diaspora.loading(),comment=$("#gitalk-container"),gitalk=new Gitalk({clientID:comment.data("ci"),clientSecret:comment.data("cs"),repo:comment.data("r"),owner:comment.data("o"),admin:comment.data("a"),id:decodeURI(window.location.pathname),distractionFreeMode:comment.data("d")}),$(".comment").removeClass("link"),gitalk.render("gitalk-container"),Diaspora.loaded()):$("#gitalk-container").html("评论已关闭"),!1;default:return!0}}),comment=$("#gitalk-container"),1==comment.data("ae")&&comment.click(),console.log("%c Github %c","background:#24272A; color:#ffffff","","https://github.com/Fechin/hexo-theme-diaspora")});