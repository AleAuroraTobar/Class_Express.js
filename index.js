// ==================== EXPRESS.JS API EXERCISE ====================
// 📌 What is an API?
// An **API (Application Programming Interface)** is a set of rules that allows different software applications to communicate with each other.  
// APIs define how requests and responses should be structured, enabling applications to send and receive data.  
// In this case, we are building a **REST API** that allows clients (browsers, Postman, or other apps) to interact with a **products database (JSON file)**.

// 📌 What is Express.js?
// Express.js is a **lightweight web framework for Node.js** that simplifies the creation of web servers and APIs.  
// It helps manage HTTP requests (GET, POST, PUT, DELETE) and responses efficiently without writing complex server code.

// 📌 How are we using Express in this exercise?
// - We create a simple API that **manages a list of products** stored in a JSON file (`productos.json`).
// - Users can **retrieve** (`GET`) and **add new products** (`POST`) using Postman.
// - Express.js will handle the requests, read/write the JSON file, and send appropriate responses.

const express = require("express"); // Import Express (framework for creating web servers)
const fs = require("fs"); // Import File System module to handle file reading and writing

const app = express(); // Create an Express application

// Middleware: Enables Express to parse JSON bodies in requests
app.use(express.json());

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Servidor levantado en el puerto 3000"); // Console log to indicate the server is running
});

// ==================== GET Requests (Retrieve Data) ====================

// GET request to the root ("/") - Displays a simple message
app.get("/", (req, res) => {
   res.send("Primera pantalla"); // Sends a plain text response to the client
});

// GET request to "/home" - Displays another page message
app.get("/home", (req, res) => {
    res.send("Pantalla dentro de HOME");  
});

// GET request to "/fav" - Displays favorites section message
app.get("/fav", (req, res) => {
    res.send("Pantalla de los FAVORITOS");  
});

// GET request to "/productos" - Returns the list of products stored in "productos.json"
app.get("/productos", (req, res) => {
    // Read the "productos.json" file and parse it as a JavaScript array
    const productos = JSON.parse(fs.readFileSync("./productos.json", "utf-8"));
    
    // Send the JSON array as a response
    res.json(productos);
});

// ==================== POST Requests (Add Data) ====================

// POST request to "/productos" - Adds a new product to "productos.json"
app.post("/productos", (req, res) => {
    // Extract the new product data from the request body (JSON)
    const nuevoProducto = req.body;

    // Read the current products from "productos.json"
    const productos = JSON.parse(fs.readFileSync("./productos.json", "utf-8"));

    // Add the new product to the array
    productos.push(nuevoProducto);

    // Save the updated array back to "productos.json"
    fs.writeFileSync("./productos.json", JSON.stringify(productos, null, 2));

    // Send a confirmation response to the client
    res.send("Producto agregado");
});

// ==================== TESTING WITH POSTMAN ====================

// 🛠️ **How to Test This API in Postman**
// To ensure the API works correctly, you need to test it using Postman:

// ✅ **Testing GET Requests**
// - Open Postman and enter `http://localhost:3000/productos`
// - Select **GET** and click **Send**
// - You should see a JSON response with the list of products

// ✅ **Testing POST Requests**
// - Open Postman and enter `http://localhost:3000/productos`
// - Select **POST**, go to **Body**, and choose **raw → JSON**
// - Add a new product in JSON format, for example:
//   {
//       "id": 4,
//       "nombre": "Micrófono",
//       "precio": 22990
//   }
// - Click **Send**
// - You should get a `"Producto agregado"` response
// - Now, if you **GET /productos** again, the new product should be there

// 🔹 **Why Use Postman?**
// - Browsers **only support GET requests** by default, so you can't send a POST request directly.
// - Postman allows you to **send and test POST, PUT, DELETE, and other HTTP methods** easily.
// - You can check **real-time API responses** and see if your API behaves as expected.
