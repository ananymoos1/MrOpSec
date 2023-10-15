const axios = require('axios');
const readline = require('readline');
const colors = require('colors');
const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');
const apiUrl = 'https://cyberconnect.tech/files/names.json';

function generateRandomWords(count) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const words = [];
  for (let i = 0; i < count; i++) {
    let word = '';

    for (let j = 0; j < 8; j++) {
      word += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    for (let j = 0; j < 4; j++) {
      word += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    words.push(word);
  }
  return words;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let isFirstCommand = true;

function runRandomDataGenerator() {
  axios.get(apiUrl)
    .then(response => {
      const data = response.data;
      const firstNames = data.first;
      const lastNames = data.last;

      if (isFirstCommand) {
        console.log('Type "help" for a list of commands.'.green);
        isFirstCommand = false;
      }

      rl.question('user@MrOpSec$ '.cyan, (command) => {
        if (command.toLowerCase() === 'exit') {
          rl.close();
        } else if (command.toLowerCase() === 'gen name') {
          const randomIndex = Math.floor(Math.random() * Math.min(firstNames.length, lastNames.length));
          console.log(`Generated Name: ${firstNames[randomIndex].magenta} ${lastNames[randomIndex].magenta}`);
          runRandomDataGenerator();
        } else if (command.toLowerCase() === 'gen address') {
          const address = faker.location.streetAddress() + ', ' + faker.location.city() + ', ' + faker.location.state({ abbreviated: true }) + ' ' + faker.location.zipCode('#####');
          console.log(`Generated Address: ${address.cyan}`);
          runRandomDataGenerator();
        } else if (command.toLowerCase() === 'gen phone') {
          const phoneNumber = faker.phone.number()
            .replace(/x.*/, '');
          console.log(`Generated Phone Number: ${phoneNumber.cyan}`);
          runRandomDataGenerator();
        } else if (command.toLowerCase() === 'gen email') {
          const randomNameIndex = Math.floor(Math.random() * Math.min(firstNames.length, lastNames.length));
          const firstName = firstNames[randomNameIndex];
          const lastName = lastNames[randomNameIndex];

          const randomNumbers = Math.floor(1000 + Math.random() * 9000);
          const emailProviders = ['yahoo.com', 'gmail.com', 'outlook.com', 'aol.com', 'hotmail.com', 'tutanota.com', 'icloud.com', 'protonmail.me', 'protonmail.com'];
          const randomProvider = emailProviders[Math.floor(Math.random() * emailProviders.length)];
          const shouldAddPeriod = Math.random() < 0.5;
          const email = shouldAddPeriod
            ? `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNumbers}@${randomProvider}`
            : `${firstName.toLowerCase()}${lastName.toLowerCase()}${randomNumbers}@${randomProvider}`;

          console.log(`Generated Email: ${email.cyan}`);
          runRandomDataGenerator();
        } else if (command.toLowerCase() === 'gen sex') {
          const gender = Math.random() < 0.5 ? 'Male' : 'Female';
          console.log(`Generated Gender: ${gender.cyan}`);
          runRandomDataGenerator();
        } else if (command.toLowerCase() === 'gen password') {
          function generateRandomWords(count) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            const numbers = '0123456789';
            const words = [];
            for (let i = 0; i < count; i++) {
              let word = '';

              for (let j = 0; j < 8; j++) {
                word += characters.charAt(Math.floor(Math.random() * characters.length));
              }

              for (let j = 0; j < 4; j++) {
                word += numbers.charAt(Math.floor(Math.random() * numbers.length));
              }

              words.push(word);
            }
            return words;
          }
          const randomNameIndex = Math.floor(Math.random() * Math.min(firstNames.length, lastNames.length));
          const firstName = firstNames[randomNameIndex];
          const lastName = lastNames[randomNameIndex];
          const randomWords = generateRandomWords(1);
          const randomNumbers = Math.floor(1000 + Math.random() * 9000);
          const reversedLastName = lastName.split('').reverse().join('');
          const password = `${firstName}${reversedLastName}${randomWords}${randomNumbers}`;

          console.log(`Generated Password: ${password.cyan}`);
          return runRandomDataGenerator();
        } else if (command.toLowerCase() === 'gen username') {
            const randomNameIndex = Math.floor(Math.random() * Math.min(firstNames.length, lastNames.length));
            const firstName = firstNames[randomNameIndex];
            const lastName = lastNames[randomNameIndex];
            const randomNumbers = Math.floor(1000 + Math.random() * 9000);
            const randomUsernameNumbers = randomNumbers.toString().padStart(4, '0');
            const username = `${firstName}${lastName}${randomUsernameNumbers}`;
            console.log(`Generated Username: ${username.cyan}`);
            runRandomDataGenerator();
          } else if (command.toLowerCase() === 'bulkgen') {
          rl.question('Enter the number of sets to generate: '.cyan, (count) => {
            const numberOfSets = parseInt(count);
            if (isNaN(numberOfSets) || numberOfSets <= 0) {
              console.log('Invalid input. Please enter a positive number.');
              runRandomDataGenerator();
              return;
            }
            const folderPath = path.join(__dirname, 'bulkgen');
            if (!fs.existsSync(folderPath)) {
              fs.mkdirSync(folderPath);
            }
            for (let i = 1; i <= numberOfSets; i++) {
              const randomNameIndex = Math.floor(Math.random() * Math.min(firstNames.length, lastNames.length));
              const randomNumbers = Math.floor(1000 + Math.random() * 9000);
              const fullName = `${firstNames[randomNameIndex]} ${lastNames[randomNameIndex]}`;
              const minBirthDate = new Date('1973-01-01');
              const maxBirthDate = new Date('2012-12-31');
              const birthDate = faker.date.between({ from: minBirthDate, to: maxBirthDate}).toLocaleDateString();
              const gender = Math.random() < 0.5 ? 'Male' : 'Female';
              const ipAddress = faker.internet.ip();
              const address = faker.location.streetAddress() + ', ' + faker.location.city() + ', ' + faker.location.state({ abbreviated: true }) + ' ' + faker.location.zipCode('#####');
              const phoneNumber = faker.phone.number().replace(/x.*/, '');
              const [firstName, lastName] = fullName.split(' ');
              const emailProviders = ['yahoo.com', 'gmail.com', 'outlook.com', 'aol.com', 'hotmail.com', 'tutanota.com', 'icloud.com', 'protonmail.me', 'protonmail.com'];
              const randomProvider = emailProviders[Math.floor(Math.random() * emailProviders.length)];
              const shouldAddPeriod = Math.random() < 0.5;
              const email = shouldAddPeriod
                ? `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNumbers}@${randomProvider}`
                : `${firstName.toLowerCase()}${lastName.toLowerCase()}${randomNumbers}@${randomProvider}`;
              const randomWords = generateRandomWords(1);
              const reversedLastName = lastName.split('').reverse().join('');
              const password = `${firstName}${reversedLastName}${randomWords}${randomNumbers}`;
              const randomUsernameNumbers = randomNumbers.toString().padStart(4, '0');
              const username = `${firstName}${lastName}${randomUsernameNumbers}`;
              const dataToSave = `Full Name: ${fullName}\nBirth of date: ${birthDate}\nGender: ${gender}\nAddress: ${address}\nPhone number: ${phoneNumber}\nE-mail address: ${email}\nIP Address: ${ipAddress}\nUsername: ${username}\nPassword: ${password}`;
              const randomFilename = `${Math.random().toString(36).substring(2, 10)}-${i}.txt`;
              const filePath = path.join(folderPath, randomFilename);
              fs.writeFileSync(filePath, dataToSave);
              console.log(`Generated and saved set ${i} to ${randomFilename.cyan}`);
            }
            runRandomDataGenerator();
          });
        } else if (command.toLowerCase() === 'help') {
          console.log('Available commands:'.yellow);
          console.log('gen name'.cyan + ' - Generate a full name');
          console.log('gen address'.cyan + ' - Generate an address');
          console.log('gen phone'.cyan + ' - Generate a phone number');
          console.log('gen email'.cyan + ' - Generate an email address');
          console.log('gen sex'.cyan + ' - Generate a sexual identity.');
          console.log('bulkgen'.cyan + ' - Generate multiple sets of random data.');
          console.log('exit'.cyan + ' - Stop the program');
          runRandomDataGenerator();
        } else {
          console.log('Invalid command. Please type "help" for a list of commands.'.red);
          runRandomDataGenerator();
        }
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      rl.close();
    });
}

runRandomDataGenerator();
