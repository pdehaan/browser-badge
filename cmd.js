var argv = require('optimist').argv;
var createBadge = require('./');
var fs = require('fs');

var outfile = argv._[0] || argv.outfile || argv.o;
var out = outfile && outfile !== '-'
    ? fs.createWriteStream(outfile)
    : process.stdout
;
createBadge(argv).pipe(out);
