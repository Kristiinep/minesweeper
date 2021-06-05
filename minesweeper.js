"use strict"

var bsize, board, nrofbombs;
var isgameover = false;
var possiblemoves, sum, id, moves, playersresults;
var player = 0;
var all_results = [];

function gid(x){
    return document.getElementById(x);
}
            
function gidh(x){
    return document.getElementById(x).innerHTML;
}
            
function myfun(x){
    var y="Siin on uus sisu ja "+x;
    console.log("vajutas nuppu!");
    gid("koht1").innerHTML=y;
}
			
function makeBoard(size,bombs) {
	var board=[]; 
			  
	if (bombs>=size*size) throw "too many bombs for this size";
			  
			  // initialize board, filling with zeros
		for (var x=0; x<size; x++) {
			board[x]=[]; // insert empty subarray
			for (var y=0; y<size; y++) board[x][y]=0;
		}

			  // now fill board with bombs in random positions
	var i = bombs;
	while (i>0) {
		// generate random x and y in range 0...size-1
		x=Math.floor(Math.random() * size);
		y=Math.floor(Math.random() * size);
		// put bomb on x,y unless there is a bomb already
	if (board[x][y]!=1) {
		board[x][y]=1;
        console.log("Bomb:", x, y);
		i--; // bomb successfully positioned, one less to go
				  //console.log("positioned "+x+", "+y+" yet to go "+i);
		}
	}
			  
	return board;
}

function press(x,y) {
	if (!isgameover)
        {
            console.log("press: ",x+","+y);
            //x = window.event.x;
            //y = window.event.y;
            var isbomb = board[x][y];
            if (isbomb == 1)
                {
                    var p = "x"+x+"y"+y;
                    gid(p).style.backgroundColor="#ffcccc";
                    gid(p).style.color="#660033";
                    gid(p).style.textAlign = "center";
                    gid(p).innerHTML="❤";

                    isgameover = true;
                    gid("start").innerHTML = "You clicked on the heart!";
                    gid("gameover").innerHTML = "GAME OVER!";
                    gid("results").innerHTML = ("Moves made: " + moves);
                    player ++;
                    all_results.push("Player "+ player+ ":"    + moves);
                    localStorage.setItem("PlayerResult", all_results);

                }
            else if (moves == possiblemoves)
            {
                id = "x"+x+"y"+y;
                gid(id).style.backgroundColor="#ff0066";
                gid(id).style.color="#ffcccc";
                gid(id).style.textAlign = "center";
                gid(id).innerHTML = sum;
                isgameover = true;
                gid("start").innerHTML = "YOU WON!";
                moves += 1;
                gid("results").innerHTML = ("Moves made: " + moves);
                player ++;
                all_results.push("Player "+ player+ ":"    + moves);
                localStorage.setItem("PlayerResult", all_results);
            }
            
            else
            {
                
                var numbers = neighbours(bsize, x, y);
                sum = 0;
                
                console.log("numbers", bsize*bsize, "nrof", nrofbombs);
                    for (var k=0; k<numbers.length; k++)
                        {
                            sum = sum + numbers[k][2];

                        }
                console.log(sum);
                id = "x"+x+"y"+y;
                if (gid(id).innerHTML != "")
                    {
                        console.log("moves: ", moves);
                    }
                else
                {
                    gid(id).style.backgroundColor="#ff0066";
                    gid(id).style.color="#ffcccc";
                    gid(id).style.textAlign = "center";
                    gid(id).innerHTML=sum;
                    moves += 1;
                    console.log("moves: ", moves);
                    
                }
                  
            
                                 
            }
            
        }
             
}
			
function drawBoard(board){
	gid("koht1").innerHTML="uus sisu";
	var c="";
	c="<table>";
	for(var x=0; x<board.length; x++){
		c+="<tr>";
		
	
	for(var y=0; y<board.length; y++) {
		c+="<td class='bcell' id='x"+x+"y"+y+"' onclick='press("+x+", "+y+")'></td>"
	}
	c+="</tr>"
	}
	c+="</table>"
	gid("koht1").innerHTML=c;
}

function neighbours(size,x,y) {
  var list=[];
  for (var i=-1; i<=1; i++) {    
    for (var j=-1; j<=1; j++) {
      // square is not a neighbour of itself
      if (i==0 && j==0) continue;
      // check whether the the neighbour is inside board bounds
      if ((x+i)>=0 && (x+i)<size && (y+j)>=0 && (y+j)<size) {
        list.push([x+i,y+j, board[x+i][y+j]]);  
      }
    }
  }
  return list;
}

function startGame() {
	isgameover = false;
    gid("gameover").innerHTML="";
    var s;
    moves = 0;
    gid("allresults").innerHTML = "";
    gid("results").innerHTML = "";
	console.log("StartGame");
	s=gid("sizeselect").selectedIndex;
	var a = gid("sizeselect").options;
	bsize= a[s].value;
	nrofbombs = gid("numberinput").value;
    var maxbombs = bsize*bsize-1
	if (nrofbombs <= 0 || nrofbombs >= maxbombs)
	{
		gid("gameover").innerHTML = ("Number of bombs have to be between 1-" + maxbombs);
		
	}
	else
	{
		console.log(s);
		var l = "Your game has begun";
		gid("start").innerHTML = l;
		board = makeBoard(bsize, nrofbombs);
		drawBoard(board);
	}
    
    possiblemoves = bsize*bsize-nrofbombs-1;
    console.log("possible:" , possiblemoves);
	
}

function result()
{   
    playersresults = localStorage.getItem("PlayerResult");
    gid("allresults").innerHTML = playersresults;
}
