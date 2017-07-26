import { configure } from '@storybook/react';

// Load global styles before anything else.
import '../app/shared/css/normalize.css';

// Load the stories from app/**/*.story.js files.
const req = require.context('../app/', true, /\.story\.js$/);

configure(() => {
  req.keys().forEach(req);
}, module);
