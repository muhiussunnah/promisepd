/** Turn standalone YouTube / Facebook video links in admin-authored
 *  article HTML into responsive embedded players.
 *
 *  The TipTap editor stores a pasted video URL as a plain
 *  `<p><a href="…">…</a></p>`.  On the public article we swap any such
 *  *standalone* video paragraph for an `<iframe>` so the video plays
 *  inline.  Inline links inside a sentence are left untouched. */

/** YouTube watch / share / embed / shorts / live → 11-char video id. */
function youtubeId(url: string): string | null {
  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/(?:embed|shorts|live|v)\/([A-Za-z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

function isFacebookVideo(url: string): boolean {
  return /(?:facebook\.com\/(?:reel\/|watch\/?\?|[^/]+\/videos\/)|fb\.watch\/)/i.test(url);
}

function youtubeEmbed(id: string): string {
  // youtube-nocookie: no tracking cookie until the visitor hits play.
  return (
    `<div class="video-embed">` +
    `<iframe src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video player" loading="lazy" frameborder="0" ` +
    `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>` +
    `</div>`
  );
}

function facebookEmbed(url: string): string {
  // Self-contained iframe via Facebook's video plugin endpoint.  Unlike the
  // XFBML `.fb-video` JS-SDK widget (which silently renders nothing for
  // Reels and depends on the SDK loading + parsing in time), the
  // plugins/video.php iframe renders server-side and handles both standard
  // videos AND reels — with a built-in "watch on Facebook" fallback if a
  // clip can't be embedded.  We can't measure the true aspect without the
  // SDK, so we infer it from the URL: a /reel/ is portrait (9:16), anything
  // else is landscape (16:9).  The wrapper class drives the CSS aspect box.
  const portrait = /\/reels?\//i.test(url); // /reel/ or /reels/ → vertical
  const cls = portrait ? "fb-embed fb-reel" : "fb-embed fb-land";
  const src =
    `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}` +
    `&show_text=false&width=500`;
  return (
    `<div class="${cls}">` +
    `<iframe src="${src}" title="Facebook video" scrolling="no" frameborder="0" ` +
    `allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" ` +
    `allowfullscreen loading="lazy"></iframe>` +
    `</div>`
  );
}

/** Replace standalone YouTube/Facebook video paragraphs with embeds. */
export function embedVideoLinks(html: string): string {
  if (!html) return html;
  // A paragraph that contains ONLY a single anchor (the link text is the
  // URL) — that's a pasted, standalone video link.
  const standaloneLink = /<p\b[^>]*>\s*<a\b[^>]*\bhref="([^"]+)"[^>]*>[^<]*<\/a>\s*<\/p>/gi;
  return html.replace(standaloneLink, (whole, rawHref: string) => {
    const url = rawHref.replace(/&amp;/g, "&");
    const yt = youtubeId(url);
    if (yt) return youtubeEmbed(yt);
    if (isFacebookVideo(url)) return facebookEmbed(url);
    return whole; // not a recognised video link — leave it alone
  });
}
