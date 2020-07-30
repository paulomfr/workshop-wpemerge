import { limitText } from '@scripts/frontend/utils/text-decode';

export default function PostCard({
  title, link, featuredMedia, excerpt,
}) {
  return (
    <article className="post-card">
      {featuredMedia && (
        <div className="post-card__thumbnail">
          <img src={featuredMedia.sizes.full.source_url} alt="" />
        </div>
      )}
      <div className="post-card__content">
        <h2 className="post-card__title">{title}</h2>

        <div dangerouslySetInnerHTML={{ __html: limitText(excerpt, 16) }} />

        <a href={link} className="btn-text">Continuar lendo...</a>
      </div>
    </article>
  );
}
