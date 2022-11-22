const { GraphQLClient } = require('graphql-request');

class Service {
  constructor(API_KEY, ORGANIZATION_ID = '') {
    this.API_KEY = API_KEY;
    this.ORGANIZATION_ID = ORGANIZATION_ID;
    this.endpoint = 'https://app.pipefy.com/queries';
  }

  gqlRequest({ document, variables }) {
    const client = new GraphQLClient(this.endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.API_KEY}`
      }
    });

    return client.request(document, variables);
  }
}

module.exports = { PipefyService: Service };
