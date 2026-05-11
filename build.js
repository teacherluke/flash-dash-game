const fs = require('fs');
const path = require('path');
const htmlMinifier = require('html-minifier-terser');
const CleanCSS = require('clean-css');
const Terser = require('terser');

async function minifyHTML(inputPath, outputPath) {
    const html = fs.readFileSync(inputPath, 'utf8');
    const minified = await htmlMinifier.minify(html, {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true,
        minifyCSS: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
    });
    fs.writeFileSync(outputPath, minified);
    console.log(`Minified HTML: ${inputPath} -> ${outputPath}`);
}

async function minifyCSS(inputPath, outputPath) {
    const css = fs.readFileSync(inputPath, 'utf8');
    const minified = new CleanCSS({
        level: {
            1: {
                all: true,
                normalizeUrls: true
            }
        }
    }).minify(css);
    fs.writeFileSync(outputPath, minified.styles);
    console.log(`Minified CSS: ${inputPath} -> ${outputPath}`);
}

async function minifyJS(inputPath, outputPath) {
    const js = fs.readFileSync(inputPath, 'utf8');
    const minified = await Terser.minify(js, {
        compress: {
            drop_console: true,
            drop_debugger: true,
            dead_code: true,
            unused: true,
            booleans: true,
            if_return: true,
            join_vars: true,
            collapse_vars: true
        },
        mangle: {
            toplevel: true,
            properties: {
                regex: /^_[a-zA-Z]/
            }
        },
        output: {
            comments: false
        }
    });
    fs.writeFileSync(outputPath, minified.code);
    console.log(`Minified JS: ${inputPath} -> ${outputPath}`);
}

async function build() {
    console.log('Starting build...\n');
    
    const buildDir = './dist';
    if (!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir, { recursive: true });
    }
    
    await minifyHTML('./index.html', './dist/index.html');
    await minifyCSS('./styles.css', './dist/styles.css');
    await minifyJS('./script.js', './dist/script.js');
    
    fs.copyFileSync('./vercel.json', './dist/vercel.json');
    
    const igcseDir = './dist/igcse';
    if (!fs.existsSync(igcseDir)) {
        fs.mkdirSync(igcseDir, { recursive: true });
    }
    
    const flashcardFiles = fs.readdirSync('.').filter(file => file.startsWith('flashcards_') && file.endsWith('.txt'));
    flashcardFiles.forEach(file => {
        fs.copyFileSync(`./${file}`, `./dist/${file}`);
        console.log(`Copied: ${file}`);
    });
    
    const igcseFiles = fs.readdirSync('./igcse').filter(file => file.endsWith('.txt'));
    igcseFiles.forEach(file => {
        fs.copyFileSync(`./igcse/${file}`, `./dist/igcse/${file}`);
        console.log(`Copied: igcse/${file}`);
    });
    
    console.log('\nBuild complete! Output in ./dist/');
    
    const originalSize = 
        fs.statSync('./index.html').size + 
        fs.statSync('./styles.css').size + 
        fs.statSync('./script.js').size;
    
    const minifiedSize = 
        fs.statSync('./dist/index.html').size + 
        fs.statSync('./dist/styles.css').size + 
        fs.statSync('./dist/script.js').size;
    
    const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(2);
    
    console.log(`\nOriginal size: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`Minified size: ${(minifiedSize / 1024).toFixed(2)} KB`);
    console.log(`Size reduction: ${savings}%`);
}

build().catch(err => {
    console.error('Build failed:', err);
    process.exit(1);
});