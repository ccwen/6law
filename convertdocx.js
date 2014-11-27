//http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
var fs=require("fs");
var subdir=process.argv[3]||"law";
var lst=fs.readdirSync(subdir);
var sep=require("path").sep;
var exec=require("child_process").exec;
var convert=function(fn){
	var cmd="wscript doc2docx.vbs "+subdir+sep+fn;
	exec(cmd);
}
//lst.length=2;
lst.map(convert);