//const http = require('http');
const request = require('request');

const version = process.env.TMDB_APIVERSION || 3;
const hostname = `https://api.themoviedb.org/${version}`;

console.log(`Using TMDb API V${version}`);

function get(path,callback) {
    const url = hostname + path;
    request.get(url,{
        qs:{api_key:process.env.TMDB_APIKEY}
    },callback);
}

function getRatingByTitle(title){
    const url = hostname + '/search/multi';
    const qs = {
        api_key:process.env.TMDB_APIKEY,
        query:title,
        include_adult:false,
        page:1
    }
    return new Promise((resolve,reject)=>{
        request.get(url,{
            qs:qs
        },(err,response)=>{
            if(err) reject("Unable to make request");
            let json = {};
            try {
                json = JSON.parse(response.body);
            } catch (error) {
                reject("Unable to parse response.");
            }
            if(json.total_results>0){
                const response = {
                    name: json.results[0].name,
                    media_type: json.results[0].media_type,
                    vote_average: json.results[0].vote_average
                }
                resolve(response);
            }else{
                reject("No results");
            }
            
        });

    })
}

module.exports = {
    get:get,
    getRatingByTitle:getRatingByTitle
}