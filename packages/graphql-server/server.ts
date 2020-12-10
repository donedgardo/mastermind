import express from 'express';
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL,
} from 'graphql-helix';
import { execute, GraphQLError, subscribe } from 'graphql';
import { createServer } from 'graphql-ws/lib/server';
import { schema } from './schema';
import { Context, defaultContext } from './context';

const app = express();

app.use(express.json());

app.use('/graphql', async (req, res) => {
  const request = {
    body: req.body,
    headers: req.headers,
    method: req.method,
    query: req.query,
  };
  if (shouldRenderGraphiQL(request)) {
    res.send(
      renderGraphiQL({ subscriptionsEndpoint: 'ws://localhost:4000/graphql' }),
    );
  }
  const { operationName, query, variables } = getGraphQLParameters(request);

  const result = await processRequest({
    operationName,
    query,
    variables,
    request,
    schema,
    contextFactory: (): Context => defaultContext,
  });

  // processRequest returns one of three types of results depending on how the server should respond
  // 1) RESPONSE: a regular JSON payload
  // 2) MULTIPART RESPONSE: a multipart response (when @stream or @defer directives are used)
  // 3) PUSH: a stream of events to push back down the client for a subscription
  if (result.type === 'RESPONSE') {
    result.headers.forEach(({ name, value }) => res.setHeader(name, value));
    res.status(result.status);
    res.json(result.payload);
  } else if (result.type === 'MULTIPART_RESPONSE') {
    res.writeHead(200, {
      Connection: 'keep-alive',
      'Content-Type': 'multipart/mixed; boundary="-"',
      'Transfer-Encoding': 'chunked',
    });

    req.on('close', () => {
      result.unsubscribe();
    });

    res.write('---');

    await result.subscribe((result) => {
      const chunk = Buffer.from(JSON.stringify(result), 'utf8');
      const data = [
        '',
        'Content-Type: application/json; charset=utf-8',
        'Content-Length: ' + String(chunk.length),
        '',
        chunk,
      ];

      if (result.hasNext) {
        data.push('---');
      }

      res.write(data.join('\r\n'));
    });

    res.write('\r\n-----\r\n');
    res.end();
  } else {
    res.status(422);
    res.json({
      errors: [
        new GraphQLError('Subscriptions should be sent over WebSocket.'),
      ],
    });
  }
});

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  createServer(
    {
      schema,
      execute,
      subscribe,
      context: (): Context => defaultContext,
    },
    {
      server,
      path: '/graphql',
    },
  );

  console.log(`GraphQL server is running on port ${port}.`);
});
