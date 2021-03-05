function setFlexible ()  {
	/* eslint-disable */
	if(!window.Promise)
		document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
	// let isIos = /i(phone|pad|os)/.test-animation(window.navigator.userAgent.toLowerCase())
	// if (isIos) window.onresize = quickDevice;
	window.onresize = quickDevice;
	quickDevice();
	window.clientHeight = document.body.clientHeight
	function quickDevice () {
		"use strict";var Dpr=1,uAgent=window.navigator.userAgent,isIOS=uAgent.match(/iphone/i),isYIXIN=uAgent.match(/yixin/i),is2345=uAgent.match(/Mb2345/i),ishaosou=uAgent.match(/mso_app/i),isSogou=uAgent.match(/sogoumobilebrowser/gi),isLiebao=uAgent.match(/liebaofast/i),isGnbr=uAgent.match(/GNBR/i),$fixed=document.getElementById("fixed");function resizeRoot(){var e,i=0<screen.width&&(window.innerWidth>=screen.width||0==window.innerWidth)?screen.width:window.innerWidth,n=0<screen.height&&(window.innerHeight>=screen.height||0==window.innerHeight)?screen.height:window.innerHeight;window.devicePixelRatio&&window.devicePixelRatio,isIOS&&(i=screen.width,n=screen.height),n<i&&(i=n),100<(e=32<(e=1080<i?144:i/7.5)?e:32)&&(e=100),window.screenWidth_=i,isYIXIN||is2345||ishaosou||isSogou||isLiebao||isGnbr?setTimeout(function(){i=0<screen.width&&(window.innerWidth>=screen.width||0==window.innerWidth)?screen.width:window.innerWidth,n=0<screen.height&&(window.innerHeight>=screen.height||0==window.innerHeight)?screen.height:window.innerHeight,e=32<(e=1080<i?144:i/7.5)?e:32,document.getElementsByTagName("html")[0].style.fontSize=e+"px",$fixed&&($fixed.style.display="none")},500):(document.getElementsByTagName("html")[0].style.fontSize=e+"px",$fixed&&($fixed.style.display="none"))}resizeRoot();var reviseViewPort=function(e,i){var n=0,t=i||5,o=setInterval(function(){var e,i=0<screen.width&&window.innerWidth>=screen.width?screen.width:window.innerWidth;i<window.screenWidth_?(e=32<(e=1080<(window.screenWidth_=i)?144:i/7.5)?e:32,document.getElementsByTagName("html")[0].style.fontSize=e+"px",clearInterval(o)):n++,t<=n&&clearInterval(o)},e||200)};reviseViewPort(200);
	}
}

const flexible = {
	setFlexible
}

export default flexible;
