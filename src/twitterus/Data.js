// Holds the data for the application
var data = {};

data.sections = [{
        id: 'Hommie',
        tweetNumber: 30
    }, {
        id: 'Discover',
        tweetNumber: 30
    }, {
        id: 'Connect',
        tweetNumber: 30
    }, {
        id: 'Me',
        tweetNumber: 30
    }];

$.ajax({
    url: "http://localhost:8080/stream",
    type: "GET",
})
.success(function(ret, textStatus, jqXHR) {
    var dataObj = ret.data.states;
    for (var key in dataObj) {
        if (dataObj[key].content.authorId) {
            data.usernames.push(dataObj[key].content.authorId);
        }
        if (dataObj[key].content.bodyHtml) {
            data.begin.push(dataObj[key].content.bodyHtml);
            data.end.push(dataObj[key].content.bodyHtml);
            data.hashtags.push('#sunset');
        }
    }
})
.done(function(data, textStatus, jqXHR) {
    console.log(data)
})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.log("HTTP Request Failed");
})
.always(function() {
    /* ... */
});

module.exports = data;

// Stream (GET https://sales.stream1.fyre.co/v3.1/collection/118057680/0/)
