class Userconfig {
    tablename="users"
    email="email"
    password="user_password"
    fullname="fullname"
    createdTime="created_at"
    updateTime="updated_at"
    img="avatar"

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

module.exports = new Userconfig

