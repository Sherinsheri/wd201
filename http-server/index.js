const http = require("http");
const fs = require("fs");
const minimist = require("minimist");
const { argv } = require("process");

const args=minimist(process.argv.slice(2));
const PORT=args.port || 3000;

// fs.readFile("home.html", (err, home) => {
//   console.log(home.toString());
// });

let homeContent = "";
let projectContent = "";
let regContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("registration.html", (err, reg) => {
  if (err) {
    throw err;
  }
  regContent = reg;
});
http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/registration":
        response.write(regContent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
