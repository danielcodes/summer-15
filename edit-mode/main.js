$(function (){

	//do grunt tutorial, html files into strings? templates? what?

	var $orders = $('#orders');
	//caching the fields
	var $name = $('#name');
	var $description = $('#description');

	//using templates, a string
	//double curly brace for a value
	//var orderTemplate = "<li>name: {{name}}, description: {{desc}}</li>";
	var orderTemplate = $('#order-template').html();

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

	//edit mode
	$orders.delegate('.editOrder', 'click', function() {
		//cache li
		var $li = $(this).closest('li');
		//might need to rewatch this again
		$li.find('input.name').val( $li.find('span.name').html() );
		$li.find('input.desc').val( $li.find('span.desc').html() );
		$li.addClass('edit');
	});

	//cancel
	$orders.delegate('.cancelEdit', 'click', function() {
		$(this).closest('li').removeClass('edit');
	});

	//this is breaking the whole page, wtff
	//save, this is where the put request happens
	//aka the rewriting of data in the backend api

	$orders.delegate('.saveEdit', 'click', function() {
		var $li = $(this).closest('li');
		var order = {
			//dumb bug here with the ; rather than the commas
			name: $li.find('input.name').val(),
			desc: $li.find('input.desc').val()
		};

		$.ajax({
			type: 'PUT',
			url: 'http://rest.learncode.academy/api/learncode/friends/' + $li.attr('data-id'),
			data: order,
			success: function(newOrder) {
				$li.find('span.name').html(order.name);
				$li.find('span.desc').html(order.desc);
				$li.removeClass('edit');
			},
			error: function() {
				alert('error updating order');
			}
		});

	});










});
