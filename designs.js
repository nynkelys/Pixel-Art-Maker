// PIXEL ART MAKER NYNKE

// DEFINE VARIABLES
const pixelCanvas = $("#pixel_canvas");
let height;
let width;
let color = $("#colorPicker").val();
let isDown = false;

// DEFINE FUNCTIONS
// Make grid
function makeGrid(height, width) {
	pixelCanvas.append("<tbody class='grid'></tbody>"); // Append a class to table body
	for (let row = 0; row < height; row++) {
		$("tbody.grid").append("<tr class='grid'></tr>"); // Append rows (tr) with class grid to same class (grid) in tbody
		for(let column = 0; column < width; column++) {
		  	$("tbody.grid > tr:last").append("<td class='grid'></td>"); // Append table data cell (td) with same class (grid) from start of grid to last row
		};
	};
}

// Clear entire grid
function clearGrid() {
    while ($('table tr').length > 0) {
        $('.grid').remove();
    }
}

// Make 'clear grid' button and instructions
function extraInfo() {
  	$('#clear_grid').append("<h3>Hold your left mouse button down to drag and draw</h3>"); // If grid is made, add following message
  	$('#clear_grid').append("<h3>To clear a cell, hold the Shift key while clicking it</h3>"); // If grid is made, add following message
  	$('#clear_grid').append("<input id='button2' type='submit' value='Clear grid'>"); //If grid is made, add following message
}

// Clear 'clear grid' button and instructions
function deleteExtraInfo() {
  	$("#clear_grid").children().remove();
}

// DEFINE EVENT LISTENERS
// Run code as soon as page's DOM is safe to manipulate
$(document).ready(function() {

  // Event listener for making the grid
	$("form").submit(function(event) { // Select entire 'pick color' form, apply functions after clicking 'submit', based on the element selected in the form (hence: event))
		event.preventDefault(); // Prefent from executing default action, instead define:
		clearGrid();
   		deleteExtraInfo();
		height = $("#input_height").val(); // If action is performed on height, fill in
		width = $("#input_width").val(); // If action is performed on width, fill in
		makeGrid(height, width); // Then, perform function makeGrid() with these arguments

  		// Add instructions and 'clear grid' button
    	extraInfo();

    	// Event listener for drawing (including drag-and-draw)
		$("td").on("mousedown", function (event) {
			event.preventDefault();
			$(this).css("background-color", color);
			$("td").on("mouseover", function () {
				$(this).css("background-color", color);
			});
		});

		$("body").on("mouseup", function () {
			$("td").off("mouseover");
		});

    	// Event listener for clearing a cell
    	pixelCanvas.on("click", "td", function(event) {
   	  		if (event.shiftKey) // If we hold the Shift key while clicking on a cell ...
   	  		$(this).css("background-color", ""); // ... the cell becomes transparent (and because the grid is white, turns to white again)
    	});

    	// Event listener for overwriting the grid cell
    	$("#colorPicker").on('change', function() { // Change event is sent to element when its value changes (so, if colorPicker changes, then perform this action)
      		color = $(this).val(); // Action is that color changes to the new value
    	});

    	// Event listener for clearing the grid
    	$("#clear_grid").on('click', function() {
   	  		clearGrid();
   	  		deleteExtraInfo();
  		});
	});
});