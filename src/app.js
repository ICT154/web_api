const Hapi = require("@hapi/hapi");

const api_kontan = require("./kontan");
const api_bisnis = require("./bisnis");
const api_investor = require("./investor");

const port_ = process.env.PORT || 3000

const init = async () => {
  const server = Hapi.server({
    port: port_,
    host: "localhost"
  });

  // server.route({
  //   method: "GET",
  //   path: "/",
  //   handler: async (request, h) => {
  //     const result = await scrapSteam();
  //     return result;
  //   }
  // });

  server.route({
    method: "GET",
    path: "/bisnis",
    handler: async (request, h) => {
      const result = await api_bisnis();
      return result;
    }
  });

  server.route({
    method: "GET",
    path: "/kontan",
    handler: async (request, h) => {
      const result = await api_kontan();
      return result;
    }
  });

  server.route({
    method: "GET",
    path: "/investor",
    handler: async (request, h) => {
      const result = await api_investor();
      return result;
    }
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
