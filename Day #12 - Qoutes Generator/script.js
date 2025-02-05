const quoteText = document.querySelector(".quote"),
    quoteBtn = document.querySelector("button"),
    authorName = document.querySelector(".name"),
    speechBtn = document.querySelector(".speech"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".twitter"),
    synth = speechSynthesis;

// Fetch and display a random quote
function randomQuote() {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    fetch("http://api.quotable.io/random").then(response => response.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
    });
}
// Read quote aloud using speech synthesis
speechBtn.addEventListener("click", () => {
    if (!quoteBtn.classList.contains("loading")) {
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(() => {
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});
// Copy quote to clipboard
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteText.innerText);
});
// Share quote on Twitter
twitterBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});
// Generate a new quote on button click
quoteBtn.addEventListener("click", randomQuote);

/// Parallax Mouse Movement Effect
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.wrapper');
    
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        wrapper.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    wrapper.addEventListener('mouseleave', () => {
        wrapper.style.transform = 'rotateX(0) rotateY(0)';
        wrapper.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            wrapper.style.transition = 'transform 0.3s ease';
        }, 500);
    });
});