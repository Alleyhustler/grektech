var imageURL = "";
	var imageHDURL = "";
	var checkbox = null;
	
	function onClick(element) {
		img = document.getElementById("img01");
		imageURL = element.src;
		imageHDURL = element.getAttribute("data-full");
		
		if (checkbox !== null && !checkbox.checked) {
			img.src = imageURL;
		} else {
			img.src = imageHDURL;
		}
		
		document.getElementById("img02").src = element.getAttribute("data-pic")  || "images/other/blank.png";
		document.getElementById("imglink").href = img.src;
		document.getElementById("modal01").style.display = "block";
		document.getElementById("modaltext").innerHTML = element.getAttribute("data-name") + " (" + element.getAttribute("data-year") + ")";
		document.getElementById("modaltext2").innerHTML = "<i>" + element.getAttribute("data-msg") + "</i>";
		document.getElementById("modaltext3").innerHTML = element.getAttribute("data-taken");
	}
	
	function hideModal() {
		modal = document.getElementById("modal01");
		modal.style.display='none';
	}
	
	function init() {
		checkbox = document.getElementById('quality-input');
		checkbox.addEventListener('change', (event) => {
			img = document.getElementById("img01");
			if (event.currentTarget.checked) {
				img.src = imageHDURL;
			} else {
				img.src= imageURL;
			}
			
			document.getElementById("imglink").href = img.src;
		})
	}
	
	function searchGame() {
		var input, filter, table, tr, i, txtValue;
		input = document.getElementById("gameInput");
		
		filter = input.value.toUpperCase();
		var total_num_shown = 0;
  
		var screenshots = document.getElementsByClassName("screenshot");
		
		for (var t = 0; t < screenshots.length; t++) {
			img = screenshots[t];
			gameName = img.getAttribute("data-name").toUpperCase();
			
			if (filter == gameName || filter == "" || filter == null) {
				img.style.display = "";
				total_num_shown += 1;
			} else {
				img.style.display = "none";
			}
		}
		
		if (filter == "" || filter == null) {
			document.getElementById("search_result").textContent="";
		} else {
			document.getElementById("search_result").textContent="Found " + total_num_shown + " result" + ( (total_num_shown == 1) ? "" : "s") + ".";
		}
	}
	
	function clearSearch() {
		input = document.getElementById("gameInput");
		input.value = "";
		searchGame();
	}