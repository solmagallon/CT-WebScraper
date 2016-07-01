var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

url = 'http://origin-web-scraping.herokuapp.com/';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

        var title, cover, author, price;
        var json = { title : "", cover : "", author : "", price : ""};

        $('.panel-heading').filter(function(){
            var data = $(this);
            title = data.text();            
        

            json.title = title;
        })



        $('.panel-body').filter(function(){
            var data = $(this);
            cover = data.children().first().html();
            author = data.children().next().children().text();
            price = data.children().last().children().text();

            json.cover = cover;
            json.author = author;
            json.price = price;
        })
    }

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check your console!')

    }) ;
})