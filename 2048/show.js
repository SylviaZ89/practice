/**
 * Created by rsz89 on 14-6-12.
 */
function showAnimation(i,j,number){
	var numberCell = $('#number-cell-'+i+'-'+j);
	numberCell.css('background-color',getNumberbgColor(number));
	numberCell.css('color',getNumberColor(number));
	numberCell.text(number);

	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)

	},50);
}


function moveAnimation(fromx,fromy,tox,toy){
	var numberCell = $("#number-cell-"+fromx+"-"+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
}

function updateScore(score){
	$('#score').text(score);
}