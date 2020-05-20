let img;

function preload() {
    img = loadImage('perso.png');
}

function setup() {
    createCanvas(1500, 800);
    stairs = new Stairs();
    manager = new ManageCharacter(stairs);
  }
  
  function draw() {
    background(220);

    // fill(150)
    // rect(500,600, 400, 60);
    manager.myStairs.drawStairs();

    manager.createCharacter();

  }


  //Step Class
class Step {
    static num = 6;
    constructor(x_position, y_position, w_width, h_height) {
        this.number =  
        this.width = w_width;
        this.height = h_height;
        this.x = x_position;
        this.y = y_position;
        this.characterArrayPosition = [];
        for (let i=0; i<6 ; i++) {
                this.characterArrayPosition.push(i * (this.width/5) + (this.width/5)/2 );
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
        this.steps.push(new Step(600,600, 600, 60))
        for (let i = 1; i < 5; i ++) {
            this.steps.push(new Step( this.steps[0].x - (this.steps[i-1].width*0.9 - this.steps[0].x )/2 , this.steps[i-1].y - this.steps[i-1].height*0.9, this.steps[i-1].width*0.9 , this.steps[i-1].height*0.9 ));
        }
    }

    drawStairs() {
        this.steps.forEach(element => { element.drawStep()});
    }
}

  //character Class
class character {
    static NbCharacter = [0,0,0,0,0] ;

    constructor(x_position, y_position, k) {
        this.numberCharacter = k;
        switch(this.numberCharacter) {
            case 0:
                this.keyUp = 'e';
                this.KeyDown = 'd';
            case 1:
                this.keyUp = 'r';
                this.KeyDown = 'f';
            case 2:
                this.keyUp = 't';
                this.KeyDown = 'g';
            case 3:
                this.keyUp = 'o';
                this.KeyDown = 'l';
            case 4:
                this.keyUp = 'p';
                this.KeyDown = 'm';
        this.x = x_position;
        this.y = y_position;
        this.imgPerso = image(img, this.x, this.y)
        this.stepPosition = 0 ;
        }
    }

    movekeyPressed(StepArrayX) {
        if (Key == this.up) {
            if (this.stepPosition < 6)
                this.stepPosition+=1;
                this.x = newXPosition;
                this.y += 60;
                this.imgPerso = image(img, this.x, this.y);
        }
    }

}

class ManageCharacter {
    constructor(stairs) {
        this.myStairs = stairs;
        this.characterArrayNumber = [0,0,0,0,0];
        this.characterArray = [null, null, null, null, null];
    }

    createCharacter() {
        let k = 0;
        while (k<5) {
            if (this.characterArray[k] == null) {
                this.characterArrayNumber[k] == k+1;
                this.characterArray[k] = new character( this.myStairs.steps[0].characterArrayPosition[k] , 540, k);
                return;
            }
            k++;
        }
    }

    deleteCharacter() {
        let k = 0;
        while (k<5) {
            if (this.characterArray[k] != null) {
                delete this.characterArray[k];
                return;
            }
            k++
        }
    }
}