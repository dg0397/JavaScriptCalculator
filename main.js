const display = document.querySelector('#display');
const options = Array.from(document.querySelectorAll('input'));
const btns  =  options.filter(x=> x.type === 'button' && x.value != 'AC' && x.value != "«" && x.value != "=" );
const equals = document.getElementById('equals');
const ac = document.getElementById('clear');
const eraser = document.getElementById('eraser');

let punto = true;
let op = ['+','-','0','.','*','/'];
let input = ['1','2','3','4','5','6','7','8','9'];


function addToScreen(e){
    if(punto){
        goBack()
        display.value = display.value + e.target.value;
        punto = false;
    }else{
        let val = display.value;
        let c = (val[val.length-1]=== e.target.value)? true: false;
        if(c && op.includes(val[val.length-1]) && op.includes(e.target.value) && e.target.value!='0'){
            goBack();
        };
        if(val[0]==='0' && e.target.value==='0' )return;
        if(op.includes(val[val.length-1]) && op.includes(e.target.value) && val[val.length-1] !='0' && e.target.value != '0'&& val[val.length-1] !='.' && e.target.value != '.'){
            display.value = val.slice(0,val.length-1); 
        };
       
        for(let i = 2 ; i<10;i++){
            if(val[val.length-i]==='.' && e.target.value==='.' && !val.includes('+') && !val.includes('-') && !val.includes('/') && !val.includes('*')){
                return;
            }
        }
        
        display.value = display.value + e.target.value;
    }
}

function evalScreen(){
    try {
    let x = display.value;
    x = eval(x);
    display.value=(Math.round(x*10000)/10000);    
    }
    catch(e){
        display.value='Error'
    }
}

function clearAll(){
    display.value=0;
    punto = true
}

function goBack(){
    let x = display.value;
    x = x.substring(0,x.length-1);
    display.value = x;
}

//add functions to btn
btns.forEach(btn => btn.addEventListener('click',addToScreen));
equals.addEventListener('click',evalScreen);
ac.addEventListener('click',clearAll);
eraser.addEventListener('click',goBack);

options.forEach(option => option.addEventListener('click',function(){
        this.classList.add('playing')
    }));
function removeTransition(e){
    //if(e.propertyName !== 'transform')return; // stop it if property is not a transform
    this.classList.remove('playing')
}
options.forEach(option => option.addEventListener("transitionend",removeTransition));

//key functions
window.addEventListener('keydown',function(e){
    
    const key = this.document.querySelector(`input[data-key="${e.keyCode}"]`);
    if(!key)return;
    key.classList.add('playing');
    //addToScreen(key.value)
    if(e.keyCode==8)goBack();
    if(e.keyCode==13)evalScreen()
    
    function addToScreenByKey(e){
        if(e.value==='«'|| e.value=== '=')return;
        if(punto){
            goBack()
            display.value = display.value + e.value;
            punto = false;
        }else{
            let val = display.value;
            let c = (val[val.length-1]=== e.value)? true: false;
            if(c && op.includes(val[val.length-1]) && op.includes(e.value) && e.value!='0'){
                goBack();
            };
            if(val[0]==='0' && e.value==='0' )return;
            if(op.includes(val[val.length-1]) && op.includes(e.value) && val[val.length-1] !='0' && e.value != '0'&& val[val.length-1] !='.' && e.value != '.'){
                display.value = val.slice(0,val.length-1); 
            };
           
            for(let i = 2 ; i<10;i++){
                if(val[val.length-i]==='.' && e.value==='.' && !val.includes('+') && !val.includes('-') && !val.includes('/') && !val.includes('*')){
                    return;
                }
            }
            
            display.value = display.value + e.value;
        }
    }
    addToScreenByKey(key);
})