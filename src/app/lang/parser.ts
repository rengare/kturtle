import { TokenType, Token } from './lexer';

export type CommandWithType = { type: string };
export type CommandWithNumberValue = { value: number } & CommandWithType;
export type CommandWithListValue = { value: number[] } & CommandWithType;

type Command =
  | { type: 'forward' }
  | { type: 'backward' }
  | { type: 'center' }
  | { type: 'penup' }
  | { type: 'pendown' }
  | { type: 'turnleft'; value: number }
  | { type: 'turnright'; value: number }
  | { type: 'direction'; value: number }
  | { type: 'penwidth'; value: number }
  | { type: 'gox'; value: number }
  | { type: 'goy'; value: number }
  | { type: 'go'; value: number[] }
  | { type: 'pencolor'; value: number[] };

export const parse = (tokens: Token[]): Command => {
  let current = 0;
  while (current < tokens.length) {
    const token = tokens[current];
    if (TokenType.COMMAND !== token.type)
      throw new TypeError(`Unexpected token type: ${token.type}`);

    switch (token.value) {
      case 'pencolor':
        return {
          type: token.value,
          value: [
            (tokens[++current]?.value as number) ?? 0,
            (tokens[++current]?.value as number) ?? 0,
            (tokens[++current]?.value as number) ?? 0,
          ],
        };
      case 'turnleft' ||
        'turnright' ||
        'direction' ||
        'penwidth' ||
        'gox' ||
        'goy':
        return {
          type: token.value,
          value: (tokens[++current]?.value as number) ?? 0,
        };
      case 'go':
        return {
          type: token.value,
          value: [
            (tokens[++current]?.value as number) ?? 0,
            (tokens[++current]?.value as number) ?? 0,
          ],
        };
      default:
        return { type: token.value as any };
    }
  }

  throw new TypeError('Command not found');
};
