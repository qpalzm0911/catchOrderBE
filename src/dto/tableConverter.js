export default{
    async toTableList(table){
        console.log(table);
        for(const item of table){
            switch(item.status){
                case 0:
                    item.status = "비어있음"
                    break;
                case 1:
                    item.status = "사용중"
                    break;
                case 2:
                    item.status = "마감"
                    break;
                case 3:
                    item.status = "예약"
                    break;
            }

        }
        return table;
    }
}