import { Chance } from 'chance';
import { lexer, TokenType } from './lexer';
import { parse } from './parser';

const chance = new Chance();

describe('Lexer', () => {
  const color = chance.integer({ min: 0, max: 255 });
  const degrees = chance.integer({ min: 0, max: 360 });

  [
    {
      input: `pencolor ${color} ${color} ${color}`,
      result: [
        { type: TokenType.COMMAND, value: 'pencolor' },
        { type: TokenType.NUMBER, value: color },
        { type: TokenType.NUMBER, value: color },
        { type: TokenType.NUMBER, value: color },
      ],
    },
    {
      input: 'forward',
      result: [{ type: TokenType.COMMAND, value: 'forward' }],
    },
    {
      input: `turnleft ${degrees}`,
      result: [
        {
          type: TokenType.COMMAND,
          value: 'turnleft',
        },
        {
          type: TokenType.NUMBER,
          value: degrees,
        },
      ],
    },
  ].forEach(({ input, result }) => {
    it(`should tokenize an input: ${input}`, () => {
      expect(lexer(input)).toEqual(result);
    });
  });
});

describe('Parser', () => {
  const color = chance.integer({ min: 0, max: 255 });
  const degrees = chance.integer({ min: 0, max: 360 });

  [
    {
      input: 'forward',
      result: { type: 'forward' },
    },
    {
      input: `turnleft ${degrees}`,
      result: {
        type: 'turnleft',
        value: degrees,
      },
    },
    {
      input: `pencolor ${color} ${color} ${color}`,
      result: {
        type: 'pencolor',
        value: [color, color, color],
      },
    },
    {
      input: `pencolor ${color}`,
      result: {
        type: 'pencolor',
        value: [color, 0, 0],
      },
    },
    {
      input: `pencolor`,
      result: {
        type: 'pencolor',
        value: [0, 0, 0],
      },
    },
  ].forEach(({ input, result }) => {
    it(`should parse a token: ${input}`, () => {
      expect(parse(lexer(input))).toEqual(result as any);
    });
  });
});
