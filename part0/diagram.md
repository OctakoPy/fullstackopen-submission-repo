sequenceDiagram
    participant browser
    participant server

    %% User interaction to create a new note
    browser->>browser: User writes content in the text field
    browser->>browser: User clicks "Save" button

    %% Send POST request to save the note
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: Response with success/failure
    deactivate server

    %% Fetch updated notes after adding the new one
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Updated JSON with the new note
    deactivate server

    Note right of browser: The browser updates the UI to show the new note
