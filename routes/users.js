var express = require('express');
var router = express.Router();

// get all users
router.get('/', function(req,res,next){
	var sql = 'select * from users';
	
	con.query(sql, function(err,result){
		if (err) throw err;
		var users = [];
		
		for (i in result){
			users.push(result[i])
		}		
		res.render('users-all', {title:'All Users', userlist:users});
	});
});


// get all users just the data
router.get('/useme', function(req,res,next){
	var sql = 'select * from users';
	
	con.query(sql, function(err,result){
		if (err) throw err;
		var users = [];
		
		for (i in result){
			users.push(result[i])
		}
		// cross domain stuff
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		// the data
		res.send(users);
	});
});


/* GET single users listing. */
router.get('/info/:id', function(req, res, next) {
	//console.log(req.params);
	var sendy = {
		userFirstName: '',
		userLastName: '',
		userEmail: ''		
	}
	var sql = 'SELECT * FROM users';
	con.query(sql, function(err,result){
		if (err) throw err;
		for(var i in result){
			//console.log(result[i]);
			if (req.params.id == result[i].id){
				
				//console.log('found him ' + req.params.id);					
				
				sendy.userFirstName= result[i].firstName;
				sendy.userLastName= result[i].lastName;
				sendy.userEmail= result[i].email;
			} 
		}	
		res.render('user', { 
					title: 'User Page', 
					userId: result[i].id,
					userFirstName: sendy.userFirstName,
					userLastName: sendy.userLastName,
					userEmail: sendy.userEmail						
					});
		//res.send('did not find him ' + req.params.id + ' ' + c);
	});		

  //res.send('respond with a resource er ' + req.params.id + ' ' + c);
});

router.get('/new', function(req,res,next){
	res.render('add-user', {title:'add user'});
});


router.post('/new', function(req,res){
	console.log(req.body.username);
	console.log(req.body.firstName);
	console.log(req.body.lastName);
	console.log(req.body.email);
	
	var sql = 'insert into users (username,firstName,lastName,email) values ("'+req.body.username+'","'+req.body.firstName+'","'+req.body.lastName+'","'+req.body.email+'")';
	
	con.query(sql,function(err,result){
		if (err) throw err;		
		console.log(result);		
		res.redirect('/users/info/'+result.insertId);
	})
	
})



module.exports = router;
