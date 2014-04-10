var Twit = require('twit');
var rita = require('rita'); 


// In a Station of the Metro
//
// The apparition of these faces in the crowd:
// Petals on a wet, black bough.


// insert your twitter app info here

var T = new Twit({
  consumer_key:         '', 
  consumer_secret:      '',
  access_token:         '',
  access_token_secret:  ''
});
 	
lexicon = new rita.RiLexicon();

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function makeStation() {

var station = lexicon.randomWord('nn',2);
var apparition = lexicon.randomWord('nn',4);
var faces = lexicon.randomWord('nns',2);
var crowd = lexicon.randomWord('nn',1);
var petals = lexicon.randomWord('nns',2);
var wet = lexicon.randomWord('jj',1);
var black = lexicon.randomWord('jj',1);
var boughArray = lexicon.rhymes(crowd);
var bough = boughArray[Math.floor(Math.random() * boughArray.length)];

	while (lexicon.isNoun(bough) == false) {
	bough = boughArray[Math.floor(Math.random() * boughArray.length)];
	}

var first = station.substr(0,1);
var article = "a";
    if (first === 'a' ||
        first === 'e' ||
        first === 'i' ||
        first === 'o' ||
        first === 'u') {
      article = "an";
    }
	
var first2 = wet.substr(0,1);
var article2 = "a";
    if (first2 === 'a' ||
        first2 === 'e' ||
        first2 === 'i' ||
        first2 === 'o' ||
        first2 === 'u') {
      article2 = "an";
    }	

switch (Math.floor(Math.random() * 3)) {

case 0: // the poem was originally printed with a colon

stanzaOne = "In " + article + " " + station + " of the Metro\u000A\u000A"
stanzaTwo = "The " + apparition + " of these " + faces + " in the " + crowd + ":\u000A";
stanzaThree = petals.capitalize() + " on " + article2 + " " + wet + ", " + black + " " + bough + ".";
poem = stanzaOne.toUpperCase()+stanzaTwo+stanzaThree;

break;

case 1: // but it is often misprinted with a semi-colon

stanzaOne = "In " + article + " " + station + " of the Metro\u000A\u000A"
stanzaTwo = "The " + apparition + " of these " + faces + " in the " + crowd + ";\u000A";
stanzaThree = petals.capitalize() + " on " + article2 + " " + wet + ", " + black + " " + bough + ".";
poem = stanzaOne.toUpperCase()+stanzaTwo+stanzaThree;

break;

case 2: // and the original version had funky performative spacing, like this

stanzaOne = "In " + article + " " + station + " of the Metro\u000A\u000A"
stanzaTwo = "The " + apparition + "\u0020\u0020\u0020\u0020of these " + faces + "\u0020\u0020\u0020\u0020in the " + crowd + "\u0020:\u000A";
stanzaThree = petals.capitalize() + "\u0020\u0020\u0020\u0020on " + article2 + " " + wet + ", " + black + "\u0020\u0020\u0020\u0020" + bough + "\u0020.";
poem = stanzaOne.toUpperCase()+stanzaTwo+stanzaThree;

break;

}

console.log(poem);

// Toggle Twitter  by un/commenting next four lines
       T.post('statuses/update', { status: poem}, function(err, reply) {
       console.log("error: " + err);
         console.log("reply: " + reply);
       });
}


makeStation();

// Tweet every 197 minutes
setInterval(function () {
  try {
    makeStation();
  }
  catch (e) {
    console.log(e);
  }
}, 1000 * 60 * 197);
