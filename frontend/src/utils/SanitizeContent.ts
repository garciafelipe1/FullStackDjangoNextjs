import sanitizeHtml from 'sanitize-html';

const allowedTags = [
  'p',
  'h1',
  'h2',
  'ul',
  'ol',
  'li',
  'sub',
  'sup',
  'blockquote',
  'pre',
  'a',
  'span',
  'strong',
  'em',
  'u',
  's',
  'br',
];
const allowedAttributes = {
  a: ['href', 'target', 'rel'],
  img: ['src', 'alt', 'title'],
  video: ['src', 'comtrols'],
  span: ['style'],
  p: ['style'],
  h1: ['style'],
  h2: ['style'],
};
const sanitizeConfig = {
  allowedTags,
  allowedAttributes,
  allowedStyles: {
    '*': {
      'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
      'font-size': [/^(\d+(?:\.\d+)?)(px|em|%)$/],
      'background-color': [/^#([0-9A-Fa-f]{3}){1,2}$/],
      color: [/^#([0-9A-Fa-f]{3}){1,2}$/],
      'font-family': [/^[-\w\s,]+$/],
    },
  },
};
export default function SanitizeContent(content: string) {
  const sanitizedContent = sanitizeHtml(content, sanitizeConfig);
  return sanitizedContent;
}
