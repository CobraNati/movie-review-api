const http = require('http');
const fs = require('fs');

const PORT = 3000;
const DATA_FILE = './movies.json';

const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data || '[]');
    } catch (err) {
        return [];
    }
};

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const server = http.createServer((req, res) => {
    const { method, url } = req;
    const urlParts = url.split('/');
    const id = urlParts[2];

    res.setHeader('Content-Type', 'application/json');

    if (method === 'GET') {
        const movies = readData();
        if (url === '/movies') {
            res.end(JSON.stringify(movies));
        } else if (id) {
            const movie = movies.find(m => m.id === parseInt(id));
            if (movie) {
                res.end(JSON.stringify(movie));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ message: "Movie not found" }));
            }
        }
    }

    else if (method === 'POST' && url === '/movies') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const movies = readData();
            const newMovie = JSON.parse(body);
            newMovie.id = Date.now();
            movies.push(newMovie);
            writeData(movies);
            res.statusCode = 201;
            res.end(JSON.stringify(newMovie));
        });
    }

    else if (method === 'PUT' && id) {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            let movies = readData();
            const index = movies.findIndex(m => m.id === parseInt(id));
            if (index !== -1) {
                movies[index] = { ...movies[index], ...JSON.parse(body), id: parseInt(id) };
                writeData(movies);
                res.end(JSON.stringify(movies[index]));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ message: "Movie not found" }));
            }
        });
    }

    else if (method === 'DELETE' && id) {
        let movies = readData();
        const filteredMovies = movies.filter(m => m.id !== parseInt(id));
        if (movies.length !== filteredMovies.length) {
            writeData(filteredMovies);
            res.end(JSON.stringify({ message: "Movie deleted" }));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: "Movie not found" }));
        }
    }

    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});