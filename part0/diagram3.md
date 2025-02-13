sequenceDiagram
    participant browser
    participant server

    Note right of browser: User enters content in input field and clicks Save

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/data.json (new note data)
    activate server
    server-->>browser: Response with saved note data
    deactivate server

    Note right of browser: Browser dynamically updates the display with new note
