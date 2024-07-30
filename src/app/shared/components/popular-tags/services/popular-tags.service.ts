import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { apiTags } from 'src/environments/environment.development';
import { TagsResponse } from '../interfaces/tags-response.interface';
import { PopularTagType } from 'src/app/shared/types/popular-tag.type';

@Injectable({
  providedIn: 'root',
})
export class PopularTagService {
  private readonly http = inject(HttpClient);

  getTags(): Observable<PopularTagType[]> {
    const { API_HOST_URL, TAGS } = apiTags;
    const url = `${API_HOST_URL}/${TAGS}`;
    return this.http
      .get<TagsResponse>(url)
      .pipe(map((response) => response.tags));
  }
}
