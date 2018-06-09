#!/bin/bash
DIR=dist/refined-slack.app/Contents

rm -rf dist/

mkdir -p $DIR
cp -R bin/ $DIR/MacOS

echo '#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
$DIR/refined-slack &' > $DIR/MacOS/launch

chmod -R +x $DIR

echo "
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleExecutable</key>
	<string>launch</string>
	<key>LSUIElement</key>
	<true/>
</dict>
</plist>
" > $DIR/Info.plist
