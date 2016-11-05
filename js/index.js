currslide=0;
function hide_slide(s)
	{
		s.style.width=0; s.style.padding=0; s.style.overflow="hidden"; s.style.border="none"; s.style.minHeight=0; s.style.height=0; opacity:0; s.style.margin=0;
	}
function show_slide(s)
	{
	s.style="";
	}
function change_slide(nm)
{
	l = document.getElementsByClassName("slide");
	hide_slide(l[currslide]);
	currslide=mod((currslide+nm),l.length);
	show_slide(l[currslide]);
	document.getElementById('slide_nmbr').innerHTML=(currslide+1)+" / " + l.length;
}

function init()
{
	document.title = title;
	document.body.background = background;
	document.body.style.backgroundSize="cover";
	var converter = new showdown.Converter()
	for (i=0; i<slides.length; i++)
		document.body.innerHTML +=  "<div class='slide'>" + converter.makeHtml(slides[i]) + "</div> ";		
	l = document.getElementsByClassName("slide")
	for (i=1; i<l.length; i++)
		hide_slide(l[i]);
	document.body.innerHTML+=" <footer><div class='half'><label id='slide_nmbr'></label></div><div class='half'><span id='speaker_name'>"+speaker_name+": <i>"+title+"</i></span> <span id='infoloc'>"+info_presentation+"</span><label id='timeshow'></label></div></footer> ";
	change_slide(0);

/*<button class='cntrl' onclick='change_slide(-1)'>Prev</button> <button class='cntrl' onclick='change_slide(+1)'>Next</button> */
}

document.onkeydown = function (e) {
    e = e || window.event;
    if (e.keyCode==39 || e.keyCode==32) change_slide(+1);
    else if (e.keyCode==37) change_slide(-1);
};

function mod(n, m) {
        return ((n % m) + m) % m;
}

init();
