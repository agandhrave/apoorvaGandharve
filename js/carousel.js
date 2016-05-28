$(document).load = function(){

}
var pos = 0;
function goleft(){
	// if(pos!=0){
	$("#slider").animate({marginLeft:400},1000,function(){
		pos-=400;
$(this).find("li:first").after($(this).find("li:last"));
		$(this).css({marginLeft:0});
	});
}
function goright(){

	$("#slider").animate({marginLeft:-400},1000,function(){
		pos+=400;
		$(this).find("li:last").after($(this).find("li:first"));

		$(this).css({marginLeft:0});

	});

}