var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;

var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

window.onload = function () {

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            let tile = document.createElement("img");

            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";
            tile.className = "tile";
            tile.draggable = true;
            //touch
            tile.addEventListener("touchstart", touchStart);
            tile.addEventListener("touchmove", touchMove);
            tile.addEventListener("touchend", touchEnd);

            // DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving another image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles

            document.getElementById("board").append(tile);
        }
    }
}

function dragStart(e) {
    currTile = this; //this refers to the img tile being dragged
    e.dataTransfer.setData("text/plain", this.id);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop(e) {
    otherTile = this; //this refers to the img tile being dropped on
    const currTileId = e.dataTransfer.getData("text/plain");
    const currTileElement = document.getElementById(currTileId);
    const otherTileId = this.id;
    const otherTileElement = this;

    /*  if (!otherTileElement.src.includes("3.jpg")) {
          return;
      }
  */
    // Swap the tiles
    let currImg = currTileElement.src;
    let otherImg = otherTileElement.src;

    currTileElement.src = otherImg;
    otherTileElement.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;

}

function dragEnd() {

}
function touchStart(e) {
    e.preventDefault();
    currTile = this;
}

function touchMove(e) {
    e.preventDefault();
    // Add your touch move logic here if needed
}

function touchEnd(e) {
    e.preventDefault();
    if (currTile && otherTile && currTile !== otherTile) {
        // Swap the tiles
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }
    currTile = null;
    otherTile = null;
}



function showAlert() {
    Swal.fire({
        title: 'المرحلة الأولى',
        text: 'عزيزتي عليكي بتركيب الصورة التي تدل على إحدى صفات الرسول الأكرم (ص) بأقل عدد من محاولات التحريك',

        confirmButtonText: 'تم'
    });
}


