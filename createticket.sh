#! /bin/sh
ARGS="brent.hutchin@@rockethal subject testing%%rockethal blah blah body blah"
USERNAME=$($ARGS | sed s%\@\@.*%%g)
SUBJECT=$(${ARGS} | sed s%.*\@\@%%g | sed s/\%\%.*//g)
MESSAGE=$3
#echo ""  >> /var/log/rockethal.log
#echo "Email args:"  >> /var/log/rockethal.log
#echo "Username:" $USERNAME >> /var/log/rockethal.log
echo $ARGS #>> /var/log/rockethal.log
echo "Username:"$USERNAME
echo "Subject:" $SUBJECT
echo "Body:"    $BODY


#SEND="/bin/mail -r $USERNAME -s $SUBJECT"
#TO='brent.hutchin@iloura.com.au'
#echo $MESSAGE | $SEND $TO

echo "Val all" $@ >> /tmp/rocket.log
