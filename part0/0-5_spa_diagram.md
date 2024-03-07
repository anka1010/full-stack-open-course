sequenceDiagram
Browser->>+Server: Request "GET", url="https://studies.cs.helsinki.fi/exampleapp/spa"
Server-->>+Browser: Response status 200 Ok, Content-Type="text/html"
Browser->>+Server: Request "GET", url="https://studies.cs.helsinki.fi/exampleapp/main.css"
Browser->>+Server: Request "GET", url="https://studies.cs.helsinki.fi/exampleapp/spa.js"
Server-->>+Browser: Response status 200 Ok, Content-Type="text/css"
Server-->>+Browser: Response status 200 Ok, Content-Type="application/javascript"
Browser->>+Server: Request "GET", url="https://studies.cs.helsinki.fi/exampleapp/data.json"
Server-->>+Browser: Response status 200 Ok, Content-Type="application/json"
