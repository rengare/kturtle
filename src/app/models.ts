export enum TokenType {
  COMMAND,
  NUMBER,
  NOT_FOUND = 'Not found',
}

export type TokenValueType = string | number;

export interface Token {
  type: TokenType;
  value: TokenValueType;
}

export type CommandWithExample = {
  command: string;
  example: string;
};

export type Command =
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
  | { type: 'pencolor'; value: number[] }
  | { type: TokenType.NOT_FOUND };
