// const PDFParser = require('pdf2json');
// let fs = require('fs')


// let pdfParser = new PDFParser();
// let pdfFilePath = "recipe.pdf"

// //First extract text from PDF

// fs.readFile(pdfFilePath, (err, pdfBuffer) => {
//   if (!err) {
//     pdfParser.parseBuffer(pdfBuffer);
//     console.log(pdfBuffer)
//   }
// })
// fs.writeFile("recipe.json", pdfBuffer, JSON.stringify(pdfParser_dataReady) )

//Second write PDF to JSON

//
// let fs = require('fs'),
//   PDFParser = require("pdf2json");

// let pdfParser = new PDFParser();

// pdfParser.loadPDF("pdfParser_dataError", errData => console.error(errData.parserError));
// pdfParser.on("pdfParser_dataReady", pdfData => {
//   fs.writeFile("recipe.json", JSON.stringify(pdfData),
//     pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError))
//   );
// });

// pdfParser.loadPDF("recipe.pdf");

async function quickstart() {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  const [result] = await client.labelDetection('./resources/wakeupcat.jpg');
  const labels = result.labelAnnotations;
  console.log('Labels:');
  labels.forEach(label => console.log(label.description));
}