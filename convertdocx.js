//http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
var fs=require("fs");
var subdir=process.argv[2]||"law";
var lst=fs.readdirSync(subdir);
var sep=require("path").sep;
var exec=require("child_process").exec;
var i=0;

var convert=function(fn){
	i++;
	if (i>=lst.length) return;
	if (fn.substr(fn.length-4)==".doc" && !fs.existsSync(subdir+sep+fn+"x") ) {
		var cmd="wscript doc2docx.vbs "+subdir+sep+fn;
		console.log("converting "+fn);	
		exec(cmd,function(err,stdout,stderr){
			convert(lst[i]);
		});
	} else {
		convert(lst[i]);
	}
}

convert(lst[i]);