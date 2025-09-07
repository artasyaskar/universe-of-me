import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeSnippetProps {
  language: string;
  code: string;
}

const CodeSnippet = ({ language, code }: CodeSnippetProps) => {
  return (
    <div className="rounded-lg overflow-hidden my-4">
      <SyntaxHighlighter language={language} style={vscDarkPlus} showLineNumbers>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
