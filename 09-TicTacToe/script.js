const cells=document.querySelectorAll('.cell')
const title=document.querySelector('#choose')
const xPlayer=document.querySelector('#xPlayer')
const oPlayer=document.querySelector('#oPlayer')
const reset=document.querySelector('#restart')

let player='X'
isPause=false
isStart=false

const inputCell=[
    '','','',
    '','','',
    '','',''
]

const winConditions=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]


function choosePlayer(selected){
    if(!isStart){
        player=selected
        if(player=='X'){
            oPlayer.classList.remove('active-P')
            xPlayer.classList.add('active-P')
            console.log(xPlayer)
        }
        else{
            xPlayer.classList.remove('active-P')
            oPlayer.classList.add('active-P')
        }
    }
}

cells.forEach((cell,index)=>{
    cell.addEventListener('click',()=>{
        tapCell(cell,index)
    })
})

 /*
1. Select PLayer
    Repeat
         1. Update the cell
        2. If Check Winner==false{
            i. Change Player
            ii. PLayer Turn(Computer)
                }
        3.  else{
            i. Declare Winner
            ii. Restart if want
                }
 */
function tapCell(cell,index){
    if(cell.textContent=='' && !isPause){
        isStart=true
        updateCell(cell,index)

        if(!checkWinner()){
            changePlayer()
            randomPick()
        }

    }
}

//Upadte Cell Function
function updateCell(cell,index){
     cell.textContent=player
    cell.style.color=(player=='X')?'#1892ea':'#a737ff'
     inputCell[index]=player
}

//Check Winner
function checkWinner(){
    for(const[a,b,c] of winConditions){
        if(inputCell[a]==player && inputCell[b]==player && inputCell[c]==player){
            declareWinner([a,b,c])
            return true
        }
    }

    // Check draw only after all win conditions have been checked
    if(inputCell.every(cell => cell != '')){
        draw()
        return true
    }

    return false
    }

//Declare Winner
function  declareWinner(winner){
    title.textContent=`${player} Win`
    isPause=true

    winner.forEach((index)=>{
        cells[index].style.background='#2a2343'
    })
    reset.style.visibility='visible'
}


//Draw
function draw(){
title.textContent='Draw'
isPause=true
 reset.style.visibility='visible'
}

//Change player
function changePlayer(){
    player=(player=='X')?'O':'X'
}

//Computer Turn
function randomPick(){
    isPause=true
    setTimeout(()=>{
        let randomIndex
        do{
            randomIndex=Math.floor(Math.random()*inputCell.length)
        }while(inputCell[randomIndex]!='')

        updateCell(cells[randomIndex],randomIndex)
        if(!checkWinner()){
            changePlayer()
            isPause=false
            return
        }
        player=(player=='X')?'O':'X'
    },1000)
    
}

reset.addEventListener('click',()=>{
    reset.style.visibility='hidden'
    inputCell.fill('')
    cells.forEach((cell)=>{
        cell.textContent=''
        cell.style.background=''
    })
    isStart=false
    isPause=false
    title.textContent='Choose'
})
