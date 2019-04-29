//setting the buttons
let redBlock = $('#red');
let yellowBlock = $('#yellow');
let blueBlock = $('#blue');
let greenBlock = $('#green');
let blocks = [redBlock,yellowBlock,blueBlock,greenBlock];
let header = $("#level-title");
let body  = $("body");
let recordHeader = $(".record");

//setting the queue and player attributes
let queue = [];
let stackStatus = [];
let level = 0;
let clicks = -1;
let start = false;
let record = 0;






//starting the game by keyboard or click

if(!check()){
    $(body).on("keypress", () => {
        if(!start){
                start = true;
                play(start,level);
                show(queue,0);
            }
        });
}
else{
    $(body).on("click", () => {
        if(!start){
                start = true;
                play(start,level);
                show(queue,0);
            }
        });  
}

  
     
       
  




//main behaviour
let play = function(start,level){
    if(start){
            header.text("level " + (level+1).toString());
            addBlock(queue,blocks);
    };

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
            },1500);
            console.log(start);
        }
        else{
            restart();



        };
       
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
    start = false;
    stackStatus = [];
    clicks = -1;
    if(level > record)
        record = level+1;
    level = 0;        
    header.text("YOU LOSE, BROOOO!");
    $("body").css("backgroundColor","red");
    wrongSound();
    setTimeout(()=>{
        header.html("PC: Press Any Key To Restart!<br><br>Mobile: Click Anywhere To Restart");
        $("body").css("backgroundColor","#011F3F");
        recordHeader.text("recorde:" + record.toString());
    },600);
    if(!check()){
        $(body).on("keypress", () => {
            if(!start){
                    start = true;
                    play(start,level);
                    show(queue,0);
                }
            });
    }
    else{
        $(body).on("click", () => {
            if(!start){
                    start = true;
                    play(start,level);
                    show(queue,0);
                }
            });  
    }
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

//bizarre function i found on stackoverflow for mobile checking
function check(){
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };