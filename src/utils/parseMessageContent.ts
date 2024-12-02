import { MessagePart } from 'src/api/messages/schemas.ts';

//This part of the logic is not fully implemented. I encountered difficulties rendering messages with different encodings, so not all messages are currently displayed correctly. Further improvement is required.

function decodeBase64(base64String: string): string {
  const base64 = base64String.replace(/-/g, '+').replace(/_/g, '/');
  return atob(base64);
}

function addCharsetToHTML(htmlContent: string): string {
  const charsetMetaTag = `<meta charset="UTF-8">`;
  if (htmlContent.includes('<head>')) {
    return htmlContent.replace('<head>', `<head>\n  ${charsetMetaTag}`);
  }
  return `${charsetMetaTag}\n${htmlContent}`;
}

function findMessageParts(parts: MessagePart[]): { text: string | null; html: string | null } {
  let text: string | null = null;
  let html: string | null = null;

  for (const part of parts) {
    if (part.mimeType === 'text/plain' && part.body?.data) {
      text = decodeBase64(part.body.data);
    } else if (part.mimeType === 'text/html' && part.body?.data) {
      html = decodeBase64(part.body.data);
    } else if (part.parts) {
      const result = findMessageParts(part.parts as MessagePart[]);
      text = text || result.text;
      html = html || result.html;
    }
  }

  return { text, html };
}

export function extractEmailContent(payload: MessagePart): { text: string | null; html: string | null } {
  if (payload?.body?.data) {
    return {
      text: payload.mimeType === 'text/plain' ? decodeBase64(payload.body.data) : null,
      html: payload.mimeType === 'text/html' ? addCharsetToHTML(decodeBase64(payload.body.data)) : null,
    };
  }

  if (payload?.parts) {
    const result = findMessageParts(payload.parts as MessagePart[]);
    if (result.html) {
      result.html = addCharsetToHTML(result.html);
    }
    return result;
  }

  return { text: null, html: null };
}
