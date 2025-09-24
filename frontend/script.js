// Function to add progress
async function addProgress() {
    const topic = document.getElementById("topic").value;
    const score = document.getElementById("score").value;

    if (!topic || !score) {
        alert("Please enter both topic and score");
        return;
    }

    // Send progress to backend
    const response = await fetch('http://localhost:3000/add-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, score })
    });

    const data = await response.json();
    console.log(data); // just to check in console

    // Refresh progress list
    fetchProgress();

    // Clear input fields
    document.getElementById("topic").value = "";
    document.getElementById("score").value = "";
}

// Function to fetch all progress from backend
async function fetchProgress() {
    const response = await fetch('http://localhost:3000/progress');
    const progressList = await response.json();

    const ul = document.getElementById("list");
    ul.innerHTML = ""; // clear old list

    progressList.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.topic}: ${item.score}%`;
        ul.appendChild(li);
    });
}

// Fetch progress when page loads
window.onload = fetchProgress;
