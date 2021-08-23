import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

const GET_NEWS_BY_USER = gql`
query($byUserUser: String!) {
  byUser(user: $byUserUser) {
    _id
    status
    title
    description
    category
    permanlink
    date
    category_id
    user_id
    resource_id
  }
}`;

const GET_NEWS_BY_CATEGORY = gql`
query($byCategoryCat: String!, $byCategoryUser: String!) {
  byCategory(cat: $byCategoryCat, user: $byCategoryUser) {
    _id
    status
    title
    description
    category
    permanlink
    date
    resource_id
    user_id
    category_id
  }
}`;

const GET_NEWS_BY_TAG = gql`
query($byTagUser: String!, $byTagTag: String) {
  byTag(user: $byTagUser, tag: $byTagTag) {
    _id
    title
    status
    description
    category
    permanlink
    date
    resource_id
    user_id
    category_id
  }
}`;

const GET_NEWS_BY_INPUT = gql`
query($byInputData: String!, $byInputUser: String!) {
  byInput(data: $byInputData, user: $byInputUser) {
    _id
    status
    title
    description
    category
    permanlink
    date
    resource_id
    user_id
    category_id
  }
}
`;

const GET_TAGS = gql`
query($byUserUser: String!) {
  byUser(user: $byUserUser) {
    category
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(private apollo:Apollo) { }

  getNewsbyUser(id:any): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_NEWS_BY_USER,
      variables:{
        byUserUser : id,
      },
    }).valueChanges;
  }

  getNewsbyCategory(id_category:any, id_user:any): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_NEWS_BY_CATEGORY,
      variables:{
        byCategoryCat : id_category,
        byCategoryUser : id_user,
      },
    }).valueChanges;
  }

  getTags(id_user:any): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_TAGS,
      variables:{
        byUserUser : id_user,
      },
    }).valueChanges;
  }

  getNewsbyTag(tag:any, id_user:any): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_NEWS_BY_TAG,
      variables:{
        byTagUser : id_user,
        byTagTag : tag,
      },
    }).valueChanges;
  }

  getNewsbyInput(input:any, id_user:any): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_NEWS_BY_INPUT,
      variables:{
        byInputData : input,
        byInputUser : id_user,
      },
    }).valueChanges;
  }
}
