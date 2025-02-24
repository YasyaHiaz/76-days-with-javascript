let player = { currentScene: 'start', karma: 0, inventory: [], secretsFound: 0 };

const story = {
    start: {
        text: "<h2>Prologue: The Shattered Eclipse</h2><p>In the ruins of Celestria's Observatory...</p>",
        choices: [
            { text: "⚗️ Take the Alchemist's Paradox", next: "alchemy_path", karma: -2 },
            { text: "📜 Open the Chronomancer's Codex", next: "chrono_path", karma: 1 },
            { text: "🔮 Activate the Engineer's Prism", next: "engineer_path", karma: 0 }
        ]
    },
    alchemy_path: {
        text: "<h2>The Forbidden Science</h2><p>You have chosen the path of forbidden alchemy...</p>",
        choices: [
            { text: "☠ Experiment recklessly", next: "bad_ending", karma: -5 },
            { text: "🔍 Seek knowledge with caution", next: "neutral_path", karma: 1 }
        ]
    },
    chrono_path: {
        text: "<h2>The Flow of Time</h2><p>The codex reveals secrets of the past...</p>",
        choices: [
            { text: "🔁 Rewrite history", next: "happy_ending", karma: 3 },
            { text: "⏳ Observe and learn", next: "neutral_path", karma: 1 }
        ]
    },
    engineer_path: {
        text: "<h2>The Power of Innovation</h2><p>You construct a device of great power...</p>",
        choices: [
            { text: "⚙ Use it for personal gain", next: "bad_ending", karma: -3 },
            { text: "🔧 Share it with the world", next: "good_ending", karma: 4 }
        ]
    },
    good_ending: {
        text: "<h2>Good Ending</h2><p>You have used your abilities wisely and brought prosperity to the world.</p>",
        choices: []
    },
    bad_ending: {
        text: "<h2>Bad Ending</h2><p>Your greed and reckless decisions have led to disaster...</p>",
        choices: []
    },
    happy_ending: {
        text: "<h2>Happy Ending</h2><p>Through balance and wisdom, you have rewritten destiny itself.</p>",
        choices: []
    }
};

function updateScene() {
    const scene = story[player.currentScene];
    document.getElementById('story').innerHTML = scene.text;
    document.getElementById('stats').innerHTML = `Karma: ${player.karma}<br>Secrets: ${player.secretsFound}<br>Items: ${player.inventory.join(', ')}`;
    document.getElementById('choices').innerHTML = '';

    if (scene.choices.length === 0) {
        document.querySelector('.restart-btn').style.display = 'block';
        return;
    }

    scene.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.innerHTML = choice.text;
        btn.onclick = () => {
            player.currentScene = choice.next;
            player.karma += choice.karma;
            updateScene();
        };
        document.getElementById('choices').appendChild(btn);
    });
}

function startGame() {
    player = { currentScene: 'start', karma: 0, inventory: [], secretsFound: 0 };
    document.querySelector('.restart-btn').style.display = 'none';
    updateScene();
}

updateScene();
