Sure! Let's convert the script into an Express.js application and integrate it with an HTML page. When the HTML page is launched, it will trigger the scan and display the updated report. We'll also add a button to manually trigger the scan.

### Step 1: Set up the Express.js project

First, initialize a new Node.js project and install the necessary packages:

```bash
mkdir nmap-express
cd nmap-express
npm init -y
npm install express node-nmap
```

### Step 2: Create the Express.js server

Create a file named `server.js` and add the following code:

```javascript
const express = require('express');
const { NmapScan } = require('node-nmap');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/scan', (req, res) => {
    const nmap = new NmapScan('192.168.1.0/24'); // Adjust the IP range as needed

    nmap.on('complete', (data) => {
        res.json(data);
    });

    nmap.on('error', (error) => {
        res.status(500).json({ error: error.message });
    });

    nmap.startScan();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
```

### Step 3: Create the HTML page

Create a folder named `public` and inside it, create a file named `index.html` with the following content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nmap Scan</title>
    <script>
        async function fetchScanResults() {
            const response = await fetch('/scan');
            const data = await response.json();
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            data.forEach(host => {
                const hostInfo = document.createElement('div');
                hostInfo.innerHTML = `<strong>IP Address:</strong> ${host.ip} <br> <strong>Hostname:</strong> ${host.hostname || 'N/A'}`;
                resultsDiv.appendChild(hostInfo);
            });
        }

        window.onload = fetchScanResults;
    </script>
</head>
<body>
    <h1>Nmap Scan Results</h1>
    <button onclick="fetchScanResults()">Scan Again</button>
    <div id="results"></div>
</body>
</html>
```

### Step 4: Run the server

Run the server using Node.js:

```bash
node server.js
```

Now, when you open `http://localhost:3000` in your browser, it will automatically start scanning the network and display the results. You can also click the "Scan Again" button to manually trigger a new scan.

Let me know if you need any further assistance!

Source: Conversation with Copilot, 11/4/2024
(1) github.com. https://github.com/TryAventum/docs/tree/0a0e0a4b175ca7a293393079e21fdf7f598ca761/src%2Fmd-docs%2Ftutorial%2Fblog%2Fvanilla-javascript%2Fprofile-page%2Findex.md.