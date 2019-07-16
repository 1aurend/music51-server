import Airtable from 'airtable'
import groupChords from '../tools/groupchords.js'
import express from 'express'

require('dotenv').config()

const router = express.Router()
router.route('/')
  .get(function(req, res) {
  res.send('server is running. check terminal logs for data.')
  })
  .post(async function(req, res){
    let qs = await loadQuiz(req.body.numQs)
    res.send(qs)
  })


async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array)
  }
}


async function loadQuiz() {

  const ldBase = new Airtable({apiKey: process.env.LD_AT_KEY}).base(process.env.LD_BASE_ID)

    let data = []

    console.log(`Fetching Quiz Data -----------------------`);


    const Qs = await ldBase('mtQuestions').select({
          maxRecords: 16,
          view: "Grid view"
      }).eachPage(function page(records, fetchNextPage) {

          asyncForEach(records, (record) => {
              console.log('Retrieved', record.get('questionText'));
              data.push(record._rawJson)
          }).then(() => fetchNextPage())

      }).then(() => {return 'got Qs!'})


    const chords = groupChords(data)
    console.log(chords)
    return chords

    }



export default router
