//setting the buttons
let redBlock = $('#red');
let yellowBlock = $('#yellow');
let blueBlock = $('#blue');
let greenBlock = $('#green');
let blocks = [redBlock,yellowBlock,blueBlock,greenBlock];


//setting the queue 
let queue = [];
let stackStatus = [];
let level = 0;
let clicks = -1;
let lose = false;
let start = false;
let header = $("#level-title");
let body  = $("body");




//starting the game
$(document).on("keypress", () => {
     if(!start){
            start = true;
            play(start,level);
            show(queue,0);
        };
    });
     
       
  




//main behaviour
let play = function(start,level){
    if(start){
        if(!lose){
            header.text("level " + (level+1).toString());
            addBlock(queue,blocks);
        }
    }

};

//adding the events
for(let index = 0; index < blocks.length; index++) {
    blocks[index].click((event) =>{
        clicks++;
        stackStatus.push(blocks[index]);
        blockGlow(blocks[index]);
        if(correctBlockCheck(stackStatus,queue,clicks)){
            blockSound(blocks[index]);
            setTimeout(()=>{
                        if(clicks == queue.length-1){
                        clicks = -1;
                        stackStatus = [];
                        level++;
                        play(start,level);
                        show(queue,0);
                    };
            },1000);
        }
        else{
            lose = true;
            //restarting the game
            if(lose){
                restart();
                start = false;
                lose = false;
            }
        
        }
        console.log(correctBlockCheck(stackStatus,queue,clicks));
       
    });
};







//function declaration

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
        };

function blockGlow(block){
            block.addClass("pressed");
            setTimeout(function(){
                block.removeClass("pressed");
            },300);
        };


function show(queue,i){
     if(i < queue.length){
            blockGlow(queue[i]);
            setTimeout(function( ){
                show(queue,i+1);
            },800);
    }
}    


let correctBlockCheck = function(block,queueBlock,clicks){
        if(block[clicks] != queueBlock[clicks])
            return false;
        return true;    
        
    }

function restart(){
    queue = [];
    stackStatus = [];
    level = 0;
    clicks = -1;
    header.text("YOU LOSE, BROOOO!");
    $("body").css("backgroundColor","red");
    wrongSound();
    setTimeout(()=>{
        header.text("Press any key to restart!");
        $("body").css("backgroundColor","#011F3F");
    },600);
}




function blockSound(bloco){
    let audio = new Audio("./sounds/red.mp3");
    switch(bloco){
        case blocks[0]:
            audio.play();
            break;
        case blocks[1]:
            audio = new Audio("./sounds/yellow.mp3");
            audio.play();
            break; 
        case blocks[2]:
            audio = new Audio("./sounds/blue.mp3");
            audio.play();
            break;
        case blocks[3]:
            audio = new Audio("./sounds/green.mp3");
            audio.play();
            break;                          
    }
}

function wrongSound(){
    let audio = new Audio("./sounds/wrong.mp3");
    audio.play();
}