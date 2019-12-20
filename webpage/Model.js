import getMushrooms from './data.js'

var dontChange = ["lila", "rosa"],
    myOffenses = getMushrooms().Schimpfwörter,
    myAdjectives = getMushrooms().Adjektive,
    myMushrooms = getMushrooms().Pilze;

function adaptToGenus(word, genus){
    if(dontChange.includes(word)){
        return
    }
    
    word = word.toLowerCase();

    switch (genus) {
        case 1:
            return word+"er";
        case 0:
            return word+"e";
        case 2:
            return word+"es";
        default:
            return "irgendwas";
    }
}

export default function createOffense(intensity) {
    let random = Math.floor(Math.random() * 265),
        random2 = Math.floor(Math.random()*26),
        randomShroom = myMushrooms[random],
        genus = randomShroom.Genus,
        offense = "Du ",
        bavarianAddition = adaptToGenus(myOffenses[random2], genus);   

    if(randomShroom.Adjektiv){
        offense += randomShroom.Adjektiv+" ";        
    } else {
        if(intensity != "low"){
            let random = Math.floor(Math.random() * 99),
            randomAdjectiv = myAdjectives[random];
            offense += adaptToGenus(randomAdjectiv, genus)+" "
        }
    }

    offense += randomShroom.Name;
    
    if(intensity != "hard"){
        offense += "!";
    } else {
        offense += ", du "+bavarianAddition+"!";
    }

    return offense;
};