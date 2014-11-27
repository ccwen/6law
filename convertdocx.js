//http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
var fs=require("fs");
var subdir=process.argv[3]||"law";
var lst=fs.readdirSync(subdir);
var sep=require("path").sep;
var exec=require("child_process").exec;
var i=0;

var convert=function(fn){
	if (fn.substr(fn.length-4)==".doc") {
		var cmd="wscript doc2docx.vbs "+subdir+sep+fn;
		console.log(fn);
		exec(cmd,function(err,stdout,stderr){
			i++;
			if (i<lst.length)  convert(lst[i]);
		});
	} else {
		i++;
		if (i<lst.length)  convert(lst[i]);
	}
}

convert(lst[i]);