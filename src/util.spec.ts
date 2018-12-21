// @ts-ignore
import * as showdownHighlight from 'showdown-highlight';
import { getShowdownConfig } from './util';

describe('util', () => {
  it('getShowdownConfig', () => {
    const userConfig = {
      simplifiedAutoLink: false,
      tables: false,
      tablesHeaderId: false,
    };
    const finalConfig = getShowdownConfig(userConfig);
    const expectedConfig = {
      parseImgDimensions: true,
      simplifiedAutoLink: false,
      literalMidWordUnderscores: true,
      strikethrough: true,
      tables: false,
      tablesHeaderId: false,
      tasklists: true,
      disableForced4SpacesIndentedSublists: true,
      extensions: [showdownHighlight],
    };

    expect(finalConfig).toEqual(expectedConfig);
  });
});
