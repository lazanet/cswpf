// lehollandaisvolant.net/tout/examples/swipe/
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);
document.addEventListener('touchcancel', handleTouchEnd, false);

var xDown = null;
var yDown = null;
var doTouchBreak = null;
var minDelta = 200;

function handleTouchEnd() {
	doTouchBreak = null;
};

function handleTouchStart(evt) {
	xDown = evt.touches[0].clientX;
	yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
	if ( !xDown || !yDown || doTouchBreak) { return; }

	var xUp = evt.touches[0].clientX;
	var yUp = evt.touches[0].clientY;

	var xDiff = xDown - xUp;
	var yDiff = yDown - yUp;

	// horizontal swipe
	if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
		if ( xDiff > minDelta ) {
			/* left swipe */
			change_slide(+1);
			doTouchBreak = true;
		} else if ( xDiff < -minDelta) {
			/* right swipe */
			change_slide(-1);
			doTouchBreak = true;
		}
	// vertical swipe
	} else {
		if ( yDiff > minDelta ) {
			/* up swipe */
			doTouchBreak = true;
		} else if ( yDiff < -minDelta) {
			/* down swipe */
			doTouchBreak = true;
		}
	}

	if (doTouchBreak) {
		xDown = null;
		yDown = null;
	}
};
