import { Turtle } from './turtle';
import {
  parse,
  CommandWithType,
  CommandWithNumberValue,
  CommandWithListValue,
} from './lang/parser';
import { lexer } from './lang/lexer';

export const availableCommands = [
  'forward',
  'backward',
  'turnleft',
  'turnright',
  'direction',
  'center',
  'go',
  'gox',
  'goy',
  'penup',
  'pendown',
  'penwidth',
  'pencolor',
];

const commandHandlers: {
  [key in CommandWithType['type']]: (turtle: Turtle, command: any) => void;
} = {
  backward: (t) => console.log('tbd'),
  forward: (t) => t.forward(),
  penup: (t) => t.penUp(),
  pendown: (t) => t.penDown(),
  turnleft: (t, { value }: CommandWithNumberValue) => t.turnLeft(value),
  turnright: (t, { value }: CommandWithNumberValue) => t.turnRight(value),
  direction: (t, { value }: CommandWithNumberValue) => t.setDirection(value),
  penwidth: (t, { value }: CommandWithNumberValue) => t.setPenWidth(value),
  gox: (t, { value }: CommandWithNumberValue) => t.setX(value),
  goy: (t, { value }: CommandWithNumberValue) => t.setY(value),
  center: (t) => t.center(),
  go: (t, { value: [x, y] }: CommandWithListValue) => {
    t.setX(Number(x));
    t.setY(Number(y));
  },
  pencolor: (t, { value: [r, g, b] }) => t.setPenColor({ r, g, b }),
};

const pipe =
  (input: any) =>
  (...fns: Function[]) =>
    fns.reduce((result, fn) => fn(result), input);

export function executeCommand(turtle: Turtle, input: string): void {
  const command: CommandWithType = pipe(input)(lexer, parse);
  const handler = commandHandlers[command.type];
  if (handler) {
    handler(turtle, command);
    turtle.drawScene();
  }
}
