export function removeImagesAndPreload(htmlString: string): string {
  const parser = new DOMParser();
  const document = parser.parseFromString(htmlString, 'text/html');

  document.querySelectorAll('img').forEach((img) => img.removeAttribute('src'));

  document.querySelectorAll('img[srcset]').forEach((img) => img.removeAttribute('srcset'));

  document.querySelectorAll('source[srcset]').forEach((source) => source.removeAttribute('srcset'));

  document.querySelectorAll('link[rel="preload"][as="image"]').forEach((link) => link.remove());

  return document.documentElement.outerHTML;
}
