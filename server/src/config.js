import "./boot.js";
import getNodeEnv from "./config/getNodeEnv.js";
import getDatabaseUrl from "./config/getDatabaseUrl.cjs";

export default {
  nodeEnv: getNodeEnv(),
  session: { secret: process.env.SESSION_SECRET },
  clientId: process.env.gitHubID,
  clientSecret: process.env.gitHubClientSecret,
  gitHubCallBackUrl: process.env.gitHubCallBackUrl,
  twitchId: process.env.twitchId,
  twitchToken: process.env.twitchToken,
  databaseUrl: getDatabaseUrl(getNodeEnv()),
  web: { host: process.env.HOST || "0.0.0.0", port: process.env.PORT || 3000 }
};
