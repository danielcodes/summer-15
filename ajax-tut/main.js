$(function (){
	
	var $orders = $('#orders');
	//caching the fields
	var $name = $('#name');
	var $description = $('#description');
	
	//using templates, a string
	//double curly brace for a value
	//var orderTemplate = "<li>name: {{name}}, description: {{desc}}</li>";
	var orderTemplate = "" +
	"<li>" +
	"<p><strong>Name:</strong> {{name}}</p>" +
	"<p><strong>Description:</strong> {{desc}}</p>" +
	"<button data-id='{{id}}' class='remove'>X</button>" +
	"</li>";
	
	//less rewrite
	//bit thrown off by the tutorial since it is using different parameters
	function addOrder(order) {
		//two paramemetrs, the template and the object
		$orders.append(Mustache.render(orderTemplate, order));
	}
		
	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/learncode/friends',
		//no sign of parameter definition
		success: function(orders) {
			$.each(orders, function(i, order) {
				addOrder(order);
			});
		},
		error: function() {
			alert('error loading orders');
		}
	}); //end get names
	
			
	$('#add-order').on('click', function() {
		
		//creating the order object
		var order = {
			name: $name.val(),
			desc: $description.val(),
		};
		
		//adding the post request
		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/learncode/friends',
			data: order,
			//funny how it is passing a parameter but the parametere is never declared
			//which makes you wonder where the hell is it
			success: function(newOrder) {
				//error before, the fields were displaying undefined
				//because params did not match the ones defined up there, fool
				addOrder(newOrder);
			},
			error: function() {
				alert('error saving order');
			}
		});
	}); //end add order
	
	//remove
	//checks on the parent of the elements, ul (orders), and removes accordingly
	//look into delegate function
	$orders.delegate('.remove', 'click', function(){
		
		//remove li on page w/o reload
		var $li = $(this).closest('li');
	
		$.ajax({
			type: 'DELETE',
			url: 'http://rest.learncode.academy/api/learncode/friends/' + $(this).attr('data-id'),
			success: function (){
				//do not use 'this' inside success function
				$li.fadeOut(300, function(){
					$(this).remove();
				});
			}
		
		});
	});
	
	
	
	
	
	
	
	
	
	
	
});