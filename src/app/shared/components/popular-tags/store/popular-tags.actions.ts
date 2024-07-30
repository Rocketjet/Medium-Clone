import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PopularTagType } from 'src/app/shared/types/popular-tag.type';

export const popularTagsActions = createActionGroup({
  source: 'popular-tags',
  events: {
    getTags: emptyProps(),
    getTagsSuccess: props<{ tags: PopularTagType[] }>(),
    getTagsFailure: emptyProps(),
  },
});
