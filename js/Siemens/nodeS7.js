var nodes7 = require('nodes7');  // This is the package name, if the repository is cloned you may need to require 'nodeS7' with uppercase S
var conn = new nodes7;
var doneReading = false;
var doneWriting = false;

var variables = { 
    Start: 'DB1000,X0.0', 		// DB1000.DBX0.0 Boolean
    Stop: 'DB1000,X0.1', 		// DB1000.DBX0.0 Boolean
    CycleComplete: 'DB1000,INT2',	// Integer
    ProductComplete: 'DB1000,DINT4', // Double Integer
    CycleMinute: 'DB1000,REAL8',	 // Real 
};

conn.initiateConnection({port: 102, host: '192.168.1.20', rack: 0, slot: 1}, connected); // slot 2 for 300/400, slot 1 for 1200/1500
//conn.initiateConnection({port: 102, host: '192.168.0.2', localTSAP: 0x0100, remoteTSAP: 0x0200, timeout: 8000}, connected); // local and remote TSAP can also be directly specified instead.  The timeout option specifies the TCP timeout.

function connected(err) {
    	if (typeof(err) !== "undefined") {
		// We have an error.  Maybe the PLC is not reachable.
		console.log(err);
        process.exit();
        }
    conn.setTranslationCB(function(tag) {return variables[tag];});  
    conn.addItems('Start');
    conn.addItems('Stop');
    conn.readAllItems(valuesReady);
}


function valuesReady(anythingBad, values) {
	if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
    console.log(values);
	doneReading = true;
	if (doneWriting) { process.exit(); }
}

function valuesWritten(anythingBad) {
	if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
	console.log("Done writing.");
	doneWriting = true;
	if (doneReading) { process.exit(); }
}