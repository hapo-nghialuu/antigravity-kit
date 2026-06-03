/**
 * npm registry queries for the installer version picker.
 *
 * Intentionally standalone — no imports from other installer lib files
 * to avoid circular dependencies. Timeout is short (3 s) so a slow/offline
 * network never blocks the install flow; callers must handle a null result.
 */

'use strict';

const https = require('https');

const REGISTRY_URL = 'https://registry.npmjs.org/@haposoft/cafekit';
const FETCH_TIMEOUT_MS = 3000;
const MAX_VERSIONS = 5;

/** Sort version strings descending (newest first), semver-ish. */
function sortDesc(versions) {
  return [...versions].sort((a, b) => {
    const toNum = (v) => String(v).split('.').map((n) => parseInt(n, 10) || 0);
    const [aN, bN] = [toNum(a), toNum(b)];
    for (let i = 0; i < 3; i++) {
      const d = (bN[i] || 0) - (aN[i] || 0);
      if (d !== 0) return d;
    }
    return 0;
  });
}

/**
 * Fetch up to MAX_VERSIONS recent published versions from the npm registry.
 * Returns an object `{ versions: string[], latest: string }` or null on any error.
 */
function fetchRecentVersions() {
  return new Promise((resolve) => {
    const req = https.get(
      REGISTRY_URL,
      { timeout: FETCH_TIMEOUT_MS, headers: { Accept: 'application/json' } },
      (res) => {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          try {
            const data = JSON.parse(body);
            const allVersions = Object.keys(data.versions || {});
            if (allVersions.length === 0) { resolve(null); return; }
            const sorted = sortDesc(allVersions);
            const latest = (data['dist-tags'] && data['dist-tags'].latest) || sorted[0];
            resolve({ versions: sorted.slice(0, MAX_VERSIONS), latest });
          } catch {
            resolve(null);
          }
        });
      }
    );
    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
  });
}

module.exports = { fetchRecentVersions };
