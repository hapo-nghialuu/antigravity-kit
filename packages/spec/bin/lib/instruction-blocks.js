'use strict';

const CORE_BLOCK_START = '<!-- CAFEKIT CORE START -->';
const CORE_BLOCK_END = '<!-- CAFEKIT CORE END -->';

function managedRange(content, startMarker = CORE_BLOCK_START, endMarker = CORE_BLOCK_END) {
  const existing = String(content || '');
  const start = existing.indexOf(startMarker);
  const end = existing.indexOf(endMarker);
  if (start < 0 && end < 0) return null;
  const duplicateStart = existing.indexOf(startMarker, start + startMarker.length);
  const duplicateEnd = existing.indexOf(endMarker, end + endMarker.length);
  if (start < 0 || end <= start || duplicateStart >= 0 || duplicateEnd >= 0) return false;
  return {
    start,
    end: end + endMarker.length,
    bodyStart: start + startMarker.length,
    bodyEnd: end
  };
}

function migrateExactLegacyBlock(existingContent, startMarker, endMarker, replacementContent) {
  const existing = String(existingContent || '');
  const range = managedRange(existing, startMarker, endMarker);
  if (!range) return existing;
  const body = existing.slice(range.bodyStart, range.bodyEnd).trim();
  if (body !== String(replacementContent).trim()) return existing;
  const block = `${CORE_BLOCK_START}\n${String(replacementContent).trim()}\n${CORE_BLOCK_END}`;
  return `${existing.slice(0, range.start)}${block}${existing.slice(range.end)}`;
}

function upsertManagedCoreBlock(existingContent, coreContent) {
  const existing = String(existingContent || '');
  const block = `${CORE_BLOCK_START}\n${String(coreContent).trim()}\n${CORE_BLOCK_END}`;
  const range = managedRange(existing);
  if (range === false) return existing;
  if (range) {
    return `${existing.slice(0, range.start)}${block}${existing.slice(range.end)}`;
  }
  if (!existing) return `${block}\n`;
  const separator = existing.endsWith('\n') ? '\n' : '\n\n';
  return `${existing}${separator}${block}\n`;
}

function transformManagedCoreContent(content, transform) {
  const existing = String(content || '');
  const range = managedRange(existing);
  if (!range || typeof transform !== 'function') return existing;
  const body = existing.slice(range.bodyStart, range.bodyEnd);
  return `${existing.slice(0, range.bodyStart)}${transform(body)}${existing.slice(range.bodyEnd)}`;
}

module.exports = {
  CORE_BLOCK_START,
  CORE_BLOCK_END,
  managedRange,
  migrateExactLegacyBlock,
  upsertManagedCoreBlock,
  transformManagedCoreContent
};
