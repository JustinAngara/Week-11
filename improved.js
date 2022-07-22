class Grid{
    createGrid(){
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
    createRow(){
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
}

class Game{
    constructor(id,canPlay,isX){
        this.id = id;
        this.canPlay=canPlay;
        this.isX=isX;
    }

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

let grid = new Grid();
grid.createGrid();