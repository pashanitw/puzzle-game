var canvasWidth = 800,
    canvasHeight = 800;
var imageWidth = 386,
    imageHeight = 643;
var BASEPATH = "atlas";
var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});
function getOffset() {

    var offset = {
        x: (canvasWidth - imageWidth) / 2,
        y: (canvasHeight - imageHeight) / 2
    };
    return offset;
}
function getPath(name) {
    return BASEPATH + "/" + name;
}
function preload() {
    game.load.atlasJSONHash(
        'dinosaur',
        getPath('dinosaur') + '.png',
        getPath('dinosaur') + '.json'
    );
}
var positions = [
    {
        x: 0,
        y: 0,
        original: {
            x: 328,
            y: 78
        }
    },
    {
        x: 0,
        y: 100,
        original: {
            x: 384,
            y: 116
        }
    },
    {
        x: 0,
        y: 200,
        original: {
            x: 243,
            y: 157
        }
    },
    {
        x: 0,
        y: 300,
        original: {
            x: 318,
            y: 217
        }
    },
    {
        x: 0,
        y: 400,
        original: {
            x: 204,
            y: 317
        }
    },
    {
        x: 0,
        y: 500,
        original: {
            x: 262,
            y: 355
        }
    },
    {
        x: 600,
        y: 0,
        original: {
            x: 342,
            y: 341
        }
    },
    {
        x: 600,
        y: 100,
        original: {
            x: 247,
            y: 460
        }
    },
    {
        x: 600,
        y: 200,
        original: {
            x: 398,
            y: 505
        }
    },
    {
        x: 600,
        y: 300,
        original: {
            x: 267,
            y: 552
        }
    },
    {
        x: 600,
        y: 400,
        original: {
            x: 425,
            y: 557
        }
    },
    {
        x: 600,
        y: 500,
        original: {
            x: 355,
            y: 645
        }
    }

];
function create() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    var frameData = game.cache.getFrameData('dinosaur');
    var offset = getOffset();
    var i = 0;
    game.add.sprite(offset.x, offset.y, "dinosaur", "negative.png");


    for (var key in frameData._frameNames) {
        if (key !== "negative.png") {
            var sprite = game.add.sprite(positions[i].x, positions[i].y, "dinosaur", key);
            sprite.index = i;
            sprite.inputEnabled = true;
            sprite.input.pixelPerfectOver = true;
            sprite.input.enableDrag();
            sprite.events.onDragUpdate.add(onDrag, this);
            sprite.events.onDragStop.add(stopDrag, this);
            i++;
        }
//        frameData.getFrameByName("negative.png")
    }
}
function onDrag(sprite) {
    sprite.bringToTop();
    var distance = getDistance({x: sprite.x, y: sprite.y}, positions[sprite.index].original);
    console.log(distance);
    if (distance < 10) {
        sprite.x = positions[sprite.index].original.x;
        sprite.y = positions[sprite.index].original.y;
        sprite.inputEnabled = false;
    }
}
function stopDrag(sprite) {
    if (sprite.inputEnabled) {
        sprite.x = positions[sprite.index].x;
        sprite.y = positions[sprite.index].y;
    }
}
function getDistance(point1, point2) {
    return Math.abs(Math.sqrt((point2.x - point1.x) * (point2.x - point1.x) - (point2.y - point1.y) * (point2.y - point1.y)));
}
function update() {

}
