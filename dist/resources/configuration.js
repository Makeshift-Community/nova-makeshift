let config;
if (process.env.NODE_ENV === "production") {
    config = (await import("./makeshift.js")).default;
}
else {
    console.log("Loaded configuration for development mode");
    config = (await import("./development.js")).default;
}
export default config;
