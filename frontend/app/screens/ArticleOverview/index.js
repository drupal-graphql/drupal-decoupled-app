// @flow

import universal from 'react-universal-component';
import { withPreloading } from 'react-preload-universal-component';

export default withPreloading(universal(import('ArticleOverview/component')));
