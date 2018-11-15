$( document ).ready(function() {

   
     var victoire = false;
     var defaite = false;
     var deplacement = 0;

     function init(){
        var nbCol = prompt("Veuillez entrer la dimension de la grille : ")
        
        // On remove la page de presentation
        $(".board").empty();


        // Il y a ici une condition qui verifie si
        // la dimension est inferieure a 3 ou superieure a 12.
        // En deca de 4, il est impossible de gagner la partie et superieur a 12
        // le jeu devient trop facile. 
        // PS: il est toutefois possible d'enlever cette condition et le jeu fonctionne parfaitement en NxN
        while(nbCol < 4 || nbCol > 12){
            alert("Le jeu doit avoir de 4 a 12 colones");
            nbCol = prompt("Veuillez entrer la dimension de la grille : ")
        }

        $('body').attr("id", nbCol); // Je met nbCol comme un attribut du body afin
                                     // d'avoir la dimension de la grille accessible
                                     // partout dans le programme.

        create_grid();
        changerMessage("À vous de jouer !");
        var first = addCase(2);
        var second = addCase(2);

        while (second == first ){
        	var second = addCase(2);
        }
    }

     // Commandes du clavier
     $( document ).keydown(function(event){
        switch (event.which) {
            case 39: moveRight();
            	break;
            
            case 68: $("#direction").html("right");
            case 68: moveRight();
            	break;
            
            case 40: $("#direction").html("down");
            case 40: moveDown();
             	break;
            
            case 83: $("#direction").html("down");
            case 83: moveDown();
             	break;
            
            case 37: $("#direction").html("left");
            case 37: moveLeft();
             	break;
            
            case 65: $("#direction").html("left");
            case 65: moveLeft();
             	break;
            
            case 38: $("#direction").html("up");
            case 38: moveUp();
             	break;
            
            case 87: $("#direction").html("up");
            case 87: moveUp();
             	break;
        }
    })

    

     function changerMessage(message){
     	messageAAfficher = "<h1>" + message + "</h1>";
     	$(".tableauAffichage").html(messageAAfficher);
     }


     function create_grid(){
       
       	var nbCol = $("body").attr("id");

        for(var i =0; i<nbCol; i++){
        	$(".board").append("<div id=\"r" + i + "\"></div>");
        	$(".board div").addClass("rangee");
        	//$(".board div").attr('id', "r"+i);
        }

        for(var j=0 ; j<nbCol; j++){
        		$(".rangee").append("<div id=\"c" + j + "\"></div>");
        		$(".rangee div").addClass("cellule");
        		//$(".board div").attr('id', "c"+j);

        }
     }

    function addCase(caseAjoutee){
    	
    	var nbCol = $("body").attr("id");

    	i = Math.floor(Math.random()*nbCol);
    	j = Math.floor(Math.random()*nbCol);

    	var idRangee = "r"+ i.toString();
    	var idColone = "c" + j.toString();
        var contenuCase = getBloc(i,j);

        while(contenuCase!=""){
            i = Math.floor(Math.random()*nbCol);
            j = Math.floor(Math.random()*nbCol);
            contenuCase = getBloc(i,j);
        }
        setBloc(i,j, caseAjoutee);
    	return i+","+j;
    }


    // Retourne la valeur d'une case
    // Retourne "" si la case est vide
    function getBloc(r,c){
    	var nbCol = $("body").attr("id");
    	var i = $('#r'+r).find('#c'+c).html();
    	return i;
    }

	 function setBloc(r,c, bloc){
    	var nbCol = $("body").attr("id");
    	var i = $('#r'+r).find('#c'+c).html(bloc);
    	var j = $('#r'+r).find('#c'+c).removeClass().addClass("bloc"+bloc);
    }

    function removeBloc(r,c){
		var nbCol = $("body").attr("id");
    	var i = $('#r'+r).find('#c'+c).html("");
    	var j = $('#r'+r).find('#c'+c).removeClass().addClass("cellule");
	}

    function chooseTwoOrFour(){
        var i = Math.floor(Math.random()*2); // Retourne toujours un chiffre entre 0 et 1
        if (i==0){
            return 2;
        }
        else{
            return 4;
        }
    }

    // Fonction qui met defaite = true si la grille est pleine
    function verifierVictoire(){
        var nbCol = $("body").attr("id");

        defaite = true;
        for (var i=0; i<nbCol; i++){
            for (var j=0; j<nbCol; j++){
                if(getBloc(i,j)==""){
                    defaite = false;
                    return
                }
            }
        }

        changerMessage("Vous avez perdu :(")
    }


    function moveRight() {

        if (!victoire && !defaite){

         	var nbCol = $("body").attr("id");

         	for (var i=0; i<nbCol; i++){
         		for (var j=nbCol-1; j>=0; j--){
         			if(getBloc(i,j)!=""){
         				
                        while(getBloc(i,j+1)==""){
                            setBloc(i,j+1, getBloc(i,j));
                            removeBloc(i,j);
                            j=j+1;
                        }

                        if(getBloc(i,j)==getBloc(i,j+1)){
                            setBloc(i,j+1, getBloc(i,j)*2);
                            removeBloc(i,j);
                        }

                        
                        
                    }
                    if(getBloc(i,j)=="2048"){
                           changerMessage("Vous avez gagnez !");
                            victoire = true;
                            return;
                    }
         		}
         	}
            changerMessage(++deplacement);
            addCase(chooseTwoOrFour());
            verifierVictoire();
        }
    }	

 	function moveLeft() {

        if (!victoire && !defaite){

         	var nbCol = $("body").attr("id");

         	for (var i=0; i<nbCol; i++){
         		for (var j=0; j<nbCol; j++){
         			if(getBloc(i,j)!=""){
         				
                         while(getBloc(i,j-1)==""){
                            setBloc(i,j-1, getBloc(i,j));
                            removeBloc(i,j);
                            j=j-1;
                        }

                        if(getBloc(i,j)==getBloc(i,j-1)){
                            setBloc(i,j-1, getBloc(i,j)*2);
                            removeBloc(i,j);
                        }
                        
         			}
                    if(getBloc(i,j)=="2048"){
                        changerMessage("Vous avez gagnez !");
                        victoire = true;
                        return;
                    }
         		}
         	}
            changerMessage(++deplacement);
            addCase(chooseTwoOrFour());
            verifierVictoire();
        }
 	}	


 	function moveUp() {

        if (!victoire && !defaite){

     	  var nbCol = $("body").attr("id");

         	for (var i=0; i<nbCol; i++){
         		for (var j=0; j<nbCol; j++){
         			if(getBloc(i,j)!=""){
         				
                        while(getBloc(i-1,j)==""){
                            setBloc(i-1,j, getBloc(i,j));
                            removeBloc(i,j);
                            i=i-1;
                        }

                        if(getBloc(i,j)==getBloc(i-1,j)){
                            setBloc(i-1,j, getBloc(i,j)*2);
                            removeBloc(i,j);
                        }
                        
         			}
                    if(getBloc(i,j)=="2048"){
                        changerMessage("Vous avez gagnez !");
                        victoire = true;
                        return;
                    }
         		}
         	}
            changerMessage(++deplacement);
            addCase(chooseTwoOrFour());
            verifierVictoire();
        }
 	}


 	function moveDown() {

        if (!victoire && !defaite){
         	var nbCol = $("body").attr("id");

         	for (var i=nbCol-1; i>=0; i--){
         		for (var j=0; j<nbCol; j++){
         			if(getBloc(i,j)!=""){
         				
                        while(getBloc(i+1,j)==""){
                            setBloc(i+1,j, getBloc(i,j));
                            removeBloc(i,j);
                            i=i+1;
                        }

                        if(getBloc(i,j)==getBloc(i+1,j)){
                            setBloc(i+1,j, getBloc(i,j)*2);
                            removeBloc(i,j);
                        }
                        
         			}
                    if(getBloc(i,j)=="2048"){
                        changerMessage("Vous avez gagnez !");
                        victoire = true;
                        return;
                    }
         		}
         	}
            changerMessage(++deplacement);
            addCase(chooseTwoOrFour());
            verifierVictoire();
        }
 	}


        // On call la fonction init
    setTimeout( function (){
        init();        }, 1000);

});