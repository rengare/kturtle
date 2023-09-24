export function onMonacoLoad() {
  const monaco = (window as any).monaco;

  monaco.languages.register({ id: 'turtleDSL' });

  monaco.languages.setMonarchTokensProvider('turtleDSL', {
    tokenizer: {
      root: [
        // Define your tokenization rules here
        [
          /[a-z_$][\w$]*/,
          {
            cases: {
              'forward|backward|turnleft|turnright|direction|center|go|gox|goy|penup|pendown|penwidth|pencolor':
                'keyword',
              '@default': 'identifier',
            },
          },
        ],
        [/[0-9]+/, 'number'],
        [/[,]/, 'delimiter'],
      ],
    },
  });

  monaco.languages.registerCompletionItemProvider('turtleDSL', {
    provideCompletionItems: function () {
      return {
        suggestions: [
          {
            label: 'forward',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'forward;',
            documentation: 'Move forward by the specified number of steps',
          },
          {
            label: 'backward',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'backward;',
            documentation: 'Move backward by the specified number of steps',
          },
          {
            label: 'turnleft',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'turnleft ${1:degrees};',
            documentation: 'Turn left by the specified number of degrees',
          },
          {
            label: 'turnright',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'turnright ${1:degrees};',
            documentation: 'Turn right by the specified number of degrees',
          },
          {
            label: 'direction',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'direction ${1:degrees};',
            documentation: 'Set direction to a specific angle',
          },
          {
            label: 'center',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'center;',
            documentation: 'Move the turtle to the center of the canvas',
          },
          {
            label: 'go',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'go ${1:x}, ${2:y};',
            documentation: 'Move to a specific (x, y) position',
          },
          {
            label: 'gox',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'gox ${1:x};',
            documentation: 'Move to a specific x position',
          },
          {
            label: 'goy',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'goy ${1:y};',
            documentation: 'Move to a specific y position',
          },
          {
            label: 'penup',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'penup;',
            documentation: 'Lift the pen up',
          },
          {
            label: 'pendown',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'pendown;',
            documentation: 'Put the pen down',
          },
          {
            label: 'penwidth',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'penwidth ${1:width};',
            documentation: 'Set the pen width',
          },
          {
            label: 'pencolor',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'pencolor ${1:red}, ${2:green}, ${3:blue};',
            documentation: 'Set the pen color using RGB values',
          },
        ],
      };
    },
  });

  monaco.editor.defineTheme('turtleTheme', {
    colors: {},
    base: 'vs',
    inherit: false,
    rules: [
      { token: 'keyword', foreground: '0000FF', fontStyle: 'bold' },
      { token: 'number', foreground: 'FF0000' },
      { token: 'delimiter', foreground: '00FF00' },
    ],
  });

  monaco.editor.setTheme('turtleTheme');

  monaco.languages.registerCompletionItemProvider('turtleDSL', {
    provideCompletionItems: function (model: any, position: any) {
      // Based on the user's position, you can decide what completions to provide.
      return {
        suggestions: [
          {
            label: 'forward',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'forward',
            documentation: 'Move forward by specified steps',
          },
          // ... more completions for other commands
        ],
      };
    },
  });

  console.log(monaco);
}
