var fs=require("fs");
var docx2kdb=require("docx2kdb");
var convertfile=function(fn,cb) {
	var docxfn=fn.replace(".xml",".docx");
	if (needxml(fn)) {
		console.log("converting",docxfn)
		docx2kdb.convertToXML(docxfn,{},cb);	
	} else {
		cb({});
	}
	
}
var needxml=function(fn) {
	var docxfn=fn.replace(".xml",".docx");	
	fn=fn.trim();
	if (!fs.existsSync(fn)) return true;
	var statxml=fs.statSync(fn);
	var statdocx=fs.statSync(docxfn);
	return (Date.parse(statdocx.mtime)>Date.parse(statxml.mtime));
} 
var savexml=function(session) {
	if (!session.filename) return;	
	var xmlfn=session.filename.replace(".docx",".xml");
	
	var h0=xmlfn.replace(".xml","");
	var idx=h0.lastIndexOf("/");
	if (idx>-1) h0=h0.substr(idx+1);
	fs.writeFileSync(xmlfn,"<xml>\n<H0>"+h0+"</H0>\n"+session.output.join("\n")+"</xml>","utf8");
}
var convertfiles=function(list,cb){
	var taskqueue=[];
	for (var i=0;i<list.length;i++) {
		taskqueue.push(
		(function(fn){
				return (
					function(session){
						if (!(typeof session=='object' && session.__empty)) {
							savexml(session);
						}
						convertfile(fn, taskqueue.shift());
					}
				);
			})(list[i])
		);
	}

	//last call to child load
	taskqueue.push(function(session){
		savexml(session);
		cb();
	});

	taskqueue.shift()({__empty:true});
}
module.exports=convertfiles;