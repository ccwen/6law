var JSZip=require("jszip");
var fs=require("fs");
var documentfn="word/document.xml";
var relsfn="word/_rels/document.xml.rels";
var docxlink=function(fn) {
// read a zip file
	fs.readFile(fn, function(err, data) {
	  if (err) throw err;
	  var zip = new JSZip(data);

	  
	  var xml=zip.file(documentfn).asText();
	  var rels=zip.file(relsfn).asText();

//TODO
//"file:///c:\dev2014\6law\S-link警察實用法令索引.doc"
//改為  "S-link警察實用法令索引.docx"

//"file:///c:\dev2014\6law\law\刑法判例彙編60-86年.doc" 
//改為 "../law/刑法判例彙編60-86年.docx"

//use process.cwd(); to read current working directory


	  xml=xml.replace(/\.doc"/g,'.docx"');
	  rels=rels.replace(/\.doc"/g,'.docx"');

	  zip.file(documentfn,xml);
	  zip.file(relsfn,rels);

	  var buffer = zip.generate({type:"nodebuffer",compression:"DEFLATE"});

	  fs.writeFile("!"+fn, buffer, function(err) {
		  if (err) throw err;
	  });
	});
}

docxlink("民法.docx");


module.exports=docxlink;