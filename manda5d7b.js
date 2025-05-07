function changePin(pinName) {
	var x = document.getElementsByClassName("infoPin");
	var i;
	for (i = 0; i < x.length; i++) {
		x[i].style.visibility = "hidden";
	}
	
	var infoBlock = document.getElementsByClassName("info_" + pinName)[0];
	if (typeof infoBlock !== 'undefined') {
		infoBlock.style.visibility = "visible";
	}
}

function changeEffect(slot, effect, lockHeadSlots=false, hideHead=false) {
	// Check if effect is visible
	var elem = document.getElementById(slot + "_" + effect);
	var isVisible = elem.style.visibility == "visible";
	
	var slotBox = document.getElementById("slotBox_" + slot);
	
	if (effect !== 'default') {
		var effBox = document.getElementById("effBox_" + effect);
		effBox.style.animation = 'none';
		
		var x = document.getElementsByClassName("effect");
		var i;
		for (i = 0; i < x.length; i++) {
			if (x[i].onclick.toString().includes(slot)) {
				x[i].style.opacity = 1.0;
			}
		}
		effBox.style.opacity = (isVisible ? 1.0 : 0.3);
	}
	
	var x = document.getElementsByClassName("slot" + slot);
	var i;
	for (i = 0; i < x.length; i++) {
		x[i].style.visibility = "hidden";
	}
	
	var headState = "visible";
	if (lockHeadSlots && !isVisible) {
		if (hideHead) {
			headState = "hidden";
		}
		
		changeEffect('hat', 'default');
		document.getElementById("slotlock").style.visibility = "visible"
		document.getElementById("slotBox_hat").src = "images/mny/effects/efficon/efficon_none.png";
		
		var x = document.getElementsByClassName("effect");
		var i;
		for (i = 0; i < x.length; i++) {
			if (x[i].onclick.toString().includes("hat")) {
				x[i].style.opacity = 1.0;
			}
		}
		effBox.s
	} else {
		if (slot == "head") {
			document.getElementById("slotlock").style.visibility = "hidden"
		}
	}
	document.getElementById("face").style.visibility = headState;
	document.getElementById("hairback").style.visibility = headState;
	
	if (isVisible) {
		// make default visible
		var elem = document.getElementById(slot + "_default");
		slotBox.src = "images/mny/effects/efficon/efficon_none.png";
		
	} else {
		slotBox.src = "images/mny/effects/efficon/efficon_" + effect + ".png";
	}
	
	elem.style.visibility = "visible";
	
	var x = document.getElementsByClassName("infoEffect");
	var i;
	for (i = 0; i < x.length; i++) {
		x[i].style.visibility = "hidden";
	}
	
	var infoBlock = document.getElementsByClassName("effinfo_" + effect)[0];
	if (typeof infoBlock !== 'undefined') {
		infoBlock.style.visibility = "visible";
	}
}

function changeSlot(slot) {
	// If hat, check if slot is locked
	if (slot == "hat" && document.getElementById("slotlock").style.visibility == "visible") {
		return;
	}
	
	var elem = document.getElementById("slotBox_" + slot);
	elem.style.animation = 'none';
	
	//hide all slot lists
	var x = document.getElementsByClassName("slotlist");
	var i;
	for (i = 0; i < x.length; i++) {
		x[i].style.visibility = "hidden";
	}
	
	var elem = document.getElementById("slotlist_" + slot);
	elem.style.visibility = "visible";
	
	var x = document.getElementsByClassName("infoEffect");
	var i;
	for (i = 0; i < x.length; i++) {
		x[i].style.visibility = "hidden";
	}
	
	var x = document.getElementsByClassName("effect");
	var i;
	for (i = 0; i < x.length; i++) {
		if (x[i].onclick.toString().includes(slot)) {
			if (x[i].style.opacity == "0.3") {
				var idString = x[i].id.toString().split("_")[1];
				var infoBlock = document.getElementsByClassName("effinfo_" + idString)[0];
				if (typeof infoBlock !== 'undefined') {
					infoBlock.style.visibility = "visible";
					break;
				}
				
			}
		}
	}
}