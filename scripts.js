

$(document).ready(function() {
    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];

    let body = $('body');
    let text = [];//the text we are working with
    let type_spot = 0;//where the user is at with typing
    let mover = 17.45;

    let current_sentence = 0;//starts at zero

    let time = new Date().getTime()/1000;

    let totalMistakes = 0

    let restart = false;

   // text = (sentences[0].split(""));
    resetSentence(0);
    //console.log(text[0]);

    function showUpper() {
        $('div.hiddenUp').toggle();
        $('div.hiddenDown').toggle();
    }
    //new function
    /*
    - one parameter indicating the sentence number we are on
    - Reset vars to zero for type_spot.
    - import the sentence into text
    */
    //
    function calcScore() {
        let time2 = new Date().getTime()/1000;

        let wordCount = 0;
        let actualTime = time2 - time;
        

        for (i = 0; i < sentences.length; i++) {
            wordCount += sentences[i].split(" ").length;
        }
        //console.log("word count: " + wordCount + " actualTime: " + actualTime + " totalMistakes: " + totalMistakes );
        $('div#feedback').text(wordCount / (60 / actualTime) - (2 * totalMistakes));
        window.setTimeout(playAgain, 5000);

    };

    function playAgain() {
        $('div#feedback').text('play again? Press y');
        restart = true;
        time = new Date().getTime()/1000;
    }

    function resetSentence(index) {
        //console.log("index: "+ index + " sentences.length: " + sentences.length );
        if (index < sentences.length) {
            text = (sentences[index].split(''));
            type_spot = 0;
            mover = 17.45;
            $('div#sentence').text(sentences[index]);
            $('div#yellow-block').css('left', '');

            $('div#target-letter').text(text[0]);
            $('div#feedback').text('')
        } else {
            calcScore();
        }
    }


    //$('div#sentence').append(sentences[0]);
    
    $(document).keydown(function(event) {
        if(event.which === 16) {
            showUpper();
        }
    })

    $(document).keyup(function(event) {
        if(event.which === 16) {
            showUpper();
        }

        $(`.well`).css('background-color', '');
    })

    $(document).keypress(function(event) {
        $(`.well#${event.which}`).css('background-color', 'lightgreen');

        //console.log((String.fromCharCode(event.which)));
        //console.log("event.which: " +event.which + " text[0]:" + text[0]);
        let keyPressed = (event.which);//the ascii code
        let letterCode = 't';//the letter - it was text[0], I changed it.

        if(text[type_spot] === String.fromCharCode(keyPressed)){
            $('div#feedback').append('<font color="green">\u2714</font>')
            //console.log("matched: " + String.fromCharCode(keyPressed) + " vs " + text[type_spot]  );
            type_spot++;
            //console.log(" will add to mover: " + mover );
            $("div#yellow-block").css('left', `${mover}px`)
            mover += 17.45

            $('div#target-letter').text(text[type_spot]);

            if (type_spot === text.length) {
                current_sentence++;
                resetSentence(current_sentence);
            }
        } else {
            $('div#feedback').append('<font color="red">\u2718</font>');
            totalMistakes++;
        }

        if (restart && String.fromCharCode(keyPressed) === 'y') {
            resetSentence(0);
        }

    })

});
