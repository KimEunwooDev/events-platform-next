import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eonecllqfzheyldjevaq.supabase.co",
        pathname: "/storage/v1/object/public/event_images/**",
      },
    ],
    domains: ["eonecllqfzheyldjevaq.supabase.co"], // ✅ 여전히 필요함!
  },
};

export default nextConfig;
