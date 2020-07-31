/**
 * WordPress dependencies.
 */
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import { transformPost } from '@scripts/frontend/utils/transforms';
import PostCard from './post-card';

/**
 * Constants.
 */
const POSTS_QUERY = {
  per_page: 3,
  _embed: true,
};

const PAGINATION = {
  current: 1,
  totalPages: 1,
};

export default function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(PAGINATION);

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
      const totalPages = parseInt(response.headers.get('X-WP-TotalPages'), 10); // 2

      const postsHandled = postsList.map(transformPost);

      setPosts(postsHandled);
      setPagination((oldPagination) => ({
        ...oldPagination,
        totalPages,
      }));

      setIsLoading(false);
    });
  };

  const loadMorePosts = () => {
    setIsLoading(true);

    const nextPage = pagination.current + 1;

    apiFetch({
      parse: false,
      path: addQueryArgs('/wp/v2/posts', {
        ...POSTS_QUERY,
        page: nextPage,
      }),
    }).then(async (response) => {
      const postsList = await response.json();

      const postsHandled = postsList.map(transformPost);

      setPosts([
        ...posts,
        ...postsHandled,
      ]);
      setPagination((oldPagination) => ({
        ...oldPagination,
        current: nextPage,
      }));

      setIsLoading(false);
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

        {isLoading ? <div className="loading">Carregando</div> : (
          <ul className="posts__list">
            {posts.map(({ id, ...post }) => (
              <li key={id} className="posts__item">
                <PostCard {...post} />
              </li>
            ))}
          </ul>
        )}

        {pagination.current < pagination.totalPages && (
          <div className="posts__footer">
            <button
              disabled={isLoading}
              type="button"
              onClick={() => loadMorePosts()}
              className="btn btn-primary btn-load"
            >
              {isLoading ? 'Carregando' : 'Carregar mais'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
