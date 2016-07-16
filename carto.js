

var CARTODB(username, table_name) = function(){
    this.username=username;
    this.table_name = table_name;
    this.sql = new cartodb.SQL({user:username});
};


CARTODB.prototype.post_data = function(data, callback){
   this.sql.execute('select UPDATE_'+self.table_name +' ( '+ data.user_id +
  ', CDB_LATLNG(' + data.point.lat + ", "+data.point.lng+") "+
  ", "+data.path_order +
  ", "+JSON.stringify(data.other_data)+ ")").done(function(data){
    console.log("updated data")
  }).error(function(error){
    console.log("failed to update data")  
  })
};


CARRODB.prototype.get_data_for_user= function(user_id,callback){
    this.sql.execute("select * from " + this.table_neame + " where user_id = '"+user_id +"'").done(
        function(data){
            callback(data.rows);
        }.bind(this)
    ).error(function(error){
      console.log("error with getting user data", error)  
    });
}

CARTODB.prototype.get_data_for_all= function(user_id,callback){
    this.sql.execute("select * from " + this.table_name).done(function(data){
        callback(data.rows)
    }.bind(this)
    ).error(function(error){
        console.log("error with getting all users ", error);
    })
}
