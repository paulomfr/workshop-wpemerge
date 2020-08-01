/**
 * WordPress dependencies.
 */
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useEffect, useState } from '@wordpress/element';

import Loader from '../loader';

const CATEGORIES_LIST_QUERY = {
  hide_empty: true,
};

export default function PostCategories({ loadPosts }) {
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesList, setCategoriesList] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(0);

  const loadCategories = () => {
    apiFetch({
      path: addQueryArgs('/wp/v2/categories', CATEGORIES_LIST_QUERY),
    }).then((categories) => {
      setCategoriesList(categories);
      setIsLoading(false);
    });
  };

  const onSelectCategory = (categoryId) => {
    setActiveCategoryId(categoryId || 0);
    loadPosts(categoryId && {
      categories: categoryId,
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <nav className="posts__categories">
      <button type="button" onClick={() => onSelectCategory()} className={`posts__term ${activeCategoryId === 0 ? 'is-active' : ''}`}>Todos</button>

      {isLoading
        ? (
          <span className="loader-spinner">
            <Loader />
          </span>
        ) : (
          categoriesList.map(({ id, name, color }) => (
            <button
              key={id}
              type="button"
              onClick={() => onSelectCategory(id)}
              style={{
                color,
                borderColor: color,
                backgroundColor: activeCategoryId === id ? color : 'rgba(0, 0, 0, 0)',
              }}
              className={`posts__term ${activeCategoryId === id ? 'is-active' : ''}`}
            >
              {name}
            </button>
          ))
        )}
    </nav>
  );
}
