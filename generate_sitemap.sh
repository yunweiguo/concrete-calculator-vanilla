#!/bin/bash

# 该脚本根据 .html 文件的 git 历史记录生成一个 sitemap.xml 文件。
# 它会自动将 <lastmod> 日期设置为每个文件的最后一次提交日期。

set -e # 如果一个命令以非零状态退出，则立即退出。

BASE_URL="https://concrete-calculator.pro"
SITEMAP_FILE="sitemap.xml"
TEMP_SITEMAP_FILE=$(mktemp)

# 开始站点地图
cat > "$TEMP_SITEMAP_FILE" << EOL
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
EOL

# 查找由 git 跟踪的所有 html 文件
git ls-files | grep '\.html$' | while read -r file; do
  # 清理 URL 的文件路径。
  url_path=${file#./}

  if [[ "$url_path" == "index.html" ]]; then
    loc_path="/"
  elif [[ $(basename "$url_path") == "index.html" ]]; then
    loc_path="/$(dirname "$url_path")/"
  else
    loc_path="/$url_path"
  fi
  
  # 从 git 获取最后修改日期
  last_mod=$(git log -1 --format=%cs "$file")

  if [ -z "$last_mod" ]; then
    echo "警告：无法找到 $file 的最后修改日期。正在跳过。" >&2
    continue
  fi
  
  url="${BASE_URL}${loc_path}"

  # 写入站点地图
  cat >> "$TEMP_SITEMAP_FILE" << EOL
  <url>
    <loc>${url}</loc>
    <lastmod>${last_mod}</lastmod>
  </url>
EOL
done

echo '</urlset>' >> "$TEMP_SITEMAP_FILE"

mv "$TEMP_SITEMAP_FILE" "$SITEMAP_FILE"

echo "站点地图已在 ${SITEMAP_FILE} 成功生成" 