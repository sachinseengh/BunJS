// let data  = await Bun.file("README.md");

// console.log(await Bun.file("README.md").text());


// to make server
// Bun.serve(
     
//     {    
//         port:5000,
//         fetch(req) {
//             console.log(req);
//           let url = new  URL(req.url);

//           if(url.pathname === "/"){
//             return new Response("Homepage");
//           }else{
//             return new Response("About page");
//           }
//           console.log("url", url);
//     return new Response("Bun!After Restart 1");
//   },});


//using in memory database

// import { Database } from "bun:sqlite";

// let db = new Database("mydb.sqlite");

// db.query("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY,name TEXT ,address TEXT)").run();

// db.query("INSERT INTO users(name,address) values ('rohan','kathmandu')").run();

// db.query("delete from users where id=2").run();


//rest api

import { Database } from "bun:sqlite";
let db = new Database("mydb.sqlite");

Bun.serve(
     
    {    
        port:4000,
       async fetch(req) {
            console.log(req);
          let url = new  URL(req.url);

          if(url.pathname === "/"){
            // return new Response("Homepage");
          const userList =  db.query("SELECT * FROM USERS").all();
          return Response.json(userList);
          }
       
          if(url.pathname == "/create" && req.method === "POST"){
            // db.query("INSERT INTO users(name,address) values ('rohan','kathmandu')").run();


        let data = await req.json()
            db.prepare("INSERT INTO users(name,address) values (?,?)").run(data.name,data.address);
            return new Response("User Created");
          }

          if(url.pathname === "/delete" && req.method == "DELETE"){
            let params = url.searchParams;
            db.query("delete from users where id=?").run(params.get("id"))
            return new Response("..");
          }


    return new Response("Bun!After Restart 1");
  },});