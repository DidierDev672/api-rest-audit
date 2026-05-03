import { defineConfig } from 'sst';
import { ApiGatewayV2 } from 'sst/aws/apigatewayv2';

export default defineConfig({
  app() {
    return {
      name: "auditory-api",
      home: "aws"
    };
  },
  async run() {
    const api = new ApiGatewayV2("Api");
    api.route("POST /api/v1/research-notes", {
      handler: "src/functions/research-notes/create.handler"
    });
  }
});
