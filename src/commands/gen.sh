#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR"
files=`find . | grep .js | grep -v index.js`
echo $files

write() {
	echo "$1" >> "$SCRIPT_DIR/index.js"
}

rm -f "$SCRIPT_DIR/index.js"
for file in $files;
do
	filename=`echo $file | rev | cut -d"." -f2- | cut -d"/" -f1 | rev`
	write "export * as $filename from \"$file\";"
done