class Blogconfig {
    tablename="blogs"
    title="title"
    description="content"
    createdTime="created_at"
    updateTime="updated_at"
    img="feature_img"

    getcurrentdate(){
        const date = new Date(Date.now());
        const nowTime = date.getFullYear()+
            "-"+(date.getMonth()+1)+
            "-"+date.getDate()+
            " "+date.getHours()+
            ":"+date.getMinutes()+
            ":"+date.getSeconds()
        return nowTime
    }
        
}

module.exports = new Blogconfig

