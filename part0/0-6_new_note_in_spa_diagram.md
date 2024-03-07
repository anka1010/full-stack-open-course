sequenceDiagram
Browser->>+Server: Request "POST", url="https://studies.cs.helsinki.fi/exampleapp/new_note_spa"
Server-->>+Browser: Response status 201 Created, Content-Type="application/json"
