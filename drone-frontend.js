function init() {
    var tracker = initTracker("#example");
    tracking.track("#example .drone", tracker);
}

function initTracker(element) {
    // Initialise a color tracker
    var tracker = new tracking.ColorTracker();


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
        console.log(event.data);

    });

    return tracker;
}

function markColors(colors, element) {
    var canvas = $(element + ' .canvas').get(0);
    var context = canvas.getContext('2d');

    context.clearRect(0, 0, context.width, context.height);

    for (var i = 0; i < colors.length; i++) {
        drawRectangle(colors[i], context);
        writeRectangle(colors[i], element + " .output");
    }
}

function drawRectangle(rect, context) {
    context.strokeStyle = rect.color;
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
}

function writeRectangle(rect, element) {
    $(element)

        .append("<p>")
        .append(rect.color + ": " + rect.width + "X" + rect.height)
        .append("@ " + rect.x + ":" + rect.y)
}

window.addEventListener("load", init);