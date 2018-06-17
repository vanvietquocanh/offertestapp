jQuery(document).ready(function($) {
	var index = 0;
	var lengthStringLink;
	var regexLive = /market|google|apple|itunes|chplay/;
	function domain(url) {
	    var result
	    var match
	    if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
	        result = match[1]
	        if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
	            result = match[1]
	        }
	    }
	    return result
	}
	function cutLink(link) {
		var listTracking = [];
		link.split("\n").forEach( function(element, index) {
			if(element.split("|")[1]!==undefined){
				var data = {
					url 	  : element.split("|")[0],
					platform  : element.split("|")[2],
					country   : element.split("|")[1].split(",")[0]
				}
				listTracking.push(data);
			}
		});
		return listTracking;
	}
	function result(json){
		if(index!==0&&index<lengthStringLink){
			jsonResponse(cutLink($("#link").val())[index]);
			index++;
		}else{
			ready();
			$("#btn-test").html("GO")
		}
		var data = JSON.parse(json);
		var html = `<tr class="show-more ${index}">`;
		if(regexLive.test(data.message)){
			html +=  `<td class="bg-success text-light"><img src="${data.icon}"></td>`
		    html +=    `<td class="bg-success text-light">${domain(data.message)}</td>
		    			<td class="bg-success text-light">${data.message}</td>`;
		}else{
			html += `<td class="bg-danger text-light"></td>
					 <td class="bg-danger text-light">${domain(data.message)}</td>
					 <td class="bg-danger text-light">${data.message}</td>`
		}
	    html +=  `</tr>`;
		data.ArrayUrl.forEach((ele,i)=>{
			html += `<tr class="table-hidden-more ${index}">
						<td class="text-value-intable">${domain(ele)}</td>
						<td class="text-value-intable">${ele}</td>
					</tr>`
		})
		$("#body").prepend(html)
		addEvent();
	}
	function nextEle(ele){
		return ele.next();
	}
	function addEvent(){
		$(".show-more").click(function(event) {
			$(".table-hidden-more").css("display","none");
			$(`.${$(event.currentTarget).next().attr("class").split("more ")[1]}`).css("display","table-row")
		});
	}
	function delEvent(){
		$(".show-more").unbind('click')
	}
	function jsonResponse(userpost){
		delEvent();
		$.ajax({
			url: '/offertest',
			type: 'POST',
			dataType: 'applicattion/json',
			data: userpost,
			timeout : 1000*60*15
		})
		.always(function(data) {
			result(data.responseText);
		});
	}
	function ready() {
		$("#btn-test").click(function(event) {
			$("#btn-test").unbind('click')
			$("#body").empty();
			$("#btn-test").html("<i class='fa fa-spinner fa-pulse'></i>")
			var data;
			lengthStringLink = $("#link").val().split("\n").length;
			if(lengthStringLink>1){
				data = cutLink($("#link").val())[index];
				index++;
			}else{
				data = {
					url       : $("#link").val(),
					platform  : $("#os").val(),
					country   : $("#country").val()
				}
			}
			jsonResponse(data);
		})
	}
	// $.get("http://ipinfo.io", function(response) {
	ready()
	// 	console.log(response.ip)
	// }, "jsonp");



////////////End
});