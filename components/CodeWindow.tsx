'use client';

const quoted = (value: string) => <i>{JSON.stringify(value)}</i>;

const code = [
  <><b>const</b> <em>sebby</em> = {'{'}</>,
  <>&nbsp;&nbsp;frontend: [{quoted('Next.js')}, {quoted('React')}, {quoted('TypeScript')}],</>,
  <>&nbsp;&nbsp;backend: [{quoted('Node.js')}, {quoted('PostgreSQL')}],</>,
  <>&nbsp;&nbsp;database: [{quoted('Supabase')}, {quoted('SQL')}],</>,
  <>&nbsp;&nbsp;infrastructure: [{quoted('Vercel')}, {quoted('Upstash')}],</>,
  <>&nbsp;&nbsp;tools: [{quoted('Git')}, {quoted('GitHub')}, {quoted('Codex')}],</>,
  <>&nbsp;</>,
  <>&nbsp;&nbsp;interests: [</>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;{quoted('Sports')}, {quoted('Entertainment')},</>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;{quoted('Building things people actually use')}</>,
  <>&nbsp;&nbsp;],</>,
  <>&nbsp;</>,
  <>&nbsp;&nbsp;currentlyBuilding: {quoted('Masterspred')},</>,
  <>&nbsp;&nbsp;status: {quoted('probably debugging something')}</>,
  <>{'}'};</>,
];

export function CodeWindow() {
  return (
    <div className="code-window reveal" aria-label="Sebby's technology stack shown as code">
      <div className="code-chrome">
        <span>sebby.ts</span><span>type: person-ish</span>
      </div>
      <pre>
        <code>
          {code.map((line, index) => (
            <span className="code-line" key={index}>
              <small>{String(index + 1).padStart(2, '0')}</small><span>{line}</span>{index === code.length - 1 && <mark className="caret" />}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
