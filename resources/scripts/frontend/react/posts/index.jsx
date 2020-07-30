/**
 * WordPress dependencies.
 */
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useEffect, useState } from '@wordpress/element';

/**
 * Constants.
 */
const POSTS_QUERY = {
  per_page: 3,
  _embed: true,
};

export default function Posts() {
  const [posts, setPosts] = useState([]);

  /**
   * Load posts.
   * This will load posts based on params and by default
   * setting the current page equal to 1.
   */
  const loadPosts = (params = {}) => {
    apiFetch({
      parse: false,
      path: addQueryArgs('/wp/v2/posts', {
        ...POSTS_QUERY,
        ...params,
      }),
    }).then(async (response) => {
      const postsList = await response.json();

      const postsHandled = postsList;

      setPosts(postsHandled);
    });
  };

  /**
   * When component did mount, will execute the
   * useEffect function.
   */
  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <section className="posts">
      <div className="container">
        <h2 className="posts__title">Últimos posts</h2>

        <ul>
          {posts.map(({ id, title }) => (
            <li key={id}>
              <p>{title.rendered}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
