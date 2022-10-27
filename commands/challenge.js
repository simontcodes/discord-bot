const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

const requestBody = {"query":"query questionOfToday {\n\tactiveDailyCodingChallengeQuestion {\n\t\tdate\n\t\tuserStatus\n\t\tlink\n\t\tquestion {\n\t\t\tacRate\n\t\t\tdifficulty\n\t\t\tfreqBar\n\t\t\tfrontendQuestionId: questionFrontendId\n\t\t\tisFavor\n\t\t\tpaidOnly: isPaidOnly\n\t\t\tstatus\n\t\t\ttitle\n\t\t\ttitleSlug\n\t\t\thasVideoSolution\n\t\t\thasSolution\n\t\t\ttopicTags {\n\t\t\t\tname\n\t\t\t\tid\n\t\t\t\tslug\n\t\t\t}\n\t\t}\n\t}\n}\n"}
  
const DAILY_CODING_CHALLENGE_QUERY = `
query questionOfToday {
	activeDailyCodingChallengeQuestion {
		date
		userStatus
		link
		question {
			acRate
			difficulty
			freqBar
			frontendQuestionId: questionFrontendId
			isFavor
			paidOnly: isPaidOnly
			status
			title
			titleSlug
			hasVideoSolution
			hasSolution
			topicTags {
				name
				id
				slug
			}
		}
	}
}`

// const testing = 
// `query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
// problemsetQuestionList: questionList(
// categorySlug: $categorySlug
// limit: $limit
// skip: $skip
// filters: $filters
// ) {
// total: totalNum
// questions: data {
//   acRate
//   difficulty
//   freqBar
//   frontendQuestionId: questionFrontendId
//   isFavor
//   paidOnly: isPaidOnly
//   status
//   title
//   titleSlug
//   topicTags {
//     name
//     id
//     slug
//   }
//   hasSolution
//   hasVideoSolution
// }
// }
// }`



// `
// query problemsetQuestionList: questionList(
//     categorySlug: ""
//     limit: 50
//     skip: 0
//     filters: {difficulty: "EASY"}
//   ){
//     total: totalNum
//     questions: data {
//       acRate
//       difficulty
//       freqBar
//       frontendQuestionId: questionFrontendId
//       isFavor
//       paidOnly: isPaidOnly
//       status
//       title
//       titleSlug
//       topicTags {
//         name
//         id
//         slug
//       }
//       hasSolution
//       hasVideoSolution
//     }
//   }
// }`


// const oneChallenge = {"query":"query question(titleSlug: "two-sum") {\n\tquestionId\n\tquestionFrontendId\n\tboundTopicId\n\ttitle\n\ttitleSlug\n\tcontent\n\ttranslatedTitle\n\ttranslatedContent\n\tisPaidOnly\n\tcanSeeQuestion\n\tdifficulty\n\tlikes\n\tdislikes\n\tisLiked\n\tsimilarQuestions\n\texampleTestcases\n\tcategoryTitle\n\tcontributors {\n\t\tusername\n\t\tprofileUrl\n\t\tavatarUrl\n\t\t__typename\n\t}\n\ttopicTags {\n\t\tname\n\t\tslug\n\t\ttranslatedName\n\t\t__typename\n\t}\n\tcompanyTagStats\n\tcodeSnippets {\n\t\tlang\n\t\tlangSlug\n\t\tcode\n\t\t__typename\n\t}\n\tstats\n\thints\n\tsolution {\n\t\tid\n\t\tcanSeeDetail\n\t\tpaidOnly\n\t\thasVideoSolution\n\t\tpaidOnlyVideo\n\t\t__typename\n\t}\n\tstatus\n\tsampleTestCase\n\tmetaData\n\tjudgerAvailable\n\tjudgeType\n\tmysqlSchemas\n\tenableRunCode\n\tenableTestMode\n\tenableDebugger\n\tenvInfo\n\tlibraryUrl\n\tadminUrl\n\tchallengeQuestion {\n\t\tid\n\t\tdate\n\t\tincompleteChallengeCount\n\t\tstreakCount\n\t\ttype\n\t\t__typename\n\t}\n\t__typename}"}
// query question(titleSlug: "two-sum") {
// \n\tquestionId
// \n\tquestionFrontendId
// \n\tboundTopicId
// \n\ttitle
// \n\ttitleSlug
// \n\tcontent
// \n\ttranslatedTitle
// \n\ttranslatedContent
// \n\tisPaidOnly
// \n\tcanSeeQuestion
// \n\tdifficulty
// \n\tlikes
// \n\tdislikes
// \n\tisLiked
// \n\tsimilarQuestions
// \n\texampleTestcases
// \n\tcategoryTitle
// \n\tcontributors {
// \n\t\tusername
// \n\t\tprofileUrl
// \n\t\tavatarUrl
// \n\t\t__typename
// \n\t}
// \n\ttopicTags {
// \n\t\tname
// \n\t\tslug
// \n\t\ttranslatedName
// \n\t\t__typename
// \n\t}
// \n\tcompanyTagStats
// \n\tcodeSnippets {
// \n\t\tlang
// \n\t\tlangSlug
// \n\t\tcode
// \n\t\t__typename
// \n\t}
// \n\tstats
// \n\thints
// \n\tsolution {
// \n\t\tid
// \n\t\tcanSeeDetail
// \n\t\tpaidOnly
// \n\t\thasVideoSolution
// \n\t\tpaidOnlyVideo
// \n\t\t__typename
// \n\t}
// \n\tstatus
// \n\tsampleTestCase
// \n\tmetaData
// \n\tjudgerAvailable
// \n\tjudgeType
// \n\tmysqlSchemas
// \n\tenableRunCode
// \n\tenableTestMode
// \n\tenableDebugger
// \n\tenvInfo
// \n\tlibraryUrl
// \n\tadminUrl
// \n\tchallengeQuestion {
// \n\t\tid
// \n\t\tdate
// \n\t\tincompleteChallengeCount
// \n\t\tstreakCount
// \n\t\ttype
// \n\t\t__typename
// \n\t}
// \n\t__typename
// }`




const requestTestBody = JSON.stringify({ query: oneChallenge })



const axiosConfig = {headers: { 'Content-Type': 'application/json' }}

// app.use(express.json());
let challenge = "";

// -------------------------------------------------------------------------------------
// function getChallenge() {
//   axios
//     .get(
//       "https://www.codewars.com/api/v1/code-challenges/5277c8a221e209d3f6000b56"
//     )
//     .then((response) => {
//       console.log(response.data.description);
//       challenge = response.data.description;
//     }); 
// }
// -------------------------------------------------------------------------------------




function getChallenge() {
  axios.post('https://leetcode.com/graphql', requestBody, axiosConfig).then((res) => {
    console.log(res.data.data.activeDailyCodingChallengeQuestion.link)
    challenge = `https://leetcode.com${res.data.data.activeDailyCodingChallengeQuestion.link}`
  }).catch((error) => {console.log(error.message)})
}

function getOneChallenge() {
  axios.post('https://leetcode.com/graphql', requestTestBody, axiosConfig).then((res) => {
    console.log(res.data)
  }).catch((error) => {console.log(error)})
}

console.log("outside of function");
console.log(getOneChallenge());

module.exports = {
  data: new SlashCommandBuilder()
    .setName("challenge")
    .setDescription("Replies with a coding challenge"),
  async execute(interaction) {
    await interaction.channel.send(challenge);
    await interaction.reply("there should be a challenge here");
  },
};
