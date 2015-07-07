$(document).ready(function (){

    //cache dom elements from the forms
    var $outer = $('#outer'); //spit out divs here
    //6 inputs
    var $building = $('#building');
    //can't use -, on variable names, lame
    var $roomnumber = $('#room-number');
    var $department = $('#department');
    var $description = $('#description');
    var $occupant = $('#occupant');
    var $imglink = $('#img-link');
    //change back on the {{html}}


    //template that will be pulled by an id
    //name can change, not actually a room, a symbol rather
    var roomTemplate = $('#room-template').html();

    //using mustache to render
    function addRoom(room){
        $outer.append(Mustache.render(roomTemplate, room));
    }

    //GET request to retrieve div
    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/daniel/friends',
        success: function(rooms){
            $.each(rooms, function(i, room){
                addRoom(room);
            });
        }
    });

    //********************************************************************
    //DISPLAY
    // $('#outer').on('click', '.room', function() {
    // 	$( '.container' ).css({"display": "block"});
    // });

    //HIGHLIGHT SYMBOL AND DRAGGABLE
    //when a room symbol is clicked, add a border, a class target and draggable
    //once a click outside is made, remove class and remove border, life is good again
    $('#outer').on('click', '.room', function() {
        $(this).css({"border": "3px solid black"});
        $(this).addClass("draggable target");
        $(".draggable").draggable();
    });

    //make symbols draggable


    //reusing code,
    $(document).mouseup(function (e)
    {
        //basically, the element that you're working with
        var container = $(".room");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            //gotta remove all the nonsense classe that get added when draggable is called on an element
            container.removeClass("target draggable ui-draggable ui-draggable-handle");
            container.css({"border": "none"});
        }
    });
    //********************************************************************

    //adding the form into backend api
    $('#add-room').on('click', function(){

        //room object
        var room = {
            building: $building.val(),
            roomnumber: $roomnumber.val(),
            department: $department.val(),
            description: $description.val(),
            occupant: $occupant.val(),
            imglink: $imglink.val(),
        };

        //post request
        $.ajax({
            type: 'POST',
            url: 'http://rest.learncode.academy/api/daniel/friends',
            data: room,

            success: function(newRoom){
                //need to add template, and function
                //3 things missing, the html, template and function
                addRoom(newRoom);
            },
            error: function(){
                alert('error adding room');
            }
        }); //end ajax post
    }); // end button

});

//hides div when outside click is made
$(document).mouseup(function (e)
{
    var container = $(".container");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide();
    }
});
