import * as p5 from 'p5';

import { CommandWithListValue, CommandWithType } from './lang/parser';

interface Line {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: p5.Color;
  penWeight: number;
}

export class Turtle {
  private x: number = 0;
  private y: number = 0;
  private direction: number = 0;
  private isPenDown: boolean = false;
  private penWidth: number = 1;
  private movementSpeed = 3;
  private penColor: p5.Color | undefined;
  private lines: Line[] = [];

  constructor(
    private sketch: p5,
    private turtleImage: p5.Image,
  ) {
    this.sketch = sketch;
    this.reset();
  }

  execute(command: CommandWithType) {
    const commandHandlers: {
      [key in CommandWithType['type']]: (command: any) => void;
    } = {
      backward: () => console.log('tbd'),
      forward: () => this.forward(),
      penup: () => this.penUp(),
      pendown: () => this.penDown(),
      turnleft: ({ value: [v] }: CommandWithListValue) => this.turnLeft(v),
      turnright: ({ value: [v] }: CommandWithListValue) => this.turnRight(v),
      direction: ({ value: [v] }: CommandWithListValue) => this.setDirection(v),
      penwidth: ({ value: [v] }: CommandWithListValue) => this.setPenWidth(v),
      gox: ({ value: [x] }: CommandWithListValue) => this.setX(x),
      goy: ({ value: [y] }: CommandWithListValue) => this.setY(y),
      center: () => this.center(),
      go: ({ value: [x, y] }: CommandWithListValue) => {
        this.setX(Number(x));
        this.setY(Number(y));
      },
      pencolor: ({ value: [r, g, b] }) => this.setPenColor({ r, g, b }),
    };

    const handler = commandHandlers[command.type];
    if (handler) {
      handler(command);
    }
  }

  draw() {
    this.sketch.clear(255, 255, 255, 1);
    this.sketch.push();
    {
      this.drawLines();
      this.drawTurtle();
    }
    this.sketch.pop();
  }

  reset() {
    this.direction = 0;
    this.lines = [];
    this.setPenColor({ r: 0, g: 0, b: 0 });
    this.setPenWidth(1);
    this.center();
  }

  private drawTurtle() {
    this.sketch.translate(this.x, this.y);
    this.sketch.imageMode(this.sketch.CENTER);
    this.sketch.rotate(this.direction);
    this.sketch.image(this.turtleImage, 0, 0);
    this.sketch.imageMode(this.sketch.CORNER);
    this.sketch.pop();
  }

  private drawLines() {
    this.sketch.push();
    this.lines.forEach(({ startX, startY, endX, endY, color, penWeight }) => {
      this.sketch.stroke(color);
      this.sketch.strokeWeight(penWeight);
      this.sketch.line(startX, startY, endX, endY);
    });
  }

  private forward() {
    const moveX = this.sketch.sin(this.direction) * 10 * this.movementSpeed;
    const moveY = this.sketch.cos(this.direction) * 10 * this.movementSpeed;
    const imageSize = 5;

    if (
      this.x + moveX + imageSize > this.sketch.width ||
      this.x + moveX - imageSize <= 0
    )
      return;
    if (
      this.y - moveY + imageSize > this.sketch.height ||
      this.y - moveY - imageSize <= 0
    )
      return;

    if (this.isPenDown) {
      this.lines.push({
        startX: this.x,
        startY: this.y,
        endX: this.x + moveX,
        endY: this.y - moveY,
        color: this.penColor || this.sketch.color(0, 0, 0),
        penWeight: this.penWidth ?? 1,
      });
    }

    this.x += moveX;
    this.y -= moveY;
  }

  private turnLeft(degrees: number) {
    this.direction -= degrees * (Math.PI / 180);
  }

  private turnRight(degrees: number) {
    this.direction += degrees * (Math.PI / 180);
  }

  private setDirection(degrees: number) {
    this.direction = degrees * (Math.PI / 180);
  }

  private setX(x: number) {
    this.x = x;
  }

  private setY(y: number) {
    this.y = y;
  }

  private penUp() {
    this.isPenDown = false;
  }

  private penDown() {
    this.isPenDown = true;
  }

  private setPenColor({
    r = 0,
    g = 0,
    b = 0,
  }: {
    r: number;
    g: number;
    b: number;
  }) {
    this.penColor = this.sketch.color(r, g, b);
  }

  private setPenWidth(width: number) {
    this.penWidth = width;
  }

  private center() {
    this.direction = 0;
    this.x = this.sketch.width / 2;
    this.y = this.sketch.height / 2;
  }
}
