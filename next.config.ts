import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"cnd.sanity.io",
      },
    ]
  }
};

export default nextConfig;
