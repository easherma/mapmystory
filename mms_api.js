

function API(username, table_name){
    this.username=username;
    this.table_name = table_name;
    this.sql = new cartodb.SQL({user:username, format: 'geojson'});
};


API.prototype.post_data = function(user_id, point, order, data , callback){
   var query = 'select null::GEOMETRY as the_geom,  UPDATE_'+self.table_name +' ( '+ user_id + '::text '+
  ', CDB_LATLNG(' + point.lat + ", "+point.lng+") "+
  ", "+order + "::Numeric "+
  ", '"+JSON.stringify(data)+ "'::json)"
  
  console.log('query ', query)
  this.sql.execute(query).done(function(data){
    console.log("updated data")
  }).error(function(error){
    console.log("failed to update data")  
  })
};


API.prototype.get_data_for_user= function(user_id,callback){
    this.sql.execute("select * from " + this.table_name + " where user_id = '"+user_id +"'").done(
        function(data){
            callback(data);
        }.bind(this)
    ).error(function(error){
      console.log("error with getting user data", error)  
    });
}

API.prototype.get_data_for_all= function(callback){
    this.sql.execute("select ST_AsGeoJSON(ArrayAgg(*)) from " + this.table_name).done(function(data){
        callback(data)
    }.bind(this)
    ).error(function(error){
        console.log("error with getting all users ", error);
    })
}
