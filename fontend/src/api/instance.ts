import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// import { setContext } from '@apollo/client/link/context';

// const httpLink = createHttpLink({
//   uri: 'http://localhost:3000/graphql',
// });

// const authLink = setContext((_, { headers }) => {
//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImVtYWlsIjoidXNlcjVAZ21haWwuY29tIiwiaWF0IjoxNjk1MjkwOTgzLCJleHAiOjE2OTUzNzczODN9.ULUGUZJP2dcR6T9TQbBCYxGPnhP-WjkQJgsAR03c8is'; // Thay thế yourAccessToken bằng giá trị thực tế của access token
//   return {
//     headers: {
//       ...headers,
//       Authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// export const client = new ApolloClient({
//   link: authLink.concat(httpLink),  
//   cache: new InMemoryCache(),
// });


export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Địa chỉ của API GraphQL
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImVtYWlsIjoidXNlcjVAZ21haWwuY29tIiwiaWF0IjoxNjk1MjkyNDY5LCJleHAiOjE2OTUzNzg4Njl9.nvkAtsgUngbchskjqNOvVcf_FPVKn5EOtgdqxPzpvew`, // Thay thế yourAccessToken bằng giá trị thực tế của access token
  },
});