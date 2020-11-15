import React from 'react'
import NextHead from 'next/head'
import TreeDemo from "../components/TreeDemo"

const Head = React.memo(() =>
  <NextHead>
    <title>Mastermind Game</title>
    <link rel="icon" href="/favicon.ico" />
  </NextHead>
)
export const Home = (): JSX.Element => (
  <div className="container">
    <Head />
    <TreeDemo />
    <footer>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by CarrerasDev
      </a>
    </footer>

    <style jsx>{`
      .container {
        width: 100vw;
        height: 100vh;
      }
     `}
    </style>
    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
)

export default Home
