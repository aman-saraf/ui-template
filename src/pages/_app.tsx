import "src/styles/globals.css"

import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material"
import { AppProps } from "next/app"
import Head from "next/head"
import { useEffect, useState, useMemo } from "react"

import { green } from "tailwindcss/colors"
import { AppPropsWithLayout } from "@/types/next"
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Layout } from "@/components/organisms/Layout"
import { deserialize } from "superjson"

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false // removes the `xs` breakpoint
    sm: false
    md: false
    lg: false
    xl: false
    mobile: true // adds the `mobile` breakpoint
    desktop: true
  }
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4d61fc",
    },
    secondary: {
      main: "#0f897c",
    },
    success: {
      main: green[700],
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      desktop: 1024,
    },
  },
  typography: {
    allVariants: {
      fontFamily: "'Lato', sans-serif",
      fontSize: 16,
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiAccordion: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
})

function DiscoverVetApp({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.classList.add("loaded")
    }
  }, [])

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10 * 60 * 1000, // 10 minutes,
            cacheTime: 15 * 60 * 1000, // 15 minutes
          },
        },
      })
  )

  const fixedPageProps = useMemo(
    () =>
      deserialize({
        json: pageProps,
        // eslint-disable-next-line no-underscore-dangle
        meta: pageProps._superjson,
      }) as AppProps["pageProps"],
    [pageProps]
  )

  const getLayout = Component.getLayout ?? ((page) => <Layout> {page} </Layout>)

  return (
    <>
      <Head>
        <title> DiscoverVet Consult </title>
      </Head>

      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={fixedPageProps.dehydratedState}>
              {getLayout(<Component {...fixedPageProps} />)}
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </Hydrate>
          </QueryClientProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  )
}

export default DiscoverVetApp
