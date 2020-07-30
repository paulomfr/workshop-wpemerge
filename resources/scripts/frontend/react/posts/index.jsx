import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useEffect, useState, Component } from '@wordpress/element';

// class Posts extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       postsList: [],
//     };
//   }

//   componentDidMount() {
//     apiFetch({
//       path: addQueryArgs('/wp/v2/posts', {
//         _embed: true,
//         _fields: 'title,content,id',
//       }),
//     }).then((postsList) => {
//       this.setState({
//         postsList,
//       });
//     });
//   }

//   render() {
//     const { postsList } = this.state;

//     return (
//       <ul>
//         {postsList.map(({ id, title }) => (
//           <li key={id}>
//             <p>{title.rendered}</p>
//           </li>
//         ))}
//       </ul>
//     );
//   }
// }

// export default Posts;

export default function Posts() {
  const [postsList, setPostsList] = useState([]);

  const loadPosts = () => {
    apiFetch({
      path: addQueryArgs('/wp/v2/posts', {
        _embed: true,
        _fields: 'title,content,id',
      }),
    }).then((posts) => {
      setPostsList(posts);
    });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <section>
      <h2>Últimos posts</h2>

      <ul>
        {postsList.map(({ id, title }) => (
          <li key={id}>
            <p>{title.rendered}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
