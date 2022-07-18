
let id=0;
let isX=true;
let canPlay=true;


// creates grid
function createGrid(){
   
    let temp;
    for(let i = 0;i<3;i++){
        temp+= `
        <tr>
            ${createRow()}
        </tr>
        `;
    }
    $("#grid").html(temp);
}

// creates rows within grid
function createRow(){
    let row="";
    for(let i =0;i<3;i++){
        row+=`
            <td class="cell" id=${id} value="0"> </td>
        `;       
        id++;
    }
    console.log(row);
    return row;
}
createGrid();

// adds x or o to board
function addValues(i){
    let x=$(`#${i.id}`);

    let v=x.text();//x or o
    if(v!="X" && v!="O"){

        x.attr("value",getValue());
        x.text(`${getTurn()}`);
        
        evaluate(getBoard());
        
    }
}

function getBoard(){
    let board =[];
    let z=0;
    for(let i =0;i<3;i++){
        board.push([]);
        for(let j=0;j<3;j++){
            board[i].push(parseInt($(`#${z}`).attr("value")));
            z++;
        }
    }
    return board;
}


function evaluate(board){
    let rowSum = board.map(r => r.reduce((a, b) => a + b));
    let colSum = board.reduce((a, b) => a.map((x, i) => x + b[i]));
    colSum.map(x=>checkForWin(x));
    rowSum.map(x=>checkForWin(x));
    diagonalSums(board).map(x=>checkForWin(x));
}

function checkForWin(n){
    let m = $(`#message`);
    if(n==3){
        m.text("Congrats to Player: X!!");
        canPlay=false;
    } else if(n==-3){
        m.text("Congrats to Player: O!!");
        canPlay=false;
    } else if (isDrawn()){
        m.text("DRAW!!");
        canPlay=false;
    }


}

function isDrawn(){
    for (let i of getBoard()) {
        for (let j of i) {
            if(j==0){
                return false;
            }
        }
      }
    return true;
}

function getValue(){
    if(isX){
        return 1;
    } 
    return -1;
}
// returns turn
function getTurn(){
    let temp = isX;
    if(isX){
        temp="X";  
        $(`#turn`).text(`Turn: O`);
    } else {
        temp="O";
        $(`#turn`).text(`Turn: X`);
    }
    isX=!isX;
    return temp;
}

function diagonalSums(board) {
    let d1 = 0, d2 = 0;
    for (let row = 0; row < board.length; row++) {
        d1 += board[row][row];
        d2 += board[row][board.length - row - 1];
    }
    console.log(d1 + ' ' + d2);
    return [d1,d2];
}

// Event Listener
document.querySelectorAll('#grid td')
.forEach(e => e.addEventListener("click", function() {
    if(canPlay){
        addValues(event.target);
    }
}));

btn.addEventListener("click",function(){
    location.reload();
});