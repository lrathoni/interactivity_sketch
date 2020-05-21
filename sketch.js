let img;
let stairs;
let buttonUp;
let buttonDown;
let characterArray = [];
// function preload() {
//     img = loadImage('https://github.com/lrathoni/interactivity_sketch/blob/master/perso.png');
// }

function setup() {
    createCanvas(1500, 800);
    stairs = new Stairs();
    //characterArray.push(new Character( stairs.steps[0].characterArrayXPosition[0] , 540, 0));
    console.log(characterArray);
    buttonUp = createButton('+');
    buttonUp.position(100, 540);
    buttonUp.mousePressed(createCharacter);

    buttonDown = createButton('-');
    buttonDown.position(100, 600);
    buttonDown.mousePressed(deleteCharacter);
  }
  
  function draw() {
    background(220);
    stairs.drawStairs();
    if (characterArray.length > 0)
        drawCharacterArray();
  }




  //Step Class
class Step {
    static num = 5;
    constructor(x_position, y_position, w_width, h_height) {
        this.number =  
        this.width = w_width;
        this.height = h_height;
        this.x = x_position;
        this.y = y_position;
        this.characterArrayXPosition = [];
        this.characterArrayYPosition = [];
        for (let i=0; i<6 ; i++) {
                this.characterArrayXPosition.push(this.x + i * (this.width/5) + this.width/35 );
        }
    }

    drawStep() {
        fill(150)
        rect(this.x, this.y, this.width, this.height);
    }
}

  //Stairs Class
class Stairs {
    constructor() {
        this.steps = [];
        this.steps.push(new Step(200,600, 1000, 60))
        for (let i = 1; i < 6; i ++) {
            this.steps.push(new Step( this.steps[i-1].x + (this.steps[i-1].width*0.05) , this.steps[i-1].y - this.steps[i-1].height*0.9, this.steps[i-1].width*0.9 , this.steps[i-1].height*0.9 ));
        }
    }

    drawStairs() {
        this.steps.forEach(element => { element.drawStep()});
    }
}

  //character Class
class Character {
    constructor(x_position, y_position, k) {
        this.numberCharacter = k;
        switch(this.numberCharacter) {
            case 0:
                this.keyUp = 'e';
                this.KeyDown = 'd';
                break;
            case 1:
                this.keyUp = 'r';
                this.KeyDown = 'f';
                break;
            case 2:
                this.keyUp = 't';
                this.KeyDown = 'g';
                break;
            case 3:
                this.keyUp = 'o';
                this.KeyDown = 'l';
                break;
            case 4:
                this.keyUp = 'p';
                this.KeyDown = 'm';
                break;
        }
        this.x = x_position;
        this.y = y_position;
        //this.imgPerso = image(img, this.x, this.y)
        //this.imgPerso = rect(this.x, this.y, 80, 200);
        this.stepPosition = 0 ;
        }

    drawCharacter() {
        fill(240)
        rect(this.x, this.y, 80, 200);
    }

    moveUp(stairs) {
            if (this.stepPosition < 5) {
                this.stepPosition += 1;
                this.x = stairs.steps[this.stepPosition].characterArrayXPosition[this.numberCharacter];
                this.y -= stairs.steps[this.stepPosition-1].height;
            }
    }
    moveDown(stepDown) {
            if (this.stepPosition > 0) {
                this.stepPosition -= 1;
                this.x = stairs.steps[this.stepPosition].characterArrayXPosition[this.numberCharacter];
                this.y += stairs.steps[this.stepPosition].height;
            }
    }

    movekeyPressed(key, newPos) {
        if (key == this.keyUp)
            this.moveUp(newPos)
        if (key == this.KeyDown)
            this.moveDown(newPos)
    }

}


function createCharacter() {
    console.log(characterArray)
        if (characterArray.length <5) {
            console.log("k =" + characterArray.length )
            const k = characterArray.length;
            characterArray.push(new Character( stairs.steps[0].characterArrayXPosition[k] , 460, k));
            console.log("ici" + characterArray[k]);
        }
}

function deleteCharacter() {
        if (characterArray.length > 0) {
            const k = characterArray.length;
            //this.charactercharacterArrayNumber[k] == -1; 
            characterArray.pop();
        }
}

function drawCharacterArray() {
    //console.log(array);
    characterArray.forEach(element => element.drawCharacter());
}

function keyPressed() {
    if( (key == 'e' || key == 'd') && characterArray.length >= 1)
        characterArray[0].movekeyPressed(key, stairs)
    if( (key == 'r' || key == 'f') && characterArray.length >= 2)
        characterArray[1].movekeyPressed(key, stairs)
    if( (key == 't' || key == 'g') && characterArray.length >= 3)
        characterArray[2].movekeyPressed(key, stairs)
    if( (key == 'o' || key == 'l') && characterArray.length >= 4)
        characterArray[3].movekeyPressed(key, stairs)
    if( (key == 'p' || key == 'm') && characterArray.length >= 5)
        characterArray[4].movekeyPressed(key, stairs)
}