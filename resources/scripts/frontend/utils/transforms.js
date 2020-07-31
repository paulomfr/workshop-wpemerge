export const transformFeaturedMedia = (featuredMedia) => {
  if (!featuredMedia.source_url) {
    return false;
  }

  const {
    id,
    title: { rendered: title },
    alt_text: altText,
    source_url: source,
    media_details: mediaDetails,
  } = featuredMedia;

  return {
    id,
    title,
    altText,
    source,
    sizes: mediaDetails.sizes,
  };
};

export const transformPost = ({
  title, content, excerpt, _embedded: embedded, ...post
}) => ({
  ...post,
  title: title.rendered,
  content: content.rendered,
  excerpt: excerpt.rendered,
  featuredMedia: embedded['wp:featuredmedia'] ? transformFeaturedMedia(embedded['wp:featuredmedia'][0]) : false,
});

// const obj = {
//   title: 'Lorem',
//   content: 'Lorem ipsum simet',
// };

// // obj.title

// // destruction
// const { title } = obj;

// console.log(title); // lorem;

// const obj2 = {
//   ...obj,
//   link: 'https://source.com',
// };
