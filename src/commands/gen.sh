#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
files=`ls "$SCRIPT_DIR" | grep .js | grep -v index.js`

write() {
	echo "$1" >> "$SCRIPT_DIR/index.js"
}

rm -f "$SCRIPT_DIR/index.js"
for file in $files;
do
	filename=`echo $file | cut -d . -f 1`
	write "export * as $filename from \"./$file\";"
done