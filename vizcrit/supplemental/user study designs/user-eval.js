var newstudy_data = {
    'textbook-based': {},
    'awareness-centered': {},
    'solution-centered': {}
};

// Helper to register one participant image under a category
function registerParticipant(categoryKey, filename) {
    var match = filename.match(/^(P\d+)-seed(\d)\.png$/i);
    if (!match) return;
    var pname = match[1].toUpperCase();
    var seedIdx = match[2];
    var seedImg = 'design-images/seed' + seedIdx + '.png';
    var finalImg = 'design-images/' + categoryKey + '/' + filename;

    newstudy_data[categoryKey][pname] = {
        'seed': seedImg,
        'final': finalImg
    };
}

// Textbook-based
[
 'P11-seed1.png','P12-seed2.png','p13-seed1.png','P14-seed1.png','P18-seed2.png','P23-seed2.png',
 'P25-seed1.png','P27-seed2.png','P29-seed2.png','P31-seed1.png','P34-seed2.png','P4-seed1.png'
].forEach(function(f){ registerParticipant('textbook-based', f); });

// Awareness-centered
[
 'P1-seed2.png','P15-seed2.png','P17-seed1.png','p19-seed2.png','P21-seed1.png','P22-seed1.png',
 'P24-seed1.png','P26-seed2.png','P32-seed1.png','P33-seed1.png','P35-seed2.png','p7-seed2.png'
].forEach(function(f){ registerParticipant('awareness-centered', f); });

// Solution-centered
[
 'p10-seed2.png','P16-seed2.png','P2-seed2.png','P20-seed1.png','P28-seed2.png','p3-seed1.png',
 'P30-seed1.png','P36-seed1.png','p5-seed1.png','P6-seed1.png','P8-seed2.png','p9-seed2.png'
].forEach(function(f){ registerParticipant('solution-centered', f); });

var trial_template = function(pname, data, first) {

    var html = '' 

    if (first)
        html += '<span class="task-label">Seed</span>'

    html += '<div class="inline-imgs">\
            <div class="task-img"><img src="' + data['seed'] + '"/><br></div>\
            </div>\
            </div>\
            <div class="task-block">'

    if (first)
        html += '<span class="task-label">Design</span>'

    html += '<div class="inline-imgs">\
            <div class="task-img"><img src="' + data['final'] + '"/><br></div>\
            </div>\
            </div>'

    html += '</div>'

    return html;
}

var template = function(pname, data, first) {

    var html = '<div class="p-row">'

    html += '<div class="plabel-cont"><span class="plabel">' + pname + '</span></div>\
            <div class="task-block">'

    html += trial_template(pname, data, first)

    return html;

}

var render = function() {
    var first;

    var sortByNumericId = function(a, b) {
        var na = parseInt(a.replace(/[^0-9]/g, ''));
        var nb = parseInt(b.replace(/[^0-9]/g, ''));
        return na - nb;
    };

    first = true;
    Object.keys(newstudy_data['textbook-based']).sort(sortByNumericId).forEach(function(p) {
        $('#textbook-cont').append(template(p, newstudy_data['textbook-based'][p], first))
        if (first)
            first = false;
    });

    first = true;
    Object.keys(newstudy_data['awareness-centered']).sort(sortByNumericId).forEach(function(p) {
        $('#awareness-cont').append(template(p, newstudy_data['awareness-centered'][p], first))
        if (first)
            first = false;
    });

    first = true;
    Object.keys(newstudy_data['solution-centered']).sort(sortByNumericId).forEach(function(p) {
        $('#solution-cont').append(template(p, newstudy_data['solution-centered'][p], first))
        if (first)
            first = false;
    });

    // Default: show textbook, hide others
    $('#awareness-cont').addClass('hidden');
    $('#solution-cont').addClass('hidden');
}

$(document).ready(function() {

    $('#textbook-lnk').click(function(e) {
        $('.active').removeClass('active');
        $('#awareness-cont').addClass('hidden');
        $('#solution-cont').addClass('hidden');

        $(this).addClass('active');
        $('#textbook-cont').removeClass('hidden');
    });

    $('#awareness-lnk').click(function(e) {
        $('.active').removeClass('active');
        $('#textbook-cont').addClass('hidden');
        $('#solution-cont').addClass('hidden');

        $(this).addClass('active');
        $('#awareness-cont').removeClass('hidden');
    });

    $('#solution-lnk').click(function(e) {
        $('.active').removeClass('active');
        $('#textbook-cont').addClass('hidden');
        $('#awareness-cont').addClass('hidden');

        $(this).addClass('active');
        $('#solution-cont').removeClass('hidden');
    });

    render()

});


