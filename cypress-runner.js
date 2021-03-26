// const cypress = require("cypress");
// const { app } = require("@demo/web");
// const glob = require("glob");

// const tests = glob.sync("src/cypress/integration/**/*.{js,ts}", {
//   cwd: app.directory,
//   absolute: true,
// });

// export const main = async () => {
//   await app.listen(3000);
//   const result = await cypress.run({
//     spec: tests,
//     reporter: "junit",
//   });

//   return result;
// };

// main().then((result) => {
//   if (result.failures) {
//     console.log("Tests failed");
//     process.exit(1);
//   }

//   process.exit(0);
// });
