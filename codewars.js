const axios = require('axios');
const fs = require("fs");
const { stringify } = require('querystring');

const searchTerm = 'data-id';
const challengeIdArray = []
const promises = []

for (let i = 1; i < 10; i++) {
  console.log(i)
  // const challengeIdArray = JSON.parse(fs.readFileSync('./ChallengesId/challengesId.json'))
  promises.push(axios.get(`https://www.codewars.com/kata/search/javascript?q=&order_by=sort_date+desc&page=${i}`).then((res) => {
    console.log("axios did something")
    const readFile = JSON.parse(fs.readFileSync('./ChallengesId/challengesRawData.json'))
    const rawData = res.data
    const newFile = readFile + rawData
    fs.writeFileSync('./ChallengesId/challengesRawData.json', JSON.stringify(newFile))
  }).catch((error) => {console.log(error.message)}))
}

Promise.all(promises).then(() => console.log("done"));

for ( let i = 0; i < 600; i++) {
  const readFile = JSON.parse(fs.readFileSync('./ChallengesId/challengesRawData.json'))
  if (readFile.indexOf(searchTerm) !== -1) {
    console.log("sliced")
    const slicedData = readFile.slice(readFile.indexOf(searchTerm) + 9)
    const challengeIdFound = slicedData.slice(0,24)
    const reslicedData = slicedData.slice(24)
    fs.writeFileSync('./ChallengesId/challengesRawData.json', JSON.stringify(reslicedData))
    challengeIdArray.push(challengeIdFound)
  }
}

fs.writeFileSync('./ChallengesId/challengesId.json', JSON.stringify(challengeIdArray))

// console.log(challengeIdArray);

// console.log(readFile)