import { NhostClient } from '@nhost/react';

const backendUrl = import.meta.env.VITE_NHOST_BACKEND_URL;
const subdomain = import.meta.env.VITE_NHOST_SUBDOMAIN;
const region = import.meta.env.VITE_NHOST_REGION;

if (!backendUrl && !subdomain) {
  throw new Error(
    'Please provide either VITE_NHOST_BACKEND_URL or both VITE_NHOST_SUBDOMAIN and VITE_NHOST_REGION in your .env file'
  );
}

export const nhost = new NhostClient({
  subdomain,
  region,
  backendUrl
});