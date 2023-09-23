import { CommandWithExample } from 'src/app/models';

export const AVAILABLE_COMMANDS: CommandWithExample[] = [
  { command: 'forward', example: 'forward' },
  { command: 'backward', example: 'backward' },
  { command: 'turnleft', example: 'turnleft 45' },
  { command: 'turnright', example: 'turnright 45' },
  { command: 'direction', example: 'direction 90' },
  { command: 'center', example: 'center' },
  { command: 'go', example: 'go 50 100' },
  { command: 'gox', example: 'gox 50' },
  { command: 'goy', example: 'goy 100' },
  { command: 'penup', example: 'penup' },
  { command: 'pendown', example: 'pendown' },
  { command: 'penwidth', example: 'penwidth 3' },
  { command: 'pencolor', example: 'pencolor 255 0 0' }, // RGB for red color
];
