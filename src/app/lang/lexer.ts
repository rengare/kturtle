import { Token, TokenType } from 'src/app/models';


export const lexer = (input: string): Token[] => {
  const WHITESPACE = /\s/;
  const NUMBERS = /[0-9]/;
  const LETTERS = /[a-z]/i;

  const tokens: Token[] = [];
  let current = 0;

  const handleWhiteSpace = (char: string) => {
    if (!WHITESPACE.test(char)) return false;
    current++;
    return true;
  };

  const isCurrentLowerThanInputLength = () => current < input.length;

  const handleLetters = (char: string) => {
    if (!LETTERS.test(char)) return false;
    let value = '';
    while (LETTERS.test(char) && isCurrentLowerThanInputLength()) {
      value += char;
      char = input[++current];
    }
    tokens.push({ type: TokenType.COMMAND, value });
    return true;
  };

  const handleNumbers = (char: string) => {
    if (!NUMBERS.test(char)) return false;
    let value = '';
    while (NUMBERS.test(char) && isCurrentLowerThanInputLength()) {
      value += char;
      char = input[++current];
    }
    tokens.push({ type: TokenType.NUMBER, value: Number(value) });
    return true;
  };

  while (isCurrentLowerThanInputLength()) {
    let char = input[current];
    const result = [
      handleWhiteSpace(char),
      handleNumbers(char),
      handleLetters(char),
    ];

    if (!result.find((x) => Boolean(x)))
      throw new TypeError('I dont know what this character is: ' + char);
  }

  return tokens;
};
