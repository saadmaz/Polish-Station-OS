// Cloudflare Worker in front of the Polish Station OS container. Every
// request is forwarded to the Node server in the container (see Dockerfile and
// server.mjs). Runtime secrets are Worker secrets, passed to the container as
// environment variables.
import { Container, getContainer } from "@cloudflare/containers";

interface Env {
  POS_SERVER: DurableObjectNamespace<PosServer>;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_PRIVATE_KEY: string;
  RESEND_API_KEY?: string;
  LEADS_NOTIFY_EMAIL?: string;
  GOOGLE_ADS_LEAD_WEBHOOK_KEY?: string;
}

export class PosServer extends Container<Env> {
  defaultPort = 8080;
  // Keep the instance warm through a working shift; it sleeps when idle.
  sleepAfter = "30m";

  constructor(ctx: DurableObjectState<Env>, env: Env) {
    super(ctx, env);
    this.envVars = {
      NODE_ENV: "production",
      PORT: "8080",
      FIREBASE_PROJECT_ID: env.FIREBASE_PROJECT_ID,
      FIREBASE_CLIENT_EMAIL: env.FIREBASE_CLIENT_EMAIL,
      FIREBASE_PRIVATE_KEY: env.FIREBASE_PRIVATE_KEY,
      RESEND_API_KEY: env.RESEND_API_KEY ?? "",
      LEADS_NOTIFY_EMAIL: env.LEADS_NOTIFY_EMAIL ?? "",
      GOOGLE_ADS_LEAD_WEBHOOK_KEY: env.GOOGLE_ADS_LEAD_WEBHOOK_KEY ?? "",
    };
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // One shared instance keeps every till on the same warm server.
    return getContainer(env.POS_SERVER).fetch(request);
  },
};
