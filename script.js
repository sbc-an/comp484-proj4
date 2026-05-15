const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
let originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

const strings = ["The text to test.", "second test string", "randomized text", "1234567890", "the last one"];

let timerRunning = false;
let time = 0; // centiseconds
let timerInterval;

// do every 10 miliseconds
function advanceTime()
{
    time ++;
    theTimer.innerHTML = ""+Math.trunc(time/100000)+Math.trunc(time/10000%10)+":"+Math.trunc(time/1000%10)+Math.trunc(time/100%10)+"."+Math.trunc(time/10%10)+time%10;
}

// check string match
function textCompare()
{
    console.log(testArea.value);
    console.log(originText);
    if (testArea.value == originText)
    {
        clearInterval(timerInterval);
        testWrapper.style.borderColor = "green";
    }
    else if (testArea.value == originText.substring(0, testArea.value.length))
    {
        testWrapper.style.borderColor = "blue";
    }
    else
    {
        testWrapper.style.borderColor = "orange";
    }
}

// say no to busy waiting
function keyDown()
{
    if (!timerRunning)
    {
        timerRunning = true;
        timerInterval = setInterval(advanceTime, 10);
    }
    setTimeout(textCompare, 1);
}

// reset
function resetTest()
{
    timerRunning = false;
    time = 0;
    theTimer.innerHTML = "00:00.00";
    clearInterval(timerInterval);
    testArea.value = "";
    testWrapper.style.borderColor = "";
    document.querySelector("#origin-text p").innerHTML = strings[Math.trunc(Math.random() * 5)];
    originText = document.querySelector("#origin-text p").innerHTML;
}