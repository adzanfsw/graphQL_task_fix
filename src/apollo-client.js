import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink ({
    uri: 'https://choice-tuna-87.hasura.app/v1/graphql',
    headers: {
        'x-hasura-admin-secret': 'A0GT6fFmS482POTNLS3JezsL3KeA0OG0O9g7xbgVff3qg5Z3mOY9A2I2W98kX9Q1',
    }
});

const wsLink = new WebSocketLink ({
    uri: 'wss://choice-tuna-87.hasura.app/v1/graphql',
    options: {
        reconnect: true,
        connectionParams: {
            headers: {
                'x-hasura-admin-secret': 'A0GT6fFmS482POTNLS3JezsL3KeA0OG0O9g7xbgVff3qg5Z3mOY9A2I2W98kX9Q1',
            }
        }
    }
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink
)

const client = new ApolloClient ({
    link: splitLink,
    cache: new InMemoryCache(),
});

export default client