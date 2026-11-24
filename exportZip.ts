import JSZip from 'jszip';

const rootFiles = import.meta.glob<string>(
  [
    '/index.html',
    '/main.tsx',
    '/App.tsx',
    '/menuRecommender.ts',
    '/types.ts',
    '/weatherThemes.ts',
    '/WeatherBackdrop.tsx',
    '/index.css',
    '/package.json',
    '/vite.config.ts',
    '/tsconfig.json',
    '/metadata.json',
    '/README.md',
  ],
  { query: '?raw', import: 'default' },
);

const GITIGNORE_CONTENT = `node_modules/
build/
dist/
coverage/
.DS_Store
*.log
.env*
!.env.example
`;

const ENV_EXAMPLE_CONTENT = `# This pure frontend build runs in the browser without API keys.
`;

export async function downloadProjectZip(): Promise<void> {
  const zip = new JSZip();

  const entries = Object.entries(rootFiles);
  if (entries.length === 0) {
    throw new Error('ZIP_EMPTY');
  }

  await Promise.all(
    entries.map(async ([filePath, loader]) => {
      const content = await loader();
      const cleanName = filePath.replace(/^\/+/, '');
      zip.file(cleanName, content);
    }),
  );

  const selfModule = await import('./exportZip.ts?raw');
  zip.file('exportZip.ts', selfModule.default);
  zip.file('.gitignore', GITIGNORE_CONTENT);
  zip.file('.env.example', ENV_EXAMPLE_CONTENT);

  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = 'dinner-weather-files.zip';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(blobUrl);
}
