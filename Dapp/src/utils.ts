// utils.js
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client";

const API_URL = "https://api.lens.dev/";

// `httpLink` our gateway to the Lens GraphQL API. It lets us request for data from the API and passes it forward
const httpLink = new HttpLink({ uri: API_URL });

/* `authLink` takes care of passing on the access token along with all of our requests. We will be using session storage to store our access token. 

The reason why we have to account for an access token is that that's what the Lens API uses to authenticate users. This is the token you'll get back when someone successfully signs in. We need to pass this token along with all the requests we made to the API that *need* authentication.
*/
const authLink = new ApolloLink((operation, forward) => {
  const token = sessionStorage.getItem("accessToken");

  operation.setContext({
    headers: {
      "x-access-token": token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const GET_CHALLENGE = `
    query($request: ChallengeRequest!) {
        challenge(request: $request) { text }
    }
`;

export const generateChallenge = async (address: string) => {
  const res = await apolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address,
      },
    },
  });
  return res.data.challenge.text;
};

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

export const authenticate = async (address: string, signature: any) => {
  const { data } = await apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  });
  return data.authenticate.accessToken;
};

// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// const API_URL = "https://api.lens.dev/";

// export const client = new ApolloClient({
//   uri: API_URL,
//   cache: new InMemoryCache(),
// });

// export const challenge = gql`
//   query Challenge($address: EthereumAddress!) {
//     challenge(request: { address: $address }) {
//       text
//     }
//   }
// `;

// export const authenticate = gql`
//   mutation Authenticate($address: EthereumAddress!, $signature: Signature!) {
//     authenticate(request: { address: $address, signature: $signature }) {
//       accessToken
//       refreshToken
//     }
//   }
// `;
