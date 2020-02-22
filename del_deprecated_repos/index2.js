const path = require('path');
const fs = require("fs");
const data_dir = path.join(process.env.pwd, 'data\\');
var  repos = [];
var file_path;
var fileReaded=0;

function getRepos(){
	return new Promise(function(resolve, reject){
	fs.readdir(data_dir, 'utf8' , (err, files) => {
	if (err) {
		reject(Error('Dir not read successful, reason is :' + error));
	} ;
	var filesCnt = files.length;
	
	if (filesCnt) {
		files.forEach(function(file){
			file_path = path.join(data_dir, file);
			fs.readFile(file_path, 'utf8', (err, data) => {
			if (err) {
				reject(Error('File not read successful, reason is :' + error));
			} ;
			if (!repos.length) {
				repos = [].concat(JSON.parse(data));
			} else {
				repos = repos.concat(JSON.parse(data));
			}
			fileReaded++;
			if (fileReaded == filesCnt){
				//console.log(repos)
				console.log(repos.length);
				resolve(repos);
			 }
			});
		})	
	}		
});
})
}


getRepos().then(function(data) {
	for(var i = 0; i< data.length; i++) {
		var _path_split_arr = (data[i]['url']).split('/');
		var repo_name = _path_split_arr[_path_split_arr.length-1];
		console.log(repo_name);
	}
}, function (Error) {
	console.log(Error);
});

