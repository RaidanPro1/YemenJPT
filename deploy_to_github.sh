
#!/bin/bash

# YemenJPT GitHub Sovereign Deployment
REPO_URL="https://github.com/RaidanPro1/YemenJPT"

echo "Preparing for push to RaidanPro1/YemenJPT..."

# Ensure no sensitive data is tracked
cat <<EOF > .gitignore
.env
data/
node_modules/
dist/
*.log
.DS_Store
auth.json
EOF

git init
git add .
git commit -m "feat: complete sovereign infrastructure - production ready v2.1"
git branch -M main
git remote add origin $REPO_URL || git remote set-url origin $REPO_URL

echo "Pushing to GitHub..."
git push -u origin main
