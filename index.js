// ==================== EXPRESS.JS REST API EXERCISE ====================
// 📌 What is a REST API?
// A **REST API (Representational State Transfer API)** is a web service that allows applications to communicate using standard HTTP methods.  
// REST follows a **stateless architecture**, meaning each request from a client contains all the necessary information,  
// and the server does not store any client state between requests.  
// In this exercise, we are building a **REST API** that enables clients (browsers, Postman, or other apps) to interact with a **products database (JSON file)**.

// 📌 What is Express.js?
// Express.js is a **lightweight and flexible web framework for Node.js** that simplifies the creation of REST APIs.  
// It provides tools to handle **HTTP methods (`GET`, `POST`, `PUT`, `DELETE`)**, manage routes, and send structured responses.  
// Using Express, we can quickly build APIs that allow applications to exchange data efficiently.  

// 📌 How are we implementing REST principles in this exercise?
// - **Stateless Communication:** Each request from the client contains all the information needed to process it.  
// - **Resource-Based Structure:** The API is structured around **resources**, such as "products".  
// - **Standard HTTP Methods:**  
//   - `GET /productos` → Retrieve all products.  
//   - `POST /productos` → Add a new product.  
//   - `PUT /productos/:id` → Update an existing product.  
//   - `DELETE /productos/:id` → Remove a product.  
// - **JSON as the Standard Format:** Data is exchanged in JSON format for easy parsing and compatibility.  

// 📌 How are we using Express.js to build this REST API?
// - We create an **API that manages a list of products** stored in a JSON file (`productos.json`).
// - Users can **retrieve** (`GET`), **add** (`POST`), **update** (`PUT`), and **delete** (`DELETE`) products using Postman or another client.
// - Express.js handles these requests, reads/writes the JSON file, and sends structured responses following REST principles.

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
