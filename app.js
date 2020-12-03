// Initialisation des variables , manip du DOM

const form = document.querySelector(".form-quizz");

let tableauResultats = [];
const reponses = ['c' , 'a' , 'b' , 'a' , 'c' ];
const emojis = ['✔️','✨','👀','😭','👎','💩'];
const titresResultat = document.querySelector('.resultats h2');
const aideResultat = document.querySelector('.aide');
const noteResultat = document.querySelector('.note');
const toutesLesQuestions = document.querySelectorAll('.question-block');
let verifTableau = [];

// LES FONCTIONS

form.addEventListener('submit', (e) => { 
    e.preventDefault();  // Prévient le comportement par défaut de l'événement submit
    // console.log(document.querySelector('input[name="q1"]:cheked').value); 
    for(i = 1; i < 6 ; i ++){
        tableauResultats.push(document.querySelector(`input[name="q${i}"]:checked`).value);
    }
    //console.log(tableauResultats);

    verifFunction(tableauResultats);
    tableauResultats =  []; // On vient réinitialiser le tableau à chaque submit. 
})

function verifFunction(tabResultats){
    for(let a = 0; a < 5; a++){
        if(tabResultats[a] === reponses[a]){
            verifTableau.push(true);
        } else {
            verifTableau.push(false);
        }
    }
    // console.log(verifTableau);
    afficherResultats(verifTableau);
    couleusFonction(verifTableau);
    verifTableau = [];
}

function afficherResultats(tabCheck){
    //tabCheck vas etre un tableau à vérifier 
    const nbDeFautes = tabCheck.filter(el => el !== true).length;
    console.log(nbDeFautes);




    switch(nbDeFautes){
        case 0 :
            titresResultat.innerText = ` ${emojis[0]} Bravo c'est un sans faute !`
            aideResultat.innerText = ''
            noteResultat.innerText = '5/5'
            break;
        case 1 : 
            titresResultat.innerText =  `${emojis[1]} vous y etes presque !`
            aideResultat.innerText = ''
            noteResultat.innerText = '4/5'
            break;
        
        case 2 : 
            titresResultat.innerText = `${emojis[2]} vous y etes presque !`
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouge, puis re validez'
            noteResultat.innerText = '3/5'
            break;

        case 3 : 
            titresResultat.innerText = `${emojis[3]} Il resque quelque érreur !`
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouge, puis re validez'
            noteResultat.innerText = '2/5'
            break;

        case 4 : 
            titresResultat.innerText =  `${emojis[4]} vous y etes presque !`
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouge, puis re validez'
            noteResultat.innerText = '1/5'
            break;

        case 5 : 
            titresResultat.innerText = `${emojis[5]}Gros noob !`
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouge, puis re validez'
            noteResultat.innerText = '0/5'
            break;

        default : 
            "oops"
            break;
    }
    
}

function couleusFonction(tabValBool){
    for(let j = 0; j < tabValBool.length; j++){

        if(tabValBool[j] === true){
            toutesLesQuestions[j].style.background = '#568203';
        } else {
           toutesLesQuestions[j].style.background = 'red';
           toutesLesQuestions[j].classList.add('echec');

           // on veut que l'animation revienne si la personne se trompe à nouveau . Pour ca on vas retirer l'animation au bout d'un certain temps , 
           //ainsi à la prochaine erreur class echec viendra s'ajouter
           
           setTimeout(() => {
               toutesLesQuestions[j].classList.remove('echec');

           }, 500)
            
        }
    }
} 

toutesLesQuestions.forEach(item => {
    item.addEventListener('click' , () => {
        item.style.background ="White";
    });
})