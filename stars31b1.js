var shootingstar_y = 50;
var star_y = 60;
var star_height = 200;

function initShootingStars() {
	var elems = document.getElementsByClassName("shootingstar");   
	var elems_stars = document.getElementsByClassName("star");   
	var id = setInterval(frame, 10);
	
	//var speeds = [1.3,1.5,2,2.3,2.5];
	var speeds = [1.0,1.2,1.5,1.7,2.3];
	var fadeout_rates = [0.005,0.007,0.01,0.015];
	var fadeout_rates_stars = [0.007,0.01];
	var num_colors = 5;

	function resetElement(elem) {
		elem.style.top = shootingstar_y + (Math.random() * star_height) + 'px';
	
		var w = 1200;//document.body.scrollWidth;
	
		//elem.style.left = (w / 2) - 264 + (Math.random() * 301) + 'px';
		elem.style.left = (w / 2) - 264 + (Math.random() * 420) + 'px';
		elem.style.opacity = 0.25 + Math.random() + '';
		
	}
	
	function resetElementStar(elem) {
		//elem.style.top = star_y + (Math.random() * 301) + 'px';
		elem.style.top = star_y + (Math.random() * star_height) + 'px';
	
		var w = 1100//1200;//document.body.scrollWidth;
	
		elem.style.left = (w / 2) - 264 + (Math.random() * 540) + 'px';
		opacity = 0.50 + (Math.random() * 0.5);
		elem.style.opacity = opacity + '';
		
	}
	
	function frame() {
		updateShootingStars();
		updateStars(); 
	}
	
	/* SHOOTING STARS */
	function updateShootingStars() {
		for (let i = 0; i < elems.length; i++) { 
			elem = elems[i];
			if (!elem.style.opacity) {
				if (Math.random() > 0.69) {
					resetElement(elem);
				} else {
					return;
				}	
			}
				
			var speed = speeds[i % speeds.length];
			var fadeout_rate = fadeout_rates[i % fadeout_rates.length];
				
			var o = parseFloat(elem.style.opacity);
			if (o <= 0) {
				resetElement(elem);
			} else {
				elem.style.top = (elem.offsetTop + speed) +'px'; 
				elem.style.left = (elem.offsetLeft + speed) + 'px'; 
				//if (elem.offsetTop > (document.body.scrollHeight - 100) || elem.offsetLeft > (document.body.scrollWidth - 100)) {
				if (elem.offsetTop > (document.body.scrollHeight - 100) || elem.offsetLeft > (document.body.scrollWidth - 100)) {
					fadeout_rate = 0.15;
				}
				
				if (elem.offsetTop >= 235 || elem.offsetLeft >= 815) {
					fadeout_rate = 0.05;
				}
				
				o -= fadeout_rate;
				elem.style.opacity = o + '';
				
				var anim_frame = 0;
				
				if (o >= 0.85) {
					anim_frame = 0;
				} else if (o >= 0.75) {
					anim_frame = 1;
				} else if (o >= 0.60) {
					anim_frame = 2;
				} else if (o >= 0.45) {
					anim_frame = 3;
				} else if (o >= 0.30) {
					anim_frame = 2;
				} else if (o >= 0.15) {
					anim_frame = 1;
				} else {
					anim_frame = 0;
				}
				
				var top = elem.style.top;
				var left = elem.style.left;
				var opacity = elem.style.opacity;
				
				if (elem.offsetTop >= 255 || elem.offsetLeft >= 825) {
					opacity = 0;
				}
				
				var x = -(anim_frame * 32);
				var y = -((i % num_colors) * 32);
				elem.setAttribute("style", 'visibility: visible; object-fit: none; object-position: ' + x + 'px ' + y + 'px; ' + 'top: ' + top + '; ' + 'left: ' + left + '; ' + 'opacity: ' + opacity);
			}
		}
	}
	
	/* STARS */
	function updateStars() {
		for (let i = 0; i < elems_stars.length; i++) { 
			elem = elems_stars[i];
			if (!elem.style.opacity) {
				if (Math.random() > 0.69) {
					resetElementStar(elem);
				} else {
					return;
				}	
			}
				
			var speed = speeds[i % speeds.length];
			var fadeout_rate = fadeout_rates_stars[i % fadeout_rates_stars.length];
				
			var o = parseFloat(elem.style.opacity);
			if (o <= 0) {
				resetElementStar(elem);
			} else {
				if (elem.offsetTop > (document.body.scrollHeight - 100) || elem.offsetLeft > (document.body.scrollWidth - 100)) {
					fadeout_rate = 0.15;
				}
				o -= fadeout_rate;
				elem.style.opacity = o + '';
				
				var anim_frame = 0;
				
				if (o >= 0.85) {
					anim_frame = 0;
				} else if (o >= 0.75) {
					anim_frame = 1;
				} else if (o >= 0.60) {
					anim_frame = 2;
				} else if (o >= 0.45) {
					anim_frame = 3;
				} else if (o >= 0.30) {
					anim_frame = 2;
				} else if (o >= 0.15) {
					anim_frame = 1;
				} else {
					anim_frame = 0;
				}
				
				var top = elem.style.top;
				var left = elem.style.left;
				var opacity = elem.style.opacity;
				
				var x = -(anim_frame * 32);
				var y = -((i % num_colors) * 32);
				elem.setAttribute("style", 'visibility: visible; object-fit: none; object-position: ' + x + 'px ' + y + 'px; ' + 'top: ' + top + '; ' + 'left: ' + left + '; ' + 'opacity: ' + opacity);
			}
		}
	}
}

var image_path = "https://laytonloztew.neocities.org/images/";
var cool_elems = document.getElementsByClassName("cool");   
var cool_images = {
"Layton Badge": ["badges/badge_laytonclub_0", "badges/badge_laytonclub_1"],
"Layton Avatar": ["art/laytonloztew", "art/layton_cool"],
"Discord Logo": ["sites/discord_logo", "sites/discord_logo_cool"],
};

function changeImage() {
	for (let i = 0; i < cool_elems.length; i++) { 
		e = cool_elems[i];
		images = cool_images[e.alt];
		for (let j = 0; j < images.length; j++) {
			img = images[j];
			
			if (e.src == getImageName(img)) {
				j += 1
				if (j >= images.length) {
					j = 0
				}
					
				e.src = getImageName(images[j]);
			}
		}
	}
}

function getImageName(img) {
	return image_path + img + ".png";
}