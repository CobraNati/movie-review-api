This project is a simple REST API built using Node.js core modules only. It is designed to perform CRUD (Create, Read, Update, and Delete) operations for a Movie Review system without the use of external frameworks like Express.

Features
    Create: Add a new movie record with a unique ID.
    Read: Retrieve a list of all movies or a single movie by its ID.
    Update: Modify an existing movie record.
    Delete: Remove a movie record from the database.


Technical Constraints
    Built using only the http and fs modules.
    No external dependencies (no Express, no path library).
    Proper routing and use of HTTP methods (GET, POST, PUT, DELETE).

Prerequisites
    Node.js installed on your machine.



API Endpoints
    GET / - Checks if the server is running
    GET /movies - Retrieves all movies
    GET /movies/:id - Retrieves a movie by ID
    POST /movies - Adds a new movie
    PUT /movies/:id - Updates an existing movie
    DELETE /movies/:id - Deletes a movie