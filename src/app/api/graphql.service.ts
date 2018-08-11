import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GraphQLService {
  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    this.apollo.create({
      link: httpLink.create({ uri: `${environment.graphqlUrl}/v1/mie/Query` }),
      cache: new InMemoryCache()
    });
  }

  getMarketPositions() {
    return this.apollo.watchQuery({
      query: gql`
        query {
          MarketPositions(from_year: 2018, to_year: 2018) {
            shortName
            longName
            entities {
              companyName
              positions {
                values
              }
            }
          }
        }
      `
    }).valueChanges;
  }

  getMarketPositionsOverTime() {
    return this.apollo.watchQuery({
      query: gql`
        query {
          MarketPositionsOverTime {
            shortName
            longName
            entities {
              companyName
              positions {
                years
                values
              }
            }
          }
        }
      `
    }).valueChanges;
  }

  getMarketPositionsOverTimeDetails(limit: number, offset: number) {
    return this.apollo.watchQuery({
      query: gql`
        query {
          MarketPositionsOverTimeDetails(limit:${limit},offset:${offset}) {
            shortName
            longName
            entities {
              companyName
              positions {
                years
                values
              }
            }
          }
        }
      `
    }).valueChanges;
  }

}
