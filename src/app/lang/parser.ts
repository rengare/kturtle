import { AVAILABLE_COMMANDS } from 'src/app/constant';
import { Token, TokenType, TokenValueType } from 'src/app/models';

export type CommandWithType = { type: string };
export type CommandWithListValue = { value: number[] } & CommandWithType;

export const parse = (tokens: Token[]): CommandWithType => {
  if (tokens.length === 0) {
    return <CommandWithType>{ type: TokenType.NOT_FOUND };
  }

  const token: Token = tokens[0];

  if (TokenType.COMMAND !== token.type) {
    throw new TypeError(`Unexpected token type: ${token.type}`);
  }

  if (!AVAILABLE_COMMANDS.find((x) => x.command === token.value)) {
    return <CommandWithType>{ type: TokenType.NOT_FOUND };
  }

  if (token.value === 'pencolor') {
    return <CommandWithListValue>{
      type: token.value,
      value: [
        tokens[1]?.value ?? 0,
        tokens[2]?.value ?? 0,
        tokens[3]?.value ?? 0,
      ],
    };
  }

  if (token.value === 'go') {
    return <CommandWithListValue>{
      type: token.value,
      value: [
        (tokens[1]?.value as number) ?? 0,
        (tokens[2]?.value as number) ?? 0,
      ],
    };
  }

  return <CommandWithListValue>{
    type: token.value,
    value: [(tokens[1]?.value as number) ?? 0],
  };
};
