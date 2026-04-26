const fs = require('fs');
const path = require('path');

const replacements = {
    'â€¢': '•',
    'Ã¬': 'ì',
    'Ã ': 'à',
    'Ã²': 'ò',
    'Ã¹': 'ù',
    'Ã©': 'é',
    'Ã¨': 'è',
    'Ã³': 'ó',
    'Ã¡': 'á',
    'Ã¢': 'â',
    'Ã®': 'î',
    'Ã”': 'Ô',
    'Ã»': 'û',
    'Ã‰': 'É',
    'Ãˆ': 'È',
    'â€™': "'",
    'Â°': '°',
    'Ã¯': 'ï',
    'Ãª': 'ê'
};

function fixFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');

    // Fix the `r`n mess
    content = content.replace(/`r`n/g, '\n');

    // Fix the structural </div> issue
    content = content.replace(/(<div id="site-newsletter"><\/div>)\s+<\/div>\s+<\/main>/g, '$1\n    </main>');

    // Apply character replacements
    for (const [target, replacement] of Object.entries(replacements)) {
        content = content.split(target).join(replacement);
    }

    // Fix Saponi typo
    content = content.split('Saponi Svelati').join('Sapori Svelati');

    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Fixed: ${filepath}`);
}

const pagesDir = path.join('c:', 'Users', 'huzhe', 'Documents', 'GitHub', 'SaporiSvelati', 'pages');
fs.readdirSync(pagesDir).forEach(file => {
    if (file.endsWith('.html')) {
        fixFile(path.join(pagesDir, file));
    }
});

const rootDir = path.join('c:', 'Users', 'huzhe', 'Documents', 'GitHub', 'SaporiSvelati');
fs.readdirSync(rootDir).forEach(file => {
    if (file.endsWith('.html')) {
        fixFile(path.join(rootDir, file));
    }
});
