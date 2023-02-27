rewrite "^/s/(\w+)/(.*)$" /search.php?page=$1&wd=$2 last;
rewrite "^/o/(\w+)/(.*)$" /search.php?year=$1&wd=$2 last;
rewrite "^/open/(\w+)/([^\/]*)$" /open.php?id=$1&url=$2 last;
rewrite "^/a/(\w+)$" /libs/api.php?ac=$1 last;
rewrite "^/public$" /copyright.php last;