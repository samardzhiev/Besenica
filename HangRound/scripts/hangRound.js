/// <reference path="jquery-2.1.1.min.js" />


window.onload = function startGame() {
    var words = [{
        description: 'The capital of United Kingdom',
        answer: 'LONDON'
    }, {
        description: 'Mail client',
        answer: 'MICROSOFT OUTLOOK'
    }, {
        description: 'Web browser',
        answer: 'GOOGLE CHROME'
    }, {
        description: 'Quantity method for chemical analysis',
        answer: 'TITRIMETRY'
    }];

    $('svg').children().css({
        display: 'none'
    });

    var randomWordIndex = Math.floor(Math.random() * words.length);
    var chosenWord = words[randomWordIndex]

    var wordBox = $('<div id="wordBox">')
    .css({
        margin: '10px 10px 10px 10px',
        border: '1px solid black',
        width: '400px',
        height: '35px',
        position: 'absolute',
        top: '100px',
        left: '220px',
        'font-size': '30px',
        'text-align': 'center'
    });

    var descriptionBox = $('<div id="descriptionBox">')
    .css({
        margin: '10px 10px 10px 10px',
        border: '1px solid black',
        'width': '400px',
        height: '200px',
        position: 'absolute',
        top: '10px',
        left: '220px',
        'font-size': '20px',
        'text-align': 'center',
        background: '#ccc'
    });

    var typeBox = $('<input id="typeBox">')
    .css({
        margin: '10px 10px 10px 10px',
        border: '1px solid black',
        'width': '400px',
        height: '40px',
        position: 'absolute',
        top: '200px',
        left: '220px',
        'font-size': '20px'
    });
    var incorrectWords = $('<input id="incorrectWords">')
    .css({
        margin: '10px 10px 10px 10px',
        border: '1px solid black',
        'width': '400px',
        height: '40px',
        position: 'absolute',
        top: '250px',
        left: '220px',
        'font-size': '20px',
        background: 'darkred',
        color: '#ccc'
    });

    var incorrectWordsArray = [];
    var correctWordsArray = [];
    var replacedAnswer = chosenWord.answer.replace(/[a-z]/gi, '*');
    wordBox.html(wordBox.html() + replacedAnswer);
    descriptionBox.html(descriptionBox.html() + chosenWord.description);

    $('body').append(descriptionBox);
    $('body').append(wordBox);
    $('body').append(typeBox);
    $('body').append(incorrectWords);

    var incorrectWordsCounter = 0;

    $('#typeBox').on('keyup', function () {
        if (!isExistingCharacter($(this))) {
            if (chosenWord.answer.indexOf($(this).val().toUpperCase()) == -1) {
                incorrectWordsArray.push($(this).val().toUpperCase());
                incorrectWordsCounter += 1;
                switch (incorrectWordsCounter) {
                    case 1:
                        $('#beam').css({ display: '' });
                        break;
                    case 2:
                        $('#roof').css({ display: '' });
                        break;
                    case 3:
                        $('#rope').css({ display: '' });
                        break;
                    case 4:
                        $('.head').css({ display: '' });
                        break;
                    case 5:
                        $('#body').css({ display: '' });
                        break;
                    case 6:
                        $('#armLeft').css({ display: '' });
                        break;
                    case 7:
                        $('#armRight').css({ display: '' });
                        break;
                    case 8:
                        $('#legLeft').css({ display: '' });
                        break;
                    case 9:
                        $('#legRight').css({ display: '' });
                        $('svg').css({ 'background': 'black' });
                        $('svg').attr({ 'stroke': 'white' });
                        if (confirm('You died. The answer was ' + chosenWord.answer + ' . Play another game?')) {
                            cleanData();
                            startGame();
                            return;
                        }

                        else {
                            $('body').html('<h1>Goodbye!</h1>');
                        }

                }

            }

            else {
                correctWordsArray.push($(this).val().toUpperCase());                
            }

            $('#incorrectWords').val(incorrectWordsArray.join());
            var pattern = '[^\\s';
            for (var i = 0; i < correctWordsArray.length; i++) {
                pattern += correctWordsArray[i];
            }

            pattern += ']';
            replacedAnswer = chosenWord.answer.replace(RegExp(pattern, 'gi'), '*');
            $(wordBox).html(replacedAnswer);
            if (replacedAnswer.indexOf('*') == -1) {
                if (confirm('Correct! Play another game?')) {
                    cleanData();
                    startGame();
                    return;
                }

                else {
                    $('body').html('<h1>Goodbye!</h1>');
                }
            }
        }

        $('#typeBox').val('');
    });

    $('#typeBox').focus();

    function isExistingCharacter($this) {
        for (var i = 0; i < incorrectWordsArray.length; i++) {
            if (incorrectWordsArray[i] === $this.val().toUpperCase()) {
                return true;
            }
        }

        return false;
    }
}

function cleanData() {
    $('#descriptionBox').remove();
    $('#wordBox').remove();
    $('#typeBox').remove();
    $('#incorrectWords').remove();
    incorrectWords = '';
    incorrectWordsArray = '';
    $('svg').css({ 'background': 'white' });
    $('svg').attr({ 'stroke': 'black' });
}

    
