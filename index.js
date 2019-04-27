//configurando os botões
let redBlock = $('#red');
let yellowBlock = $('#yellow');
let blueBlock = $('#blue');
let greenBlock = $('#green');
let blocks = [redBlock,yellowBlock,blueBlock,greenBlock];

//adicionando o event
for (let index = 0; index < blocks.length; index++) {
    array[index].on("click",);
    
}



let stack = [];
let stackStatus = [];
let level = 0;
let lose = false;
let header = $("#level-title");
$("body").on("keypress",(event) => {
    // while(!(lose)){
    //     level++;
    //     header.text("level" + toString(level));
    //     addBlock(queue);
    // }

});

let addBlock = function(queue,blocks){
    let random;
        random = Math.floor(Math.random()*4);
        switch(random){
            case 0:
                queue.push(blocks[0]);
                break;
            case 1:
                queue.push(blocks[1]);
                break;
            case 2:
                queue.push(blocks[2]);
                break;
            case 3:
                queue.push(blocks[3]);
            }
        }

let blockGlow = function(block){
            block.addClass("pressed");
            setTimeout(function(){
                block.removeClass("pressed");
            },450);        
    }


let correctBlockCheck = function(block,queueBlock){
    if(block == queueBlock)
        return true;
    else
        return false;
    
}    

let fill = function(originalStack,support){
    for(let i = 0; i < originalStack.length;i++){
        support.push(originalStack[i]);
    }
}

    

