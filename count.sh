#!/bin/bash  
# 统计函数
function count() {  
    local insert=0  
    local delete=0  
	local email=$1;
    while read line ;do  
        current=`echo $line| awk -F',' '{printf $2}' | awk '{printf $1}'`  
        if [[ -n $current ]]; then   
            insert=`expr $insert + $current`  
        fi  
        current=`echo $line | sed -n 's/.*, //p' | awk '{printf $1}'`  
        if [[ -n $current ]]; then  
            delete=`expr $delete + $current`  
        fi  
    done < .tmp.count  
	echo ""
	echo "The author $1 ' s code count resoult: "
    echo "Add Lines: $insert, Delete Lines: $delete, Total Lines: $(($insert - $delete))"  
}  
# 统计所有代码行  
function countAll() {  
    git log --author=$1 --shortstat --pretty=format:"" | sed /^$/d >.tmp.count  
    count $1;  
    rm .tmp.count  
}  
# 统计当天代码行  
function countToday() {  
    local current=`date +%s`;  
    local begin=`date +%Y-%m-%d |xargs date +%s -d`;  
    local minutes=$(($current - $begin));  
    git log --author=$1 --since="$minutes seconds ago" --shortstat --pretty=format:"" | sed /^$/d >.tmp.count  
    count $1;  
    rm .tmp.count  
}  
  
function countOneDay() {  
    git log --author=$1 --since="1 days ago" --shortstat --pretty=format:"" | sed /^$/d >.tmp.count  
    count $1;  
    rm .tmp.count  
}
  
# 命令行参数  
if [[ ! -n $1 ]] && [[ ! -n $2 ]]; then
	echo "Wrong args! U'd better type in like 'sh  count.sh  email  timeType[all|oneday|today]'"; 
elif [[ ! -n $2 ]] || [[ $2 = "today" ]] ; then   
    countToday $1;    
elif [[ $2 = "all" ]] ; then   
    countAll $1;  
elif [[ $2 = "oneday" ]]; then  
    countOneDay $1;  
else 
	countToday $1;
fi  