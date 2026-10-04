import {build} from 'esbuild';
import {execFileSync} from 'node:child_process';
await build({entryPoints:['src/main.tsx'],bundle:true,minify:true,format:'esm',target:'es2022',outfile:'dist/widgets.js',jsx:'automatic'});
execFileSync(process.execPath,['node_modules/@tailwindcss/cli/dist/index.mjs','-i','src/widgets.css','-o','dist/widgets.css','--minify'],{stdio:'inherit'});
