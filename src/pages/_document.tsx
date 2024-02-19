import Document, { Head, Html, Main, NextScript } from "next/document"
import Image from "next/image"
import React from "react"

class DiscoverVetDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang="en-GB" className="h-full">
        <Head>
          <link href="/brand/dv-favicon.png" rel="icon" />
          <link rel="stylesheet" href="/loader.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
            rel="preload"
            as="style"
          />
          <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
        </Head>
        <body className="h-full m-0">
          {/* <div id="preload-01" /> */}
          <div className="loader">
            <div className="inner">
              <Image
                alt="discovervet logo"
                src="/brand/dv-dark-logo.png"
                width="0"
                height="0"
                sizes="100vw"
                className="w-36 sm:w-48 h-6 sm:h-8"
                priority
              />
              <ul className="spinner">
                <li className="one" />
                <li className="two" />
                <li className="three" />
                <li className="four" />
              </ul>
            </div>
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default DiscoverVetDocument
