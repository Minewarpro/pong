/**
 * ALGO: ceci est une classe...
 */
class Tableau1 extends Phaser.Scene {
    /**
     * Précharge les assets
     */
    preload() {
        this.load.image('carre', 'assets/carre.png');
        this.load.image('cercle', 'assets/cercle.png');

        this.load.image('carreOmbre', 'assets/carreOmbre.png');
        this.load.image('cercleOmbre', 'assets/cercleOmbre.png');
        this.load.image('carreBord', 'assets/carreBord.png');
        this.load.image('carreBordOmbre', 'assets/carreBordOmbre.png');
        this.load.image('carreVertOmbre', 'assets/carreVertOmbre.png');
        this.load.image('carreVert', 'assets/carreVert.png');
        this.load.image('ecranAccueil', 'assets/ecranAccueil.jpg');
        this.load.audio('raquetteSound', 'assets/sounds/raquetteSound.wav');
        this.load.audio('vertSound', 'assets/sounds/vertSound.wav');
        this.load.audio('startSound', 'assets/sounds/start.wav');
        this.load.audio('backSound', 'assets/sounds/backSound.mp3');

    }


    create() {
        this.power = 0;
        this.power2 = 500;
        this.doubleJump = 0;


        this.sol = this.physics.add.sprite(0, 700, 'carre').setOrigin(0, 0);
        this.sol.setTintFill(0xFFFFFF);
        this.sol.setDisplaySize(2000, 100);
        this.sol.body.setAllowGravity(false);
        this.sol.setImmovable(true);

        this.balle = this.physics.add.sprite(100, 500, 'cercle').setOrigin(0, 0);
        this.balle.setTintFill(0xFF0000);
        this.balle.setDisplaySize(50, 50);
        this.balle.body.debugShowBody = true;
        this.balle.body.debugBodyColor = 0xff00ff;


        this.physics.add.collider(this.balle, this.sol, function () {
            this.doubleJump = 1;
        });
    }

    create(){
        this.ecranAccueil = this.add.image(-20, 0, 'ecranAccueil').setOrigin(0,0);
        this.vertSound = this.sound.add('vertSound');
        this.raquetteSound = this.sound.add('raquetteSound');
        this.backSound = this.sound.add('backSound');
        this.backSound.play()
        this.backSound.volume = 0.3;
        this.backSound.loop = true;
        this.lockScreen = 0;
        this.initKeyboard();
    }

    jump(){
        console.log(this.balle.velocityY);
        this.balle.setVelocityY(-200*this.power2);
        this.timer2 = this.time.addEvent({delay: 100, callback: this.setPower, callbackScope: this, loop:true});


    }

    stopJump(){
        this.timer2.remove();
        this.balle.setVelocityY(0);
        this.power2 = 5;
    }
    
    setPower(){
        this.power2*=.8;
        console.log(this.power2);
    }



    initKeyboard() {
        let me = this;
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    if (me.balle.body.onFloor()){
                        me.balle.setVelocityY(-500);
                        me.doubleJump=1;
                    }
                    if (me.doubleJump==1 && !me.balle.body.onFloor()){
                        me.balle.setVelocityY(-500);
                        me.doubleJump=0;
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.balle.setVelocityX(200);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.balle.setVelocityX(-200);
                    break;

            }

        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.balle.setVelocityX(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.balle.setVelocityX(-0);
                    break;
            }
        });
    }


    update() {
           }
}