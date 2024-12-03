export default{
    async toTableList(table){
        for(const item of table){
            switch(item.status){
                case 0:
                    item.status = "비어있음"
                    item.color = "red"
                    break;
                case 1:
                    item.status = "사용중"
                    item.color = "blue"
                    break;
                case 2:
                    item.status = "예약"
                    item.color = "green"
                    break;
                case 3:
                    item.status = "마감"
                    item.color = "black"
                    break;
            }

        }
        return table;
    }
}