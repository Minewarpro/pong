/**
 * ALGO: ceci est une classe...
 */
class Tableau1 extends Phaser.Scene{
    /**
     * Précharge les assets
     */
    preload(){
        this.load.image('carre', 'assets/carre.png');
        this.load.image('cercle', 'assets/cercle.png');


        this.load.image('carreOmbre', 'assets/carreOmbre.png');
        this.load.image('cercleOmbre', 'assets/cercleOmbre.png');
        this.load.image('carreBord', 'assets/carreBord.png');
        this.load.image('carreBordOmbre', 'assets/carreBordOmbre.png');
        this.load.image('carreVertOmbre', 'assets/carreVertOmbre.png');
        this.load.image('carreVert', 'assets/carreVert.png');
        this.load.image('ecranAccueil', 'assets/acceuil.jpg');
        this.load.audio('raquetteSound', 'assets/sounds/raquetteSound.wav');
        this.load.audio('vertSound', 'assets/sounds/vertSound.wav');
        this.load.audio('startSound', 'assets/sounds/start.wav');
        this.load.audio('backSound', 'assets/sounds/backSound.mp3');



    }

    Play(){
        if (this.start == 1){
            this.ecranAccueil.setVisible(false);
            /**
             * Bord de l'écran et carré central
             */
            this.centre1Ombre = this.physics.add.sprite(this.largeur/2-5, 0, 'carreBordOmbre').setOrigin(0,0);
            this.centre1Ombre.setDisplaySize(10,this.hauteur);
            this.centre1Ombre.body.setAllowGravity(false);
            this.centre1Ombre.setImmovable(true);


            this.hautOmbre=this.physics.add.sprite(-this.largeur/2,-5, 'carreBordOmbre').setOrigin(0,0);
            this.hautOmbre.setDisplaySize(this.largeur*2,20);
            this.hautOmbre.body.setAllowGravity(false);
            this.hautOmbre.setImmovable(true);

            this.haut = this.physics.add.sprite(0, -15, 'carreBord').setOrigin(0,0);
            this.haut.setDisplaySize(this.largeur,20);
            this.haut.body.setAllowGravity(false);
            this.haut.setImmovable(true);


            this.basOmbre=this.physics.add.sprite(-this.largeur/2,this.hauteur-15, 'carreBordOmbre').setOrigin(0,0);
            this.basOmbre.setDisplaySize(this.largeur*2,20);
            this.basOmbre.body.setAllowGravity(false);
            this.basOmbre.setImmovable(true);


            this.bas=this.physics.add.sprite(0,this.hauteur-5, 'carreBord').setOrigin(0,0);
            this.bas.setDisplaySize(this.largeur,20);
            this.bas.body.setAllowGravity(false);
            this.bas.setImmovable(true);

            /**
             * Raquettes des Joueurs
             */

            this.gaucheOmbre = this.physics.add.sprite(45, this.hauteur/2-75, 'carreOmbre').setOrigin(0,0);
            this.gaucheOmbre.setDisplaySize(50,150);
            this.gaucheOmbre.body.setAllowGravity(false);
            this.gaucheOmbre.setImmovable(true);

            this.gauche = this.physics.add.sprite(60, this.hauteur/2-50, 'carre').setOrigin(0,0);
            this.gauche.setDisplaySize(20,100);
            this.gauche.body.setAllowGravity(false);
            this.gauche.setImmovable(true);

            this.droitOmbre = this.physics.add.sprite(this.largeur-95, this.hauteur/2-75, 'carreOmbre').setOrigin(0,0);
            this.droitOmbre.setDisplaySize(50,150);
            this.droitOmbre.body.setAllowGravity(false);
            this.droitOmbre.setImmovable(true);

            this.droit=this.physics.add.sprite(this.largeur-80,this.hauteur/2-50, 'carre').setOrigin(0,0);
            this.droit.setDisplaySize(20,100);
            this.droit.body.setAllowGravity(false);
            this.droit.setImmovable(true);


            /**
             * Balle
             */

            this.balle = this.physics.add.sprite(this.largeur/2, this.hauteur/2, 'cercle');
            this.balle.setDisplaySize(20,20);
            this.balle.body.setBounce(1.3,1.3);
            this.balle.body.setMaxVelocityX(900,900)
            this.balle.body.setMaxVelocityY(400,400)


            /**
             * Collider
             */

            let me = this;
            this.physics.add.collider(this.balle, this.droit, function () {
                console.log("touche droit");
                me.rebond(me.droit);
                me.sound.play('raquetteSound')
            });
            this.physics.add.collider(this.balle, this.gauche,  function () {
                console.log("touche gauche");
                me.rebond(me.gauche);
                me.sound.play('raquetteSound')
            });


            /**
             * Particles
             */

            this.particles = this.add.particles('cercle');

            this.particles.createEmitter({
                speed: 50,
                angle: this.balle.x+30,
                scale: { start: 0.04, end: 0 },
                blendMode: 'ADD',
                follow: this.balle,
                frequency: 1,
                lifespan: {min :300, max : 300},
                //tint: { start: 0xff945e, end: 0xff945e },
                x: this.balle.x,
                y: this.balle.y,
                //emitZone: { type: 'edge', source: path, quantity: 48, yoyo: false },
            });


            this.physics.add.collider(this.balle, this.haut);
            this.physics.add.collider(this.balle, this.bas);

            /**
             * Initilisation des fonctions et classes
             */

            this.creationRaquetteVerte();

            this.Initiale();



            this.joueurGauche = new Joueur('J1','joueurGauche')
            this.joueurDroite = new Joueur('J2','joueurDroite')

            //this.text=this.add.text(this.hauteur/2-300, 350, 'Press Space To Start').setOrigin(0,0).setFontSize(50);
        }

    }

    create(){
        this.ecranAccueil = this.add.image(0, 0, 'ecranAccueil').setOrigin(0,0);
        this.vertSound = this.sound.add('vertSound');
        this.raquetteSound = this.sound.add('raquetteSound');
        this.backSound = this.sound.add('backSound');
        this.backSound.play()
        this.backSound.volume = 0.3;
        this.backSound.loop = true;
        this.lockScreen = 0;
        this.initKeyboard();
        this.hauteur = 500
        this.largeur = 1000
        this.start =0


    }


    creationRaquetteVerte(){
        let me = this;
        let rect,ombre;
        this.obstacles=[];
        let xValue = 0;
        let xValueOmbre = 0;
        let yy = 0;
        let yyOmbre = 0;

        for(let i=0;i<8;i++){

            if (i<4){
                xValue = this.largeur-30;
                xValueOmbre = this.largeur-46;
                yy = 25+i*115;
                yyOmbre = i*115;
            }
            else {
                xValue = 10;
                xValueOmbre = -5;
                yy= 25+(i-4)*115;
                yyOmbre = (i-4)*115;
            }

            ombre = this.physics.add.sprite(
                xValueOmbre,
                yyOmbre,
                'carreVertOmbre'
            ).setOrigin(0,0);

            ombre.setDisplaySize(50,150);
            ombre.body.setAllowGravity(false);
            ombre.setImmovable(true);

            rect = this.physics.add.sprite(
                xValue,
                yy,
                'carreVert'
            ).setOrigin(0,0);
            rect.setDisplaySize(20,100);
            rect.body.setAllowGravity(false);
            rect.setImmovable(true);
            rect.ombre=ombre;

            this.obstacles.push(rect);

            this.physics.add.collider(this.balle, rect, function () {
                console.log("touche droitVert");
                me.rebond(me.obstacles[i]);
                me.disparait(me.obstacles[i]);
                me.sound.play('vertSound');
            });

        }
    }


    rebond(raquette){

        let me=this;

        console.log(raquette.y)
        console.log(me.balle.y)
        console.log((me.balle.y)-(raquette.y))

        let hauteurRaquette = raquette.displayHeight;

        let positionRelativeRaquette =(this.balle.y-raquette.y);

        positionRelativeRaquette = (positionRelativeRaquette/hauteurRaquette);

        positionRelativeRaquette = (positionRelativeRaquette*2-1);
        console.log(positionRelativeRaquette);

        this.balle.setVelocityY( this.balle.body.velocity.y + positionRelativeRaquette * hauteurRaquette)

    }



    disparait(obstacle){

        obstacle.body.setEnable(false);
        obstacle.setVisible(false);
        obstacle.ombre.setVisible(false);
    }



    Initiale (){
        let me = this

        this.balle.setX(this.largeur/2);
        this.balle.setY(this.hauteur/2);
        this.gauche.setY(this.hauteur/2-50);
        this.droit.setY(this.hauteur/2-50);
        this.droitOmbre.setY(this.hauteur/2-75);
        this.gaucheOmbre.setY(this.hauteur/2-75);

        let pourcent = Phaser.Math.Between(0, 100)

        if (pourcent >= 50){
            this.balle.setVelocityX(200);
        }
        if (pourcent < 50){
            this.balle.setVelocityX(-200);
        }

        this.balle.setVelocityY(0);

        for(let i=0;i<me.obstacles.length;i++){
            me.obstacles[i].setVisible(true);
            me.obstacles[i].ombre.setVisible(true);
            me.obstacles[i].body.setEnable(true);
        }

        me.sound.play('startSound');
    }


    /**
     *
     * @param {Joueur} joueur
     */
    win(joueur){
        //alert('Joueur '+joueur.name+' gagne')
        joueur.score ++;
        //alert('Le score est de '+this.joueurGauche.score+' a '+this.joueurDroite.score)
        this.Initiale();
    }




    initKeyboard() {
        let me=this;
        this.input.keyboard.on('keydown', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.gauche.setVelocityY(-400)
                    me.gaucheOmbre.setVelocityY(-400)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.gauche.setVelocityY(400)
                    me.gaucheOmbre.setVelocityY(400)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.droit.setVelocityY(-400)
                    me.droitOmbre.setVelocityY(-400)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.droit.setVelocityY(400)
                    me.droitOmbre.setVelocityY(400)
                    break;


            }

        });
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.gauche.setVelocityY(0)
                    me.gaucheOmbre.setVelocityY(0)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.gauche.setVelocityY(0)
                    me.gaucheOmbre.setVelocityY(0)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.droit.setVelocityY(0)
                    me.droitOmbre.setVelocityY(0)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.droit.setVelocityY(0)
                    me.droitOmbre.setVelocityY(0)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.ENTER:
                    if (me.start == 0){
                        me.start=1
                        me.Play()
                    }

                    break;
            }
        });
    }



    update() {
        if (this.start == 1) {
            if (this.balle.x > this.largeur) {
                this.win(this.joueurGauche);
            }
            if (this.balle.x < 0) {
                this.win(this.joueurDroite);
            }
            if (this.balle.y < 0) {
                this.balle.y = 0
            }
            if (this.balle.y > this.hauteur) {
                this.balle.y = this.hauteur
            }
        }
    }

}
