import { render } from '@wordpress/element';

import Posts from './posts';

window.addEventListener('DOMContentLoaded', () => {
  const htmlElement = document.getElementById('root-wpemerge');

  render(<Posts />, htmlElement);
});
