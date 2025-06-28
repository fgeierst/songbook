import styles from "./Document.css?url";

export const Document: React.FC<{ children: React.ReactNode; ctx: any }> = ({
  children,
  ctx,
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Songbook</title>
      <link rel="stylesheet" href={styles} />
      <link rel="modulepreload" href="/src/client.tsx" />
    </head>
    <body>
      <header>
        <h1><a href="/">Songbook</a></h1>
        <nav>
          {ctx.isEditor && ctx.user ? (
            <button type="submit" form="editor-form" className="btn btn-primary save-btn">
              Save
            </button>
          ) : (
            <>
              {ctx.user && <a href="/new" className="btn btn-primary">New</a>}
              {ctx.user ? (
                <a href="/user/logout">Logout</a>
              ) : (
                <a href="/user/login">Login</a>
              )}
            </>
          )}
        </nav>
      </header>
      <div id="root">{children}</div>
      <script>import("/src/client.tsx")</script>
    </body>
  </html>
);
