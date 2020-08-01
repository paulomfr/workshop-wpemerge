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
import Loader from '../loader';
import PostCard from './post-card';
import PostCategories from './post-categories';

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
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [customParams, setCustomParams] = useState({});
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(PAGINATION);

  /**
   * Load posts.
   * This will load posts based on params and by default
   * setting the current page equal to 1.
   */
  const loadPosts = (params = {}) => {
    setIsLoading(true);
    setCustomParams(params);

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
        current: 1,
        totalPages,
      }));

      setIsLoading(false);
    });
  };

  const loadMorePosts = () => {
    setIsLoadingMore(true);

    const nextPage = pagination.current + 1;

    apiFetch({
      parse: false,
      path: addQueryArgs('/wp/v2/posts', {
        ...POSTS_QUERY,
        ...customParams,
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

      setIsLoadingMore(false);
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

        <PostCategories loadPosts={loadPosts} />

        {isLoading
          ? (
            <div className="loading">
              <Loader />
            </div>
          ) : (
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
              disabled={isLoadingMore}
              type="button"
              onClick={() => loadMorePosts()}
              className="btn btn-primary btn-load"
            >
              {isLoadingMore ? 'Carregando' : 'Carregar mais'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
