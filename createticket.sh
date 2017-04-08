#! /bin/sh
echo "" >> /tmp/rocket.log
echo "" >> /tmp/rocket.log
echo "Val 1" $1 >> /tmp/rocket.log
echo "Val 2" $2 >> /tmp/rocket.log
echo "Val 3" $3 >> /tmp/rocket.log
echo "Val all" $@ >> /tmp/rocket.log
