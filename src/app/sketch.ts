import * as p5 from 'p5';
import { Turtle } from './turtle-p5';
import { CommandWithType, parse } from './lang/parser';
import { TokenType } from './models';
import { lexer } from './lang/lexer';

export class Scene {
  turtleImage: p5.Image | undefined;
  turtle: Turtle | undefined;
  canvas: p5 | undefined;

  constructor(
    private width: number,
    private height: number,
  ) {
    this.canvas = new p5(this.createSketch.bind(this));
  }

  createSketch(p: p5) {
    p.preload = () => {
      this.turtleImage = p.loadImage('assets/turtle.jpeg');
    };
    p.setup = () => {
      p.createCanvas(this.width, this.height)
        .parent('scene')
        .style('border', '3px solid black');

      this.turtle = new Turtle(p, this.turtleImage as p5.Image);
    };

    p.draw = () => {
      this.turtle?.draw();
    };
  }

  reset(width: number, height: number) {
    this.turtle?.reset();
    this.canvas?.resizeCanvas(width, height);

    this.width = width;
    this.height = height;
  }

  execute(input: string) {
    if (!this.turtle) return;
    const pipe =
      (input: any) =>
      (...fns: Function[]) =>
        fns.reduce((result, fn) => fn(result), input);

    const command: CommandWithType = pipe(input)(lexer, parse);
    if (command.type === TokenType.NOT_FOUND) return;
    this.turtle.execute(command);
  }
}
