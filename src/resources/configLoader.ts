import Configuration from "./Configuration.js";

let config: Configuration;
if (process.env.NODE_ENV === "production") {
  config = (await import("./makeshift.js")).default;
} else {
  console.log("Running in development mode");
  config = (await import("./development.js")).default;
}

export default config;
