#!/bin/bash
find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" \) | while read file; do echo "Reformateando $file..."; sed -i "" "s/    /  /g" "$file"; done
