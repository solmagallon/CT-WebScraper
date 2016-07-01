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
    })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;