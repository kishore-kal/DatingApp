import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { PaginationResult } from "../_models/pagination";

export function getPaginatedResult<T>(url, params, http: HttpClient) {
  const paginatedResult: PaginationResult<T> = new PaginationResult<T>();
  return http.get<T>(url ,{ observe: 'response', params }).pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}

export function getPaginationHeader(pageNumber: number, pageSize: number){
  let params = new HttpParams();

  params = params.append('pagenumber', pageNumber.toString());
  params = params.append('pageSize', pageSize.toString());

  return params;
}
