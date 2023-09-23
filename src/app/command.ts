import { Turtle } from './turtle';

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

const getNumber = (command: string): number => {
  const [_, degrees] = command.split(' ');
  return Number(degrees || 1);
};

const commandHandlers: {
  [key in string]: (turtle: Turtle, command: any) => void;
} = {
  forward: (t) => t.forward(),
  backward: (t) => console.log('tbd'),
  turnleft: (t, c: string) => t.turnLeft(getNumber(c)),
  turnright: (t, c: string) => t.turnRight(getNumber(c)),
  direction: (t, c: string) => t.setDirection(getNumber(c)),
  center: (t) => t.center(),
  go: (t, c: string) => {
    const [_, x, y] = c.split(' ');
    t.penUp();
    if (!x || !y) {
      t.center();
      return;
    }
    t.setX(Number(x));
    t.setY(Number(y));
  },
  gox: (t, c: string) => t.setX(getNumber(c)),
  goy: (t, c: string) => t.setY(getNumber(c)),
  penup: (t) => t.penUp(),
  pendown: (t) => t.penDown(),
  penwidth: (t, c: string) => t.setPenWidth(getNumber(c)),
  pencolor: (t, c: string) => {
    const [_, r, g, b] = c.split(' ');
    if (!r || !g || !b) return;

    t.setPenColor({ r, g, b });
  },
};

export function executeCommand(turtle: Turtle, command: string): void {
  if (!command) return;
  const [c, _] = command.split(' ');
  const handler = commandHandlers[c];
  if (handler) {
    handler(turtle, command);
    turtle.drawScene();
  }
}
