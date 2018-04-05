import OriginalDocument, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import favicon from '~/static/favicon.ico';

// These globals will be injected at run-time, thus allowing
// environment variables to be changed independent of the
// generated build. This is useful e.g. when deploying the
// same container into different environments.
const keys = ['API'];
const globals = keys
  .map(key => `window.__${key}__ = ${JSON.stringify(process.env[key])};`)
  .join(' ');

export default class Document extends OriginalDocument {
  public render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href={favicon} type="image/x-icon" />
        </Head>
        <body>
          <Main />
          {globals && <script dangerouslySetInnerHTML={{ __html: globals }} />}
          <NextScript />
        </body>
      </html>
    );
  }
}
