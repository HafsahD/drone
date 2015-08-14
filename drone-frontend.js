var tracker;

function init() {
  tracker = initTracker("#droneView");
    droneConnection.streamImage(tracker, "#droneView .drone");
}

function initTracker(element) {
    // Initialise a color tracker
    var tracker = new tracking.ColorTracker();
    tracker.setMinDimension(20);

    TrackerUtils.addTrackingColor("#494A45", "red", tracker);
    TrackerUtils.addTrackingColor("#A04242", "red", tracker);
    TrackerUtils.addTrackingColor("#A44F4A", "red", tracker);
    TrackerUtils.addTrackingColor("#B24E43", "red", tracker);
    TrackerUtils.addTrackingColor("#A64944", "red", tracker);
    TrackerUtils.addTrackingColor("#A84B4B", "red", tracker);
    TrackerUtils.addTrackingColor("#5EA24E", "green", tracker);
    TrackerUtils.addTrackingColor("#5EA764", "green", tracker);
    TrackerUtils.addTrackingColor("#4BA267", "green", tracker);
    TrackerUtils.addTrackingColor("#49873A", "green", tracker);
    TrackerUtils.addTrackingColor("#37793E", "green", tracker);
    TrackerUtils.addTrackingColor("#60A052", "green", tracker);
    TrackerUtils.addTrackingColor("#61AA5E", "green", tracker);
    TrackerUtils.addTrackingColor("#CB7F84", "magenta", tracker);

    TrackerUtils.startTrackingColors(tracker);
    // Whenever there is a new color detected, mark them
    tracker.on('track', function(event) {
        markColors(event.data, element);
       // console.log(event.data);
        decideDroneMovement(event.data);
    });

    return tracker;
}


    function markColors(colors, element) {
    var canvas = $(element + ' .canvas').get(0);
    var context = canvas.getContext('2d');

    context.clearRect(0, 0, context.width, context.height);
    $(element +" .output").empty();
    for (var i = 0; i < colors.length; i++) {
        drawRectangle(colors[i], context);
        writeRectangle(colors[i], element + " .output");
    }
}

function drawRectangle(rect, context) {
    context.strokeStyle = rect.color;
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    context.font = '11px Helvetica';
    context.fillStyle = "#fff";
    context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
    context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
}

function writeRectangle(rect, element) {
    $(element)

        .append("<p>")
        .append(rect.color + ": " + rect.width + "X" + rect.height)
        .append("@ " + rect.x + ":" + rect.y)
}

function decideDroneMovement(colors) {
    var move = {
        left: false,
        right: false
    };

    colors.forEach(function(rectangle) {
        if (rectangle.color === "green") {
            if (rectangle.width > 250) {
                move.left = true;
            }
        }

        else if (rectangle.color === "red") {
            if (rectangle.width > 250) {
                move.right = true;
            }
        }

    });

    console.log("Move", move);
    droneConnection.send(move);
}

window.addEventListener("load", init);