HUSKYFOLDER=.husky
FILE=.husky/pre-commit
FILE2=.husky/_
if [ ! -d "$HUSKYFOLDER" ] || [ ! -f "$FILE" ] || [ ! -d "$FILE2" ]; then
    git init & mkdir .husky & npx husky install & rm -rf .husky/pre-commit & npx husky add .husky/pre-commit 'pnpm lint-staged'
fi