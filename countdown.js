window.onload = function(e) {
    var $clock = $('#clock'),
        coordenadas = $("#coords").text();
    latlng = coordenadas.split(",");
    timeZone = tzlookup(latlng[0].replace(/(^[ '\^\$\*#&]+)|([ '\^\$\*#&]+$)/g, ''), latlng[1].replace(/(^[ '\^\$\*#&]+)|([ '\^\$\*#&]+$)/g, ''));
    utc = moment.tz(timeZone).format('Z');
    eventTime = moment.tz(timeZone).endOf('day').utc();
    currentTime = moment(),
        diffTime = eventTime.unix() - currentTime.unix(),
        duration = moment.duration(diffTime * 1000, 'milliseconds'),
        interval = 1000;

    // if time to countdown
    if (diffTime > 0) {

        // Show clock
        //$clock.show();

        var $d = $('<div class="days" ></div>').appendTo($clock),
            $h = $('<div class="hours" ></div>').appendTo($clock),
            $m = $('<div class="minutes" ></div>').appendTo($clock),
            $s = $('<div class="seconds" ></div>').appendTo($clock);


        setInterval(function() {

            duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');
            var d = moment.duration(duration).days(),
                h = moment.duration(duration).hours(),
                m = moment.duration(duration).minutes(),
                s = moment.duration(duration).seconds();

            d = $.trim(d).length === 1 ? '0' + d : d;
            h = $.trim(h).length === 1 ? '0' + h : h;
            m = $.trim(m).length === 1 ? '0' + m : m;
            s = $.trim(s).length === 1 ? '0' + s : s;

            // show how many hours, minutes and seconds are left

            /*$d.text(d+" days");
            $h.text(h+" hours");
            $m.text(m+" minutes");
            $s.text(s+" seconds");*/

            $("#countdown").html(d + " days " + h + " hours " + m + " minutes " + s + ' seconds left until midnight in <b><i>"' + timeZone + '"</i></b> timezone');

        }, interval);
    }
};