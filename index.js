/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';


inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: "input",
        message: "Enter a URL:",
        name: "URL"
    }
  ])

  .then((answers) => { // This contains a JS object with the users data stored in url
    // Use user feedback for... whatever!!
    const url = answers.URL;

    // Using the URL to generate the QR code image
    var qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream("QR-image.png"));

    fs.writeFile("QR-image.txt", url, (err) => {
        if (err) throw err;
        console.log('Your QR code has been generated and your file is saved');
    });
  })

  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
