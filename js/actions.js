var images = [
    "img/Ghost-80.png",
    "img/Angry-ghost-80.png",
    "img/Bat-80.png",
    "img/Be-quyt-Lai-Vung-80.png",
    "img/cherrybomb-remix-80.png",
    "img/ChristmasTree-80.png",
    "img/Cute-Halloween-Witch-80.png",
    "img/haunted-house-80.png",
    "img/Ninja-80.png",
    "img/Purple-present-80.png",
    "img/Red-Ribbon-80.png",
    "img/Little-bat-80.png"
];
var backImages = ["img/girls-140.png", "img/girls-113.png", "img/girls-80.png"];
var backImage = "img/girls-140.png";
var cards = [];
var numberOfCards = 10;
var cardClass = "game-card-10";
var firstCard = null;
var lastIndex = -1;
var counter = 0;
var totalSeconds = 0;
var minutesLabel;
var secondsLabel;
var my_int;

class Card {
    constructor(el, img) {
        this.el = el;
        this.isOpen = false;
        this.isLocked = false;
        this.el.addEventListener("click", this, false);
        this.setImage(img);
    }

    handleEvent(e) {
        switch (e.type) {
            case "click":
                if (this.isOpen || this.isLocked) {
                    return;
                }
                this.isOpen = true;
                // this.el.classList.add('rotate');
                this.el.firstChild.src = this.image;
                checkGame(this);
        }
    }

    reset() {
        this.isOpen = false;
        this.isLocked = false;
        this.el.firstChild.src = backImage;
    }

    lock() {
        this.isLocked = true;
        this.isOpen = true;
        this.el.style.visibility = "hidden";
        counter++;
    }

    setImage(img) {
        this.el.classList.remove(this.image);
        this.image = img;
    }
}

function gameDifficulty() {
    var e = document.getElementById("list");
    if (e.selectedIndex >= 0) {
        if (e.selectedIndex != lastIndex) {
            switch (e.options[e.selectedIndex].value) {
                case "1":
                    numberOfCards = 10;
                    cardClass = "game-card-10";
                    backImage = backImages[0];
                    break;
                case "2":
                    numberOfCards = 18;
                    cardClass = "game-card-18";
                    backImage = backImages[1];
                    break;
                case "3":
                    numberOfCards = 24;
                    cardClass = "game-card";
                    backImage = backImages[2];
                    break;
            }

            lastIndex = e.selectedIndex;
        }
        else {
            lastIndex = -1;
        }
    }
}

function drawCards() {
    let idGame = document.getElementById("game");
    let n = idGame.childElementCount;
    for (let i = n - 1; i >= 0; i--) {
        idGame.removeChild(idGame.childNodes[i]);
    }
    counter = 0;
    let randomImages = getRandomImages();
    for (let i = 0; i < numberOfCards; i++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add(cardClass);
        let newImage = document.createElement("img");
        let im = randomImages[i];
        cards.push(new Card(newDiv, im));

        newImage.src = backImage;
        newDiv.appendChild(newImage);
        idGame.appendChild(newDiv);
    }
    stop_timer();
    set_timer();
}

function pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

function setTime(minutesLabel, secondsLabel) {
    totalSeconds++;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function set_timer() {
    minutesLabel = document.getElementById("minutes");
    secondsLabel = document.getElementById("seconds");
    my_int = setInterval(function () {
        setTime(minutesLabel, secondsLabel)
    }, 1000);
}

function stop_timer() {
    totalSeconds = 0;
    clearInterval(my_int);
}

function selectCardBackground() {

}

function startGame() {
    let l = document.getElementById("list");
    l.onclick = gameDifficulty;
    selectCardBackground();
    let b = document.getElementById("btn-game");
    b.onclick = drawCards;
}

function random(n) {
    return Math.floor(Math.random() * n);
}

function getRandomImages() {
    let n = images.length;
    let randomImages = [];
    for (let i = 0; i < numberOfCards / 2; i++) {
        let index = random(n);
        randomImages.push(images[index]);
    }
    return shuffle(randomImages.concat(randomImages.slice()));
}

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function checkGame(gameCard) {
    if (firstCard === null) {
        firstCard = gameCard;
        return;
    }
    if (firstCard.image === gameCard.image) {
        firstCard.lock();
        gameCard.lock();

        if (counter == numberOfCards) {
            clearGame();
        }
    } else {
        var a = firstCard;
        var b = gameCard;
        setTimeout(function () {
            a.reset();
            b.reset();
            firstCard = null;
        }, 250);
    }
    firstCard = null;
}

function clearGame() {
    stop_timer();
    let idGame = document.getElementById("game");
    let n = idGame.childElementCount;
    for (let i = n - 1; i >= 0; i--) {
        idGame.removeChild(idGame.childNodes[i]);
    }
    let newDiv = document.createElement("div");
    newDiv.classList.add("winner");
    newDiv.innerHTML = "Congratulations!! You won!!!";
    idGame.appendChild(newDiv);
}
