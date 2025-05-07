var fileInput = document.getElementById('myFile');
var fReader = new FileReader();
var file = 0;
var array = 0;

var savefile;

fReader.onload = function(e) {
    savefile = e.target.result;
	array = new Uint8Array(savefile.length);
for (var i = 0; i < 65536; i++){
	array[i] = savefile.charCodeAt(i);
}
    displayFile();
}

fileInput.onchange = function(e) {
    file = this.files[0];
    fReader.readAsBinaryString(file);
}

function calcChecksum() {
	i = 0;
	var val = 6825;
	while (i < 32768) {
		var hexdata = getHexValue(i * 2, 2, false);
		var hexval = parseInt(hexdata, 16);
		
		if (i == 16) {
			hexval = 0;
		}
		
		val += hexval;
		val %= 65535;
		
		i += 1;
	}
	return 65535 - val;
	
}

function calcChecksumArray() {
	i = 0;
	var val = 6825;
	while (i < 32768) {
		var hex1 = array[i*2].toString(16);
		var hex2 = array[(i*2) + 1].toString(16);
		
		if (hex1.length < 2) 
			hex1 = "0" + hex1;
		if (hex2.length < 2) 
			hex2 = "0" + hex2;
		
		var hexdata = hex1 + "" + hex2;
		var hexval = parseInt(hexdata, 16);
		
		if (i == 16) {
			hexval = 0;
		}
		
		val += hexval;
		val %= 65535;
		
		i += 1;
	}
	return 65535 - val;
}

function displayFile() {
    switch (getChecksum()) {
		case 0x0DCEAB8906593DA2:
			console.log("Valid file: Game 1");
			printMagiciansQuestSaveData();
			break;
		default:
			console.log("Invalid file");
			document.getElementById("outputDiv").innerHTML = "Invalid Save File provided.";
			return;
	}
}
	
function printMagiciansQuestSaveData() {
    // Reset
    document.getElementById("outputDiv").innerHTML = "";

    var section = "";
	
	section += "<br />";
    section += "<p>" + getValueHTML(0x8fbc, 10, "[a]", [
        ["", "icons/school.png", "", " Magic School"]
    ]) + "</p>";
	
	var saveChecksum = calcChecksum().toString(16);
	while (saveChecksum.length < 4) {
		saveChecksum = "0" + saveChecksum;
	}
	var testChecksum = getHexValue(0x20, 2, false);
	
	// Unlock Brooms
	//0x456	FO
	//0x457 FF
	array[0x456] = 0xF0;
	array[0x457] = 0xFF;
	
	var arrayChecksum = calcChecksumArray().toString(16);
	while (arrayChecksum.length < 4) {
		arrayChecksum = "0" + arrayChecksum;
	}
	
	array[0x20] = parseInt(arrayChecksum.substring(0,2),16);
	array[0x21] = parseInt(arrayChecksum.substring(2,4),16);
	
	var b = new Blob([array], {type: 'application/octet-stream'});

	window.URL = window.URL || window.webkitURL;
	var dlBtn = document.getElementById("download");
	dlBtn.setAttribute("href", window.URL.createObjectURL(b));
	dlBtn.setAttribute("download", file.name);
	
	section += "<br />";
	section += "<div class=\"save-block\">";
	section += "<p>" + (saveChecksum == testChecksum ? "<span style=\"color:#00ff00\">Checksum PASS</span>" : "<span style=\"color:#ff0000\">Checksum FAIL</span>") + "<br />"+ saveChecksum + " " + testChecksum + " " + arrayChecksum + "</p></div>";
	
    document.getElementById("outputDiv").innerHTML += section;
}

function getList(colNum, name, tableList, alignment = "left") {
    var i = 0;
    var section = "<table style=\"text-align:" + alignment + ";min-width:500px\"><tr><th colspan=\"" + colNum + "\">" + name + "</th></tr>";
    while (i < tableList.length) {
        var arr = tableList[i];
        if (i % colNum == 0) {
            if (i > 0) {
                section += "</tr>";
            }
            section += "<tr>";
        }
        section += "<td>";
        var label = arr[0];
        var address = arr[1];
        var size = 1;
        var format = "[v]";
        var bool = bit(hexToInt(address, size), arr[2]);

        section += getValueHTML(address, size, format, label, 0, "", "", bool);
        section += "</td>";
        i++;
    }
    return section;
}

function getTable(name, tableList) {
    var i = 0;
    var section = "<table class=\"infotable\"><tr><th colspan=\"2\">" + name + "</th></tr>";
    while (i < tableList.length) {
        var label = tableList[i][0];
        var rowList = tableList[i][1];
        var j = 0;
        section += "<tr><td>" + label + "</td><td>";
        while (j < rowList.length) {
            var arr = rowList[j];
            var address = arr[0];
            var size = arr[1];
            var format = arr[2];
            format ||= "[v]";
            var replaceVal = arr[3];
            replaceVal ||= "";
            var addInt = arr[4];
            addInt ||= 0;
            var tooltipImage = arr[5];
            tooltipImage ||= "";
            var suffix = arr[6];
            suffix ||= "";
            section += getValueHTML(address, size, format, replaceVal, addInt, tooltipImage, suffix);
            j++;
        }
        section += "</td></tr>";
        i++;
    }
    section += "</table>";
    return section;
}

function getValueHTML(address, size, format = "[v]", replaceArr = "", addInt = 0, tooltipImage = "", suffix = "", bool = true) {
    var decimal = hexToInt(address, size) + addInt;
    var hex = getHexValue(address, size);

    var replaceVal = "";
    var replaceIcon = "";
    var replacePrefix = "";
    var replaceSuffix = "";

    if (Number.isInteger(format)) {
        var cval = (decimal - format);
        var compareString = "<br />";
        if (cval > 0) {
            compareString += "<span style=\"color:#00ff00\">+";
        } else if (cval < 0) {
            compareString += "<span style=\"color:#ff0000\">";
        } else {
            compareString += "<span style=\"color:#808080\">";
        }
        compareString += cval + "</span>";
        val = decimal + compareString;
    } else {
        if (replaceArr instanceof Object) {
            if (replaceArr.length == 1) {
                var this_arr = replaceArr[0];
                replaceVal = this_arr[0];
                replaceIcon = this_arr[1];
                replacePrefix = this_arr[2];
                replaceSuffix = this_arr[3];
            } else {
                if (replaceArr[0] instanceof Object) {
                    var this_arr = replaceArr[decimal];
                    replaceVal = this_arr[0];
                    replaceIcon = this_arr[1];
                    replacePrefix = this_arr[2];
                    replaceSuffix = this_arr[3];
                } else {
                    replaceVal = replaceArr[0];
                    replaceIcon = replaceArr[1];
                    replacePrefix = replaceArr[2] || "";
                    replaceSuffix = replaceArr[3] || "";
                }
            }
        } else {
            // value
            replaceVal = replaceArr;
        }

        if (replaceVal == "") {
            replaceVal = decimal;
        }

        val = format.replace('[v]', replaceVal);
        val = val.replace('[a]', getTextString(address, size));
        val = val.replace('[b0]', evalBit(hexToInt(address, size), 0));
        val = val.replace('[b1]', evalBit(hexToInt(address, size), 1));
        val = val.replace('[b2]', evalBit(hexToInt(address, size), 2));
        val = val.replace('[b3]', evalBit(hexToInt(address, size), 3));
        val = val.replace('[b4]', evalBit(hexToInt(address, size), 4));
        val = val.replace('[b5]', evalBit(hexToInt(address, size), 5));
        val = val.replace('[b6]', evalBit(hexToInt(address, size), 6));
        val = val.replace('[b7]', evalBit(hexToInt(address, size), 7));
    }

    if (bool) {
        var textcolor = "white";
    } else {
        var textcolor = "#34282C";
    }

    var classtype = "inline-block-noimg";

    //TODO: change conditions
    if (replaceVal != "") {
        if (replaceIcon != "") {
            classtype = "inline-block";
        } else {
            classtype = "inline-block-noimg";
        }
    }

    if (classtype == "inline-block") {
        result = "<a class=\"" + classtype + "\" style=\"color:" + textcolor + "\"><img class=\"inline-track-cover\" src=\"images/mq/" + replaceIcon + "\" />";
    } else {
        result = "<a class=\"" + classtype + "\" style=\"color:" + textcolor + "\">";
    }

    result += "<span style=\"color:gray\">" + replacePrefix + "</span>" + val + "<span style=\"color:gray\">" + replaceSuffix + "</span>";
    result += "</a>" + suffix;

    return result;
}

function getPlayerName(id) {
    var code = playerCodes[id];
    if (getHexValue(code, 1) == "ff") return "";
    return getTextString(code, 20);
}

function hexToInt(offset, size) {
    var val = "";
    for (var i = 0; i < size; i++) {
        var code = savefile.charCodeAt(offset + i).toString(16);
        if (code.length < 2)
            code = "0" + code;
        val += code;
    }

    intVal = parseInt(val, 16);
    if (val.length == 4) {
        intVal = swap16(intVal);
    }
    if (val.length == 8) {
        intVal = swap32(intVal);
    }

    return intVal;
}

function getHexValue(offset, size, swap=true) {
    var output = "";
    for (var i = 0; i < size; i++) {
        var code = savefile.charCodeAt(offset + i).toString(16);
        if (code.length < 2)
            code = "0" + code;
        output += code;
    }

    if (output.length == 4) {
		if (swap) {
			output = swap16(parseInt(output, 16)).toString(16);
		} else {
			output = parseInt(output, 16).toString(16);
		}
       
        while (output.length < 4)
            output = "0" + output;
    }

    if (output.length == 8) {
        output = swap32(parseInt(output, 16)).toString(16);
        while (output.length < 8)
            output = "0" + output;
    }

    return output;
}

function getTextString(offset, size) {
    var output = "";
    for (var i = 0; i < size; i++) {
        var code = savefile.charCodeAt(offset + i);
        output += String.fromCharCode(code);
    }
    return output;
}

function getChecksum() {
    return hexToInt(0x0, 8);
}

function swap16(val) {
    return ((val & 0xFF) << 8) |
        ((val >> 8) & 0xFF);
}

function swap32(val) {
    return ((val & 0xFF) << 24) |
        ((val & 0xFF00) << 8) |
        ((val >> 8) & 0xFF00) |
        ((val >> 24) & 0xFF);
}

function bit(value, index) {
    return (value >> index) & 0x1;
}

function evalBit(value, index) {
    return (bit(value, index) == 1 ? "✔️ True" : "❌ False");
}