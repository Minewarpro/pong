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
    }


    create(){

        /**
         * this.particles = this.add.particles('cercle');


        this.emitter = this.particles.createEmitter({
            speed: 50,
            scale: { start: 0.1, end: 0 },
            blendMode: 'ADD'
        });

        this.emitter.startFollow(this.balle);
         */

        this.hauteur = 500
        this.largeur = 1000

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


        this.gaucheOmbre = this.physics.add.sprite(-5, this.hauteur/2-75, 'carreOmbre').setOrigin(0,0);
        this.gaucheOmbre.setDisplaySize(50,150);
        this.gaucheOmbre.body.setAllowGravity(false);
        this.gaucheOmbre.setImmovable(true);

        this.gauche = this.physics.add.sprite(10, this.hauteur/2-50, 'carre').setOrigin(0,0);
        this.gauche.setDisplaySize(20,100);
        this.gauche.body.setAllowGravity(false);
        this.gauche.setImmovable(true);

        this.droitOmbre = this.physics.add.sprite(this.largeur-45, this.hauteur/2-75, 'carreOmbre').setOrigin(0,0);
        this.droitOmbre.setDisplaySize(50,150);
        this.droitOmbre.body.setAllowGravity(false);
        this.droitOmbre.setImmovable(true);

        this.droit=this.physics.add.sprite(this.largeur-30,this.hauteur/2-50, 'carre').setOrigin(0,0);
        this.droit.setDisplaySize(20,100);
        this.droit.body.setAllowGravity(false);
        this.droit.setImmovable(true);

        this.balle = this.physics.add.sprite(this.largeur/2, this.hauteur/2, 'cercle');
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.5,1.5);
        this.balle.body.setMaxVelocityX(500,500)
        this.balle.body.setMaxVelocityY(100,100)

        this.Initiale();

        let me = this;
        this.physics.add.collider(this.balle, this.droit, function () {
            console.log("touche droit");
            me.rebond(me.droit);
        });
        this.physics.add.collider(this.balle, this.gauche,  function () {
            console.log("touche gauche");
            me.rebond(me.gauche);
        });

        this.physics.add.collider(this.balle, this.haut);
        this.physics.add.collider(this.balle, this.bas);


        this.initKeyboard();

        this.joueurGauche = new Joueur('J1','joueurGauche')
        this.joueurDroite = new Joueur('J2','joueurDroite')
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
    Initiale (){
        this.balle.setX(this.largeur/2);
        this.balle.setY(this.hauteur/2);

        let pourcent = Phaser.Math.Between(0, 100)

        if (pourcent >= 50){
            this.balle.setVelocityX(200);
        }
        if (pourcent < 50){
            this.balle.setVelocityX(-200);
        }

        this.balle.setVelocityY(0);

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
                    me.gauche.setVelocityY(-200)
                    me.gaucheOmbre.setVelocityY(-200)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.gauche.setVelocityY(200)
                    me.gaucheOmbre.setVelocityY(200)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.droit.setVelocityY(-200)
                    me.droitOmbre.setVelocityY(-200)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.droit.setVelocityY(200)
                    me.droitOmbre.setVelocityY(200)
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
            }
        });
    }

    update(){
        if(this.balle.x > this.largeur){
            this.win(this.joueurGauche);
        }
        if(this.balle.x < 0){
            this.win(this.joueurDroite);
        }
        if(this.balle.y < 0){
            this.balle.y = 0
        }
        if(this.balle.y > this.hauteur){
            this.balle.y = this.hauteur
        }

    }


}
