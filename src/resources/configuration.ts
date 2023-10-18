/*
console.log("Running in development mode");
export * from "./development.js";
//*/

//*
if (process.env.NODE_ENV !== "production") {
  console.error(
    "Error: Application is configured for production but running in development mode. Exiting.",
  );
  process.exit(2);
}
export * from "./makeshift.js";
//*/
