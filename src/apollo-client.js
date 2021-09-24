import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://choice-tuna-87.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret':
      'A0GT6fFmS482POTNLS3JezsL3KeA0OG0O9g7xbgVff3qg5Z3mOY9A2I2W98kX9Q1',
  },
  cache: new InMemoryCache(),
});

export default client;
