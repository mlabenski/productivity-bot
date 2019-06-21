const Twit = require('twit')
const Tabletop = require('tabletop')

const config = require('./config')
const jsonQuery = require('json-query');
const bot = new Twit(config)
var currentTime = new Date();
const day =currentTime.getDate();
const month = currentTime.getMonth()+1;
const year= currentTime.getFullYear();
const timeFormatted = `${year}-${month+1<10 ? '0'+month : month}-${day<10 ? '0'+day : day}`


const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1ijSKM96R-_d6DbkUH3Lub57D4UpagnSuRv-1GXxtV1g/edit?usp=sharing';
Tabletop.init({
    key: spreadsheetUrl,
    callback(data, tabletop) {
      jsonQuery('data[activity=timekiller].description', {
        data: data
      })
      console.log(data);
      //You have all the data from the excel sheet what cool shit can we do to it?

      //for each loop to go thru the data
      data.forEach(d => {
        //Daily Tweet-- Include each activitys length + date and whether or not it was completed.
        if(timeFormatted == d.date) {
          //We only want to post our schedule from the current day- works as a filter.
          
          //If we did too much for that day -->
          if(d.activity_quality == 'NOT_PRODUCTIVE') {
            const status = `Mitchell did ${d.activity} for ${d.true_amount-d.amount_per_day_allowed} hours too long. This time will be subtracted from tomorrows surplus.`
            bot.post('statuses/update', {
              status
            }, (err, response, data) => {
              if (err) {
                console.log(err)
              } else {
                console.log('Post success!')
              }
            })
          }
          //If we stayed under
          if(d.activity_quality == 'PRODUCTIVE') {
            const status = `Mitchell completed ${d.activity} successfully! You'll be rewarded for this one!`
            bot.post('statuses/update', {
              status
            }, (err, response, data) => {
              if (err) {
                console.log(err)
              } else {
                console.log('Post success!')
              }
            })
          }

        } else {
          console.log(`${d.activity} took part on a different day, were not going to spam his twitter of old content `)
        }
      })
    },
    simpleSheet: true
  })