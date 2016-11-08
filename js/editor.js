document.body.innerHTML+="<button onClick='clearAll()'>New</button> <button onClick='loadFromExt()'>Import from JS</button> <button onClick='render()'>Render</button> <button onClick='exportJS()'>Export to JS</button><br><input id='title' placeholder='Presentation title'></input> <input id='info_presentation' placeholder='Info about presentation'></input> <input id='speakername' placeholder='Speaker name'></input> <input id='background' placeholder='Background picture'></input><table id='main'></table> <button onClick='addSlide()'>Add new slide</button>";
document.body.innerHTML+="<style>body {overflow:scroll; overflow-x:hidden;} h1 {width:100%; border-bottom:1px solid #aaa;}table {width:100%; border-collapse:collapse; margin-bottom:10px;} td {width:50%; padding:10px; } tr {border-bottom:2px solid #ccc;} .slide {border:1px solid #ccc; height:350px; overflow:scroll;} textarea {width:100%; resize:vertical; height:202px } input{margin-top:10px;}</style>";

tmp=[]
cnt=0;
function saveLocalVals()
{
	tmp=[];
	list = document.getElementsByTagName("textarea");
	for (i=0;i<list.length;i++)
		tmp.push(list[i].value);
}
function setVals()
{
	list = document.getElementsByTagName("textarea");
	for (i=0;i<tmp.length;i++)
		list[i].value=tmp[i];
}
function addSlide()
{
	saveLocalVals();
	document.getElementById("main").innerHTML+="<tr><td><textarea class='data' oninput='renderOne("+(cnt++)+")'></textarea></td><td><div class='slide' id='slide"+cnt+"'></div></td></tr>";
	setVals();
}
function loadData(l)
{
	eval(l);
	for (i=0;i<slides.length;i++)
		{addSlide(); document.getElementsByClassName("data")[document.getElementsByClassName("data").length-1].value=slides[i];}
	document.getElementById("title").value = title;
	document.getElementById("info_presentation").value = info_presentation;
	document.getElementById("speakername").value = speaker_name;
	document.getElementById("background").value = background;
}
function loadFromExt()
{
	cnt=0;
	loadData(prompt("Enter old generated code (cancel to load from slides.js):"));
	render();
}
function renderOne(n)
{
	document.getElementsByClassName("slide")[n].innerHTML = converter.makeHtml(document.getElementsByClassName("data")[n].value);
	renderMathInElement(document.getElementsByClassName("slide")[n]);
}
function render()
{
	saveLocalVals();
	list = document.getElementsByClassName('slide');
	for (i=0;i<tmp.length;i++)
		list[i].innerHTML=converter.makeHtml(tmp[i]);
	renderMathInElement(document.body);
}
function exportJS()
{
	saveLocalVals();
	prompt("Copy this code to slides.js", 'title="'+document.getElementById('title').value+'";\n'+'background="'+document.getElementById('background').value+'";\n'+'info_presentation="'+document.getElementById('info_presentation').value+'";\n'+'speaker_name="'+document.getElementById('speakername').value+'";\nslides='+JSON.stringify(tmp));
}
function clearAll()
{
	document.getElementById("main").innerHTML="";
	document.getElementById("title").value = "";
	document.getElementById("info_presentation").value = "";
	document.getElementById("speakername").value = "";
	document.getElementById("background").value = "";
	cnt=0;
}
var converter = new showdown.Converter()
loadData();
render();
