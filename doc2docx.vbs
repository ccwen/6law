
Set objWord = CreateObject("Word.Application")
Set args = WScript.Arguments
Set oShell = CreateObject("WScript.Shell")
Set ofso = CreateObject("Scripting.FileSystemObject")
const  wdFormatXMLDocument = 19 
const wdFormatDocumentDefault =16
rem oShell.CurrentDirectory = ofso.GetParentFolderName(Wscript.ScriptFullName) 

fn =  ofso.GetParentFolderName(Wscript.ScriptFullName)+"\\"+args.Item(0)
REM Wscript.echo(fn)


objWord.Visible = True
objWord.DisplayAlerts = False

objWord.Documents.Open fn ,, True
Set objDoc = objWord.ActiveDocument

objDoc.SaveAs fn & "x", wdFormatDocumentDefault
objDoc.Close
objWord.Quit