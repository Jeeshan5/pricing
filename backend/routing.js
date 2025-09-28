import config from "./config.js";

/**
 * Determines which version (blue/green) to serve for a client.
 * Supports cookie-based, percentage-based, header-based, and IP-based routing.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {"blue" | "green"} version
 */
export function selectVersion(req, res) {
  let version;

  switch (config.routingStrategy) {
    case "cookie": {
      // Sticky session: serve same version based on cookie
      version = req.cookies[config.cookieName];
      if (!version) {
        version = "blue"; // default for new clients
        res.cookie(config.cookieName, version, { httpOnly: true });
      }
      break;
    }

    case "percentage": {
      // Random traffic split based on percentage
      const rand = Math.random() * 100;
      version = rand < config.percentageSplit.blue ? "blue" : "green";

      // Stick this choice via cookie if not already set
      if (!req.cookies[config.cookieName]) {
        res.cookie(config.cookieName, version, { httpOnly: true });
      }
      break;
    }

    case "header": {
      // Version selected via request header "x-version"
      const headerVersion = req.headers["x-version"];
      version = headerVersion === "green" ? "green" : "blue";
      break;
    }

    case "ip": {
      // Version determined from client IP (even = blue, odd = green)
      const ipNumeric = req.ip.replace(/[:.]/g, "");
      const ipInt = parseInt(ipNumeric, 10);
      version = isNaN(ipInt) ? "blue" : (ipInt % 2 === 0 ? "blue" : "green");

      // Stick this choice via cookie if not already set
      if (!req.cookies[config.cookieName]) {
        res.cookie(config.cookieName, version, { httpOnly: true });
      }
      break;
    }

    default:
      // Fallback version
      version = "blue";
      break;
  }

  return version;
}
