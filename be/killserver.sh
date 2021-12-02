sleep 1;
lsof -i :5000 -sTCP:LISTEN | awk 'NR > 1 {print $2}'  | xargs kill -15;
exit  0;