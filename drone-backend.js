var Cylon = require('cylon');

// Initialise the robot
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })
    .device("nav", {
        driver: "ardrone-nav",
        connection: "ardrone"
    })
    .on("ready", fly);

var bot;
function fly(robot) {
    bot = robot;

    bot.drone.config('general:navdata_demo', 'TRUE');

    bot.nav.on("navdata", function(data) {
        // console.log(data);
    });

    bot.nav.on("altitudeChange", function(data) {
        console.log("Altitude:", data);

        if (altitude > 2) {
            bot.drone.land();
        }
    });

    bot.nav.on("batteryChange", function(data) {
        console.log("Battery level:", data);
    });

    bot.drone.disableEmergency();

    bot.drone.ftrim();


    bot.drone.takeoff();

    bot.drone.left (0.2);
    after (1*1000, function(){
        bot.drone.left(0);
    });

    bot.drone.right (0.2);
    after (1*1000, function(){
        bot.drone.right(0);
    });

    after(8*1000, function() {
        bot.drone.land();
    });
    after(10*1000, function() {
        bot.drone.stop();
    });
}

Cylon.start();

