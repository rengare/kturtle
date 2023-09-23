interface Line {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  width: number;
}

export class Turtle {
  private x: number;
  private y: number;
  private direction: number = 0;
  private isPenDown: boolean = false;
  private penWidth: number = 1;
  private movementSpeed = 3;
  private penColor: string = '#000000';
  private turtleImage: HTMLImageElement;
  private ctx: CanvasRenderingContext2D;

  private lines: Line[] = [];

  constructor(ctx: CanvasRenderingContext2D, turtleImage: HTMLImageElement) {
    this.x = ctx.canvas.width / 2;
    this.y = ctx.canvas.height / 2;
    this.ctx = ctx;
    this.ctx.lineWidth = this.penWidth;
    this.ctx.strokeStyle = this.penColor;
    this.turtleImage = turtleImage;
  }

  drawTurtle() {
    if (this.turtleImage.complete) {
      const imgWidth = this.turtleImage.width;
      const imgHeight = this.turtleImage.height;

      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(this.direction);
      this.ctx.drawImage(
        this.turtleImage,
        -imgWidth / 2,
        -imgHeight / 2,
        imgWidth,
        imgHeight,
      );
      this.ctx.restore();
    }
  }

  forward() {
    const moveX = Math.sin(this.direction) * 10 * this.movementSpeed;
    const moveY = Math.cos(this.direction) * 10 * this.movementSpeed;
    const imageSize = 5;

    if (
      this.x + moveX + imageSize > this.ctx.canvas.width ||
      this.x + moveX - imageSize <= 0
    )
      return;
    if (
      this.y - moveY + imageSize > this.ctx.canvas.height ||
      this.y - moveY - imageSize <= 0
    )
      return;

    if (this.isPenDown) {
      this.lines.push({
        startX: this.x,
        startY: this.y,
        endX: this.x + moveX,
        endY: this.y - moveY,
        color: this.penColor,
        width: this.penWidth,
      });
    }

    this.x += moveX;
    this.y -= moveY;
  }

  drawScene() {
    this.clearCanvas();
    this.drawLines();
    this.drawTurtle();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  turnLeft(degrees: number) {
    this.direction -= degrees * (Math.PI / 180);
  }

  turnRight(degrees: number) {
    this.direction += degrees * (Math.PI / 180);
  }

  setDirection(degrees: number) {
    this.direction = degrees * (Math.PI / 180);
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  penUp() {
    this.isPenDown = false;
  }

  penDown() {
    this.isPenDown = true;
  }

  setPenColor({
    r,
    g,
    b,
  }: {
    r: number | string;
    g: number | string;
    b: number | string;
  }) {
    this.penColor = `rgb(${r},${g},${b})`;
    this.ctx.strokeStyle = this.penColor;
  }

  setPenWidth(width: number) {
    this.penWidth = width;
    this.ctx.lineWidth = this.penWidth;
  }

  reset() {
    this.center();
    this.direction = 0;
    this.lines = [];
    this.drawScene();
  }

  center() {
    this.x = this.ctx.canvas.width / 2;
    this.y = this.ctx.canvas.height / 2;
  }

  private drawLines() {
    this.lines.forEach((line) => {
      this.ctx.beginPath();
      this.ctx.moveTo(line.startX, line.startY);
      this.ctx.lineTo(line.endX, line.endY);
      this.ctx.strokeStyle = line.color;
      this.ctx.lineWidth = line.width;
      this.ctx.stroke();
    });
  }
}
