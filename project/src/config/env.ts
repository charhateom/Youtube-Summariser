export function validateEnv() {
  const requiredVars = {
    VITE_NHOST_SUBDOMAIN: import.meta.env.VITE_NHOST_SUBDOMAIN,
    VITE_NHOST_REGION: import.meta.env.VITE_NHOST_REGION
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env file'
    );
  }
}