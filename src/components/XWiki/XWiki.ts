import Component from '@biotope/element';
import template from './template';

import { ApolloClient } from 'apollo-boost';
import gql from 'graphql-tag';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
 

const httpLink = createHttpLink({
    uri: 'https://graphql.contentful.com/content/v1/spaces/f7lhvowaprbt/environments/master',
  });
  
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = '675043ce0bcd687180f44ca46d7e3c3bf30040b0b42268cc0607d36d89ff0783';
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      }
    }
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });




interface XWikiProps {
    items
}

interface XWikiState {
    items: any
}


 function returnJson() {
    return client.query({
        query: gql`query {
            funnyNewsCollection {
              items {
                title
              }
            }
          }
        `,
      })
      .then(res => res); 
}

class XWiki extends Component< XWikiProps, XWikiState > {
    static componentName = 'x-wiki';

    connectedCallback() {
        returnJson().then(data => {
            this.setState({items: data})
        })
    }
    get defaultState() {
        return{
            items: []
        }
    }
    render() {

        const {
            items,
          } = this.props;
        
    const renderProps: XWikiProps = {
        items: this.state.items
    }
    console.log(renderProps);
    return template(this.html, renderProps);
    }
}

export default XWiki;