import withBundleAnalyzer from "@next/bundle-analyzer"
import withPlugins from "next-compose-plugins"

const config = withPlugins(
  [
    [
      withBundleAnalyzer({
        enabled: process.env.ANALYZE,
      }),
    ],
  ],
  {
    reactStrictMode: true,
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
    experimental: { instrumentationHook: true },
    rewrites() {
      return [
        { source: "/healthz", destination: "/api/health" },
        { source: "/api/healthz", destination: "/api/health" },
        { source: "/health", destination: "/api/health" },
        { source: "/ping", destination: "/api/health" },
      ]
    },
    webpack: (config, { dev }) => {
      if (!dev) {
        config.devtool = false // Disable source maps in production
      }
      return config
    },
    typescript: {
      ignoreBuildErrors: true, // Disable type checking during the build
    },
    output: "export",
  }
)

export default {
  ...config,
  async headers() {
    return [
      {
        source: "/game/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
          },
        ],
      },
    ]
  },
}
