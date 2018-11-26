// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
const WELCOME_INTENT = 'Default Welcome Intent'
const FALLBACK_INTENT = 'Default Fallback Intent'
const GET_BUILD = 'getBuild'
const GET_HERO_TYPE = 'getHeroType'
const GET_HERO_AGILITY = 'getHeroAgility'


const TIME = 'time'
const HERO_TYPE = 'heroType'
const HERO_AGILITY = 'agilityHero'

var hero

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
 function welcome(agent) {
     var possibleResponse = [
         'Davaii!! Welcome to Dotes!! What type of hero do you want? (Strength, Agility, intelligence)',
         'Hero suggestions? What type of hero do you want? (Strength, Agility, intelligence)',
         'There are three main types of heroes, Strength, Agility, and Intelligence. Pick one.'
         ];
         
     var pick = Math.floor( Math.random() * possibleResponse.length )
     var response = possibleResponse[pick]


     agent.add( response )
 }
 
 function fallback(agent) {
     var possibleResponse = [
         `I didn\'t get that. Can you say it again?`,
         'I missed what you said. What was that?',
         'Sorry, could you say that again?',
         'Can you say that again?',
         'Sorry, what was that?',
         'One more time?',
         'What was that?',
         'Say that one more time?',
         'I didn\'t get that. Can you repeat?',
         'I missed that, say that again?'
         ]
         
     var pick = Math.floor( Math.random() * possibleResponse.length )
     var response = possibleResponse[pick]
     agent.add( response )
 }
 
 function getHeroType(agent){


    let query = agent.query
    query = query.toLowerCase()

     let params = agent.parameters['heroType']
     params = params.toLowerCase()

    if(params == 'strength' || params == 'str'){
        
        agent.add("So you want a Strength hero, huh? They have a lot of HP!! Which of the few heroes would you like to start with? Pudge? Axe? Sven? Slardar? Timbersaw?")
        agent.setContext({
              name: 'hero-followup',
              lifespan: 1,
              parameters:{Hero: "strength"}
            });

    } else if(params == 'agility' || params == 'agi'){
        
        agent.add("So you want an Agility hero, huh? Most of them are skilled in one-on-one combat!  Which of the few heroes would you like to start with? Ursa? Spectre? Terrorblade? Riki? Juggernaut?")
        agent.setContext({
              name: 'hero-followup',
              lifespan: 1,
              parameters:{Hero: "agility"}
            });
    } else if(params == 'intelligence' || params == 'int'){
        
        agent.add("So you want an Intelligence hero, huh? They usually depend on their skills/abilities! Which of the few heroes would you like to start with? Puck? Invoker? Lina? Silencer? Windranger?")
        agent.setContext({
              name: 'hero-followup',
              lifespan: 1,
              parameters:{Hero: "intelligence"}
            });
    } 
    else{

       
             var possibleResponse = [
                 'Sorry?',
                 'Pardon?'
                 ]
         
         
         var pick = Math.floor( Math.random() * possibleResponse.length )
         var response = possibleResponse[pick]
         agent.add( response )             
    }
}

function getHeroAgility(agent){

    let query = agent.query;
     query = query.toLowerCase()

    let context = agent.getContext('hero-followup')
    hero = context.parameters.Hero.toLowerCase()



        if(hero == "strength"){

            if(query.includes("pudge")){

                agent.add("So you want Pudge, huh \? \n Well, I do have some knowledge about Pudge's build. Which part of the game would you like to know its build? Early, middle, or late game?")
                agent.setContext({
                  name: 'selected',
                  lifespan: 1,
                  parameters:{Hero: "pudge"}
                });

            } else if(query.includes("axe")){
                
                agent.add("So you want Axe, huh \? \n Well, I do have some knowledge about Axe's build. Which part of the game would you like to know its build? Early, middle, or late game?")
                agent.setContext({
                  name: 'selected',
                  lifespan: 1,
                  parameters:{Hero: "axe"}
                });

            } else if(query.includes("slardar")){
                
                agent.add("So you want Slardar, huh \? \n Well, I do have some knowledge about Slardar's build. Which part of the game would you like to know its build? Early, middle, or late game?")
                agent.setContext({
                  name: 'selected',
                  lifespan: 1,
                  parameters:{Hero: "slardar"}
                });

            } else if(query.includes("sven")){

                agent.add("So you want Sven, huh \? \n Well, I do have some knowledge about Sven's build. Which part of the game would you like to know its build? Early, middle, or late game?")
                agent.setContext({
                  name: 'selected',
                  lifespan: 1,
                  parameters:{Hero: "sven"}
                });

            } else if(query.includes("timbersaw")){

                agent.add("So you want Timbersaw, huh \? \nWell, I do have some knowledge about Timbersaw's build. Which part of the game would you like to know its build? Early, middle, or late game?")
                agent.setContext({
                  name: 'selected',
                  lifespan: 1,
                  parameters:{Hero: "timbersaw"}
                });

            }


    } else if(hero == "agility"){   

        if(query.includes("ursa")){

            agent.add("So you want Ursa, huh \? \n Well, I do have some knowledge about Ursa's build. Which part of the game would you like to know its build? Early, middle, or late game?")
            agent.setContext({
                  name: 'selected',
                  lifespan: 1,
                  parameters:{Hero: "ursa"}
                });

        } else if(query.includes("spectre")){
            
            agent.add("So you want Spectre, huh \? \n Well, I do have some knowledge about Spectre's build. Which part of the game would you like to know its build? Early, middle, or late game?")
            agent.setContext({
                  name: 'selected',
                  lifespan: 1,
                  parameters:{Hero: "spectre"}
                });

        } else if(query.includes("terrorblade")){
            
            agent.add("So you want Terrorblade, huh \? \n Well, I do have some knowledge about Terrorblade's build. Which part of the game would you like to know its build? Early, middle, or late game?")
            agent.setContext({
                  name: 'selected',
                  lifespan: 1,
                  parameters:{Hero: "terrorblade"}
                });

        } else if(query.includes("riki")){

            agent.add("So you want Riki, huh \? \n Well, I do have some knowledge about Riki's build. Which part of the game would you like to know its build? Early, middle, or late game?")
            agent.setContext({
                  name: 'selected',
                  lifespan: 1,
                  parameters:{Hero: "riki"}
                });

        } else if(query.includes("juggernaut")){

            agent.add("So you want Juggernaut, huh \? \nWell, I do have some knowledge about Juggernaut's build. Which part of the game would you like to know its build? Early, middle, or late game?")
            agent.setContext({
                  name: 'selected',
                  lifespan: 1,
                  parameters:{Hero: "juggernaut"}
                });

        }

    } else if (hero == "intelligence") {

        if(query.includes("puck")){

            agent.add("So you want Puck, huh \? \n Well, I do have some knowledge about Puck's build. Which part of the game would you like to know its build? Early, middle, or late game?")
            agent.setContext({
                  name: 'selected',
                  lifespan: 1,
                  parameters:{Hero: "puck"}
                });

        } else if(query.includes("invoker")){
            
            agent.add("So you want Invoker, huh \? \n Well, I do have some knowledge about Invoker's build. Which part of the game would you like to know its build? Early, middle, or late game?")
            agent.setContext({
                  name: 'selected',
                  lifespan: 1,
                  parameters:{Hero: "invoker"}
                });

        } else if(query.includes("lina")){
            
            agent.add("So you want Lina, huh \? \n Well, I do have some knowledge about Lina's build. Which part of the game would you like to know its build? Early, middle, or late game?")
            agent.setContext({
                  name: 'selected',
                  lifespan: 1,
                  parameters:{Hero: "lina"}
                });

        } else if(query.includes("silencer")){

            agent.add("So you want Silencer, huh \? \n Well, I do have some knowledge about Silencer's build. Which part of the game would you like to know its build? Early, middle, or late game?")
            agent.setContext({
                  name: 'selected',
                  lifespan: 1,
                  parameters:{Hero: "silencer"}
                });

        } else if(query.includes("windranger")){

            agent.add("So you want Windranger, huh \? \nWell, I do have some knowledge about Windranger's build. Which part of the game would you like to know its build? Early, middle, or late game?")
            agent.setContext({
                  name: 'selected',
                  lifespan: 1,
                  parameters:{Hero: "windranger"}
                });

        }
    }   
    else{
             var possibleResponse = [
                 'Excuse me?',
                'Again?'
                 ]
         
         
         var pick = Math.floor( Math.random() * possibleResponse.length )
         var response = possibleResponse[pick]
         agent.add( response )             
    }
}  

function getBuild(agent){
     let query = agent.query
     query = query.toLowerCase()

    let context = agent.getContext('selected')
    hero = context.parameters.Hero.toLowerCase()

 
    if(hero == "pudge" && (query.includes("early game") || query.includes("early"))){
            
            agent.add("For Pudge, you can buy 1 set of Tangoes, two Enchanted Mangoes, and a Wind Lace at the start. Later on, buy an Urn of Shadows to help in ganking enemies.")

    } else if(hero == "pudge" && (query.includes("middle game") || query.includes("middle"))){
            
            agent.add("In the middle game, buying Force Staff or a Blink Dagger will help you in initiating fights. Blademail or Pipe of Insight is a good defensive item, too.")

    } else if(hero == "pudge" &&( query.includes("late game") || query.includes("late"))){
            
            agent.add("Late game Pudge with high HP from its stats and items like Crimson Guard or Heart of Tarrasque can help the team win the game.")
    
    } else if(hero == "axe" && (query.includes("early game") || query.includes("early"))){

            agent.add("For Axe, you can buy 2 sets of Tangoes, Stout Shield, and an Enchanted Mango at the start. Tranquil Boots will help speed up your movement speed and HP regeneration.")
    
    } else if(hero == "axe" && (query.includes("middle game") || query.includes("middle"))){
            
            agent.add("Blink Dagger or Blademail is a must for Axe in the middle game. Other defensive items like Pipe of Insight would help your team especially when the enemy team deals a lot of magic damage.")

    } else if(hero == "axe" && (query.includes("late game") || query.includes("late"))){
            
            agent.add("Since Axe is the initiator of the team, buying items that will improve its durabilty is a good idea. These items are Heart of Tarrasque, Lotus Orb, and even Radiance.")
            
    } else if(hero == "slardar" && (query.includes("early game") || query.includes("early"))){
            
            agent.add("For Slardar, you can buy 2 sets of Tangoes, Stout Shield, and Healing Salve at the start. Magic Stick is also a good item for this hero.")

    } else if(hero == "slardar" &&( query.includes("middle game") || query.includes("middle"))){
            
           agent.add("Slardar should already have Blink Dagger or Force Staff in the middle game since he has a stun to initiate. Also, Medallion of Courage will shred the enemies with the help of Slardar's ultimate ability.")

    } else if(hero == "slardar" && (query.includes("late game") || query.includes("late"))){
            
            agent.add("Assault Cuirass can help not just Slardar but also his teammates in teamfights. Heaven's Halberd is also a good idea to disable the carry of the enemy team.")
            
    } else if(hero == "sven" && (query.includes("early game") || query.includes("early"))){
            
            agent.add("In early game of Sven, you can buy 1 set of Tangoes, Stout Shield, and Quelling Blade to help you farm creeps. Mask of Madness and Echo Sabre will help Sven with his attack speed and kill opponents easily.")

    } else if(hero == "sven" && (query.includes("middle game") || query.includes("middle"))){
            
            agent.add("Heroes with stuns like Sven should be paired with Blink Dagger. Black King Bar would also make Sven unstoppable in teamfights.")

    } else if(hero == "sven" && (query.includes("late game") || query.includes("late"))){
            
             agent.add("With Sven's high damage, items that gives attack speed like Assault Cuirass, Monkey King Bar, etc. would be helpful to this hero. Daedalus is also a good option which can kill enemies in two hits.")
            
    } else if(hero == "timbersaw" &&( query.includes("early game") || query.includes("early"))){
            
             agent.add("Timbersaw's early game items could be 1 set of Tangoes, 2 Enchanted Mangoes, with some Clarity Potions. This will help Timbersaw regenerate his HP and Mana.")

    } else if(hero == "timbersaw" &&( query.includes("middle game") || query.includes("middle"))){
      
            agent.add("With Timbersaw's 3rd skill, he could be used as a tank and buying items like Blademail, Pipe of Insight, Crimson Guard, etc. will help him survive teamfights.")

    } else if(hero == "timbersaw" &&( query.includes("late game") || query.includes("late"))){
    
            agent.add("Late game Timbersaw can also be dangerous because of its skills. Since he uses a lot of skills, mana regeneration items like Bloodstone, Octarine Core, etc. could help him win the clashes and also the game.")
            
    } else if(hero == "ursa" && (query.includes("early game") || query.includes("early"))){
    
            agent.add("For Ursa, you can buy 1 set of Tangoes, Enchanted Mango, and an Orb of Venom at the start. After few minutes, you can buy Phase Boots and Morbid Mask to help you farm your items.")

    } else if(hero == "ursa" && (query.includes("middle game") || query.includes("middle"))){
    
            agent.add("In the middle game, you can upgrade your Morbid Mask to a Mask of Madness or Vladmir's Offering. Buying a Blink Dagger and Black King Bar would help you join fights with your team.")

    } else if(hero == "ursa" && (query.includes("late game") || query.includes("late"))){
            
            agent.add("Late game Ursa is very strong especially when he has a Abyssal Blade, a Monkey King Bar, and a Diffusal Blade. With these items your opponents will shred into pieces.")
    
    } else if(hero == "spectre" && (query.includes("early game") || query.includes("early"))){
            
            agent.add("2 set of Tangoes, Stout Shield, and one Enchanted Mango is an ideal early game items for Spectre. Phase Boots would also help him chase and kill enemies with the help of his teammates.")

    } else if(hero == "spectre" && (query.includes("middle game") || query.includes("middle") )){
            
            agent.add("Rushing Radiance in the middle game will not just help Spectre farm his other items but also it is a good combination wiht his illusions. Items that improve one's Agility like Manta Style will also help him increase his attack speed and damage.")

    } else if(hero == "spectre" && (query.includes("late game") || query.includes("late"))){
            
            agent.add("6-slotted Spectre with Abyssal Blade, Heart of Tarrasque, Diffusal Blade, etc. will make this hero unstoppable in the late game.")
            
    } else if(hero == "terrorblade" && (query.includes("early game") || query.includes("early"))){
            
            agent.add("Early game items for Terrorblade could be 1 set of Tangoes, Stout Shield, Quelling Blade, and two Iron Branches. Farming Yasha will help him improve his stats and also damage.")

    } else if(hero == "terrorblade" && (query.includes("middle game") || query.includes("middle") )){
            
            agent.add("In the middle game, Terrorblade should already have Manta Style, Diffusal Blade, and other Agility Items. This will make him deal more damage to enemies and increase his own attack speed.")

    } else if(hero == "terrorblade" && (query.includes("late game") || query.includes("late") )){
            
            agent.add("Eye of Skadi is very powerful and annoying to the enemies because of its slow and Terrorblade's millions of illusions. This will make him tanky and deal more damage.")
            
    } else if(hero == "riki" &&( query.includes("early game") || query.includes("early") )){
            
            agent.add("1 set of Tangoes, Stout Shield, and an Orb of Venom will help Riki in his early game. Phase Boots partnered with Orb of Venom will contribute to early game kills for the team.")

    } else if(hero == "riki" &&( query.includes("middle game") || query.includes("middle") )){
            
            agent.add("Diffusal Blade-equipped Riki is very dangerous since enemies would get trapped in the Riki's smoke and lose their mana. Skull Basher will also help Riki kill enemies, even without his teammates.")

    } else if(hero == "riki" && (query.includes("late game") || query.includes("late"))){
            
            agent.add("You can buy Riki items like Butterfly which can help improve his damage and attack speed. Mjolnir's is also a good choice for Riki in the late game.")
            
    } else if(hero == "juggernaut" &&( query.includes("early game") || query.includes("early"))){
            
            agent.add("1 set of Tangoes, Stout Shield, Quelling Blade, and two Iron Branches will help Juggernaut in his early game. Perseverance is also a good item for this hero to help restore its HP and mana.")

    } else if(hero == "juggernaut" &&( query.includes("middle game") || query.includes("middle"))){
    
            agent.add("Most players choose Battlefury as one of its major items to help Juggernaut with his farm with a little bit of additional damage. Manta Syle gives Juggernaut a good stats to help him with his damage.")

    } else if(hero == "juggernaut" &&( query.includes("late game") || query.includes("late") )){
            
            agent.add("Late game with Juggernaut with Abyssal Blade, Eye of Skadi, Butterfly, and even Monkey King Bar could kill his enemies in just a few number of attacks and also with his ultimate ability.")
            
    } else if(hero == "puck" && (query.includes("early game") || query.includes("early"))){
            
            agent.add("Null Talisman, an Iron Branch, and a Faerie Fire gives Puck some early stats to help her farm his items. Eul's Scepter of Divinity or a Veil of Discord can help her kill the enemies with increased magic damage.")

    } else if(hero == "puck" &&( query.includes("middle game") || query.includes("middle") )){
            
            agent.add("Puck is a squishy hero that is why defensive items like Linken's Sphere would help him survive ganks. Aeon Disks also adds a few HP and mana for this hero.")

    } else if(hero == "puck" && (query.includes("late game") || query.includes("late"))){
            
            agent.add("Puck's burst damage plus Dagon Level 5 can erase any enemy in her path even in the late game. Refresher's Orb will not just help her with mana regeneration but also to use her skills twice.")
            
    } else if(hero == "invoker" &&( query.includes("early game") || query.includes("early") )){
            
            agent.add("Unlike other mid heroes, Invoker doesn't need a bottle but stat-giving items like Null Talisman or Wraith Band will help him in his laning phase.")

    } else if(hero == "invoker" && (query.includes("middle game") || query.includes("middle") )){
            
            agent.add("Wex-Type Invokers usually buy Urn of Shadows to help with kills. Aghanim's Scepter is a must for this hero since it focuses on its skils more than anything.")

    } else if(hero == "invoker" &&( query.includes("late game") || query.includes("late"))){
            
            agent.add("With Invoker's skills upgraded, items like Scythe of Vyse, Octarine Core, etc. would help him in mana regeneration and locking down his enemies, and even solo killing them.")
            
    } else if(hero == "lina" &&( query.includes("early game") || query.includes("early") )){
            
            agent.add("Lina's early game items can consist of Null Talisman and Arcane Boots. Bottle would also help Lina with her mana problems.")

    } else if(hero == "lina" &&( query.includes("middle game") || query.includes("middle")) ){
            
            agent.add("Eul's Scepter of Divinity is a great item choice for Lina to help her secure enemy kills with her stun. Linken's Sphere is also a good defensive item for her and it helps her with his mana regeneration.")

    } else if(hero == "lina" &&( query.includes("late game") || query.includes("late"))){
            
            agent.add("Late game Lina with her ultimate ability plus Dagon Level 5 and nukes can kill enemy heroes in a blink of an eye. Bloodstone and Scythe of Vyse will also help her with securing kills and mana problmes.")
            
    } else if(hero == "silencer" &&( query.includes("early game") || query.includes("early"))){
            
            agent.add("1 set of Tangoes, one Mantle of Intelligence, and some Clarity Potions will help Silencer harass its enemies with his glaives while maintaining his mana full.")

    } else if(hero == "silencer" &&( query.includes("middle game") || query.includes("middle")) ){
            
            agent.add("Support items like Force Staff or Veil of Discord could help Silencer and his teammates secure middle game kills. Rod of Atos is also a good choice for this hero for additional HP.")

    } else if(hero == "silencer" &&( query.includes("late game") || query.includes("late") )){
            
            agent.add("One late game item for Silencer is Black King Bar which is a defensive item since he will always be the main target in enemy fights. With BKB, it will prevent the enemies from cancelling his deadly ultimmate. Linken's Sphere will do help this hero in the late game, too.")
            
    } else if(hero == "windranger" &&( query.includes("early game") || query.includes("early") )){
            
            agent.add("Null Talismans will help Windranger in farming her items from its stats. Phase boots could also help her chase enemies to kill them.")

    } else if(hero == "windranger" &&( query.includes("middle game") || query.includes("middle")) ){
            
            agent.add("Aghanim's Scepter is a good item for this hero in middle game to kill enemies instantly. Other damage giving items like Daedalus and Force Staff will help this hero secure enemy kills.")

    } else if(hero == "windranger" &&( query.includes("late game") || query.includes("late"))){
            
            agent.add("With Windranger's attack speed, Nullifier helps this hero kill enemies and mute them. Black King Bar paired with her 3rd ability makes her very hard to kill.")
            
    }
    
     
    else{
     var possibleResponse = [
         'What\'s that?',
         'Try again!'
         ]
         
         
     var pick = Math.floor( Math.random() * possibleResponse.length )
     var response = possibleResponse[pick]
     agent.add( response )
     }
        
     
 }

 
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('getBuild', getBuild);
  intentMap.set('getHeroType', getHeroType);
  intentMap.set('getHeroAgility', getHeroAgility);

  agent.handleRequest(intentMap);
});
