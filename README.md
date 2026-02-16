# URL Checker - Simple Browser Application

This project is a simple browser based application built using Javascript.  
It allows a user to enter a URL and performs validation and existence checking in real time.

---

## Features

- User can type a URL into an input field.
- The application checks if the URL format is valid while typing.
- If the format is valid, the URL is sent to a server to check:
  - Whether the URL exists.
  - Whether it represents a file or a folder.

---

## Server Implementation

There is no real backend or server in this project.

Instead the server is mocked on the client side.  
The mock server simulates real server behavior and responses.

The server call is implemented asynchronously to imitate real network communication and delay.

---

## Throttling

Both format validation and existence checks are triggered as the user types.

However, the existence check is throttled to ensure that too many server requests are not made continuously on every keystroke.

