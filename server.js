//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();
app.use(express.json()); // before our routes definition

const albumData = require("./data.json");


app.get("/", (request, response) => {
  response.send("Album Server!!! ");
});

app.get('/albums', (req, res) => {
    // Filter out albums with null or undefined ID or title
    const validAlbums = albumData.filter(album => album.id && album.title && album.artist );
    
    // Check if any valid albums are found
    if (validAlbums.length > 0) {
        res.send(validAlbums);
    } else {
        // If no valid albums are found, send a 404 response
        res.status(404).send("No albums found");
    }
});

app.get('/albums/:albumId', (req, res) => {
    const albumId = req.params.albumId;
    
    // Assuming albumsData contains your album data
    const album = albumData.find((album) => album.id === albumId);
    
    if (album) {
        res.send(album);
    } else {
        // If the album is not found, send a 404 response
        res.status(404).send("Album not found");
    }
});


app.post("/albums", function (req, res) {
    const newAlbum = req.body;
    albumData.push(newAlbum);
    res.send("Album added successfully!");
  });

  app.delete('/albums/:albumId', (req, res) => {
    const albumId = req.params.albumId;

    // Find the index of the album with the given ID in the array
    const albumIndex = albumData.findIndex((album) => album.id === albumId);

    // Check if the album exists
    if (albumIndex !== -1) {
        // Remove the album from the array
        albumData.splice(albumIndex, 1);
        
        // Respond with a success message
        res.status(200).send("Album deleted successfully");
    } else {
        // If the album is not found, send a 404 response
        res.status(404).send("Album not found");
    }
});


// Start the server
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});




