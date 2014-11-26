var fs=require("fs");
var docx2xml=require("./docx2xml");
var lst=fs.readFileSync(process.argv[2]||"law.lst",'utf8')
	      .replace(/\r\n/g,"\n").split("\n");

var finalized=function(session) {
	console.log("VPOS",session.vpos);
	console.log("FINISHED");
}
var warning=function() {
	console.log.apply(console,arguments);
}
var do_h0=function(text,tag,attributes,status) {
	var res=[];
	res=res.concat([
		{path:["head_depth"], value:1 }
		,{path:["head"], value:text  }
		,{path:["head_voff"], value: status.vpos }
	]);
	return res;
}
var do_h2=function(text,tag,attributes,status) {
	var res=[];
	var m=text.match(/第(\d+)條/);
	if (!m) return;
	res=res.concat([
		{path:["head_depth"], value:2 }
		,{path:["head"], value:m[1]  }
		,{path:["head_voff"], value: status.vpos }
	]);
	return res;
}

var captureTags={
	"H0":do_h0,
	"H2":do_h2,
}
var afterbodyend=function(s,status) {
	var apps=tei(status.starttext+s,status.parsed,status.filename,config,status);
}

var onFile=function(fn) {

}
var config={
	name:"6law"
	,meta:{
		config:"simple1"	
	}
	,glob:lst
	,pageSeparator:"a.n"
	,format:"TEI-P5"
//	,bodystart: "<body>"
//	,bodyend : "</body>"
	,reset:true
//	,setupHandlers:setupHandlers
	,finalized:finalized
//	,finalizeField:finalizeField
	,warning:warning
	,captureTags:captureTags
	,callbacks: {
		onFile:onFile
//		,beforebodystart:beforebodystart
		,afterbodyend:afterbodyend		
//		,beforeParseTag:beforeParseTag
	}
}
setTimeout(function(){ //this might load by gulpfile-app.js
	if (!config.gulp) {
		var kd=require("ksana-document");
		if (kd && kd.build) {
			docx2xml(lst,function(){
				kd.build();
			});
		}
	}
},100)
module.exports=config;