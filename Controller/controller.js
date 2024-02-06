const user = require("../model/db.js")


const credential={
  email:"admin@gmail.com",
  password:1000,
}


 //route for login
const tologin=(req, res) =>{
    if(req.session.userlogged){
        res.redirect('/dashboard')
    }else if(req.session.adminlogged){
        res.redirect('/toadminPage')
    }else{
        res.render('login',{title:"login page",err:false})
    }
}


//user login 

const login = async (req,res)=>{
try{
  if(req.session.userlogged){
    res.redirect('/dashboard')
  }else{
    const {email,password}=req.body

    const connect=await user.findOne({email:email,password:password})
    console.log(connect);
    if(connect){
        console.log("user login success full");
        req.session.user=req.body.email;
        req.session.userlogged=true
        res.redirect('/dashboard')
    }else {
      console.log("failed")
       res.redirect('/') 
    }
}
}catch(err){
  console.log("Error while login",err)
  res.redirect('/')
}
}


// admin page route




function admin(req,res){
  if(req.session.adminlogged){
 res.redirect("/toadminPage")
  }else{

  res.render("adminlogin",{title:"Admin log page"})}
}

//admin loging

function adminlog (req, res) {
  if(req.session.adminlogged){
    res.redirect('/toadminPage')
  }else if(req.session.userlogged){
    res.redirect("/dashboard")
  }else{
  if (
    req.body.email == credential.email &&
    req.body.password == credential.password
    ) {
        req.session.user = req.body.email;
        req.session.adminlogged = true;
    res.redirect("/toadminPage");
  } else {
    req.session.err="invalid username or password"
    res.redirect("/adminlogin")
  }}
}

//adding data to admin 

async function adminpage(req,res){
  if(req.session.adminlogged){
    var i=0
  
  const useData=await user.find()
  res.render('adminpage',{title:"admin page",useData,i})
  }else{
    res.redirect('/adminlogin')
  }
}


function dash(req, res) {
  if(req.session.userlogged){
    res.render('dashboard',{title:"home page"})
  }
  else{
    res.redirect('/')
  }
}



function signup(req,res){
  if(req.session.userlogged){
    res.redirect('/dashboard')
  }else{
    res.render('signup')
  }
}



//signup page

const insertuser= async (req, res) => {
    const { name, email, password } = req.body;  
    const use = await user.create(req.body); 
    req.session.user = email;
    req.session.userlogged = true;
    res.redirect("/");
  }


  //  base to signup

function basetosignup(req,res){
  if(req.session.adminlogged){
    res.redirect('/adminpage')
  }else{
    if(req.session.userlogged){
      res.redirect('/dash')
    }else{
      res.render('signup',{title:"signup page"})
    }
  }
}



  // signin to login
 function signin(req,res){
    if(req.session.adminlogged){
      res.redirect('/toadminPage')
    }else{
      if(req.session.userlogged){
        res.redirect('/login')
      }else{
      res.render("login",{title:"Login Page",err:false})
      }
    }
  }


  //add user 
  function add(req,res){
    res.render('adduser',{title:"ADD USER"})
   }

   async function insert(req,res){
    const{name,email,password}=req.body

    const newuser=await user.create(req.body)
    console.log(newuser);
    res.redirect('/toadminPage')
  }
 
//edit user
  async function edit(req,res){
    const id=req.params.id
    const userData=await user.findOne({_id:id})
    res.render('adminedit',{title:"edit user",userData})
  }
//update

 async function edited(req,res){
  let newdata=req.body
  let id=req.params.id
  await user.updateOne(
    {_id:id},
    {$set:{
      name:newdata.name,
      email:newdata.email
    }}

  )
  res.redirect('/toadminpage')
  }


  //deletion

  async function del(req,res){
    const id=req.params.id
    const deleted=await user.deleteOne({_id:id})
    res.redirect('/toadminpage')
  }



 //search user


 async function search(req,res){
    var i=0;
    const data=req.body
    let useData=await user.find({
      name:{$regex:"^" +data.search,$options:"i"},

    })
    res.render('adminpage',{title:"Home",useData,i})
 }



function admintohome(req,res){
  res.render('login',{title:"login page",err:req.session.err})
}




//to logout
function logout(req,res){
  req.session.destroy();
  res.redirect('/')
}

module.exports={
    insertuser,
    signup,
    tologin,
    signin,
    login,
    dash,
    logout,admin,
    adminlog,
    adminpage,
    insert,
    edit,
    edited,
    del,search,
    add,
    admintohome,
    admin,
    basetosignup
}