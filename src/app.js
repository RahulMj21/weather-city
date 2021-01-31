const express=require("express")
const app=express();
const path=require("path");
const hbs=require("hbs");
const port=process.env.PORT || 80;

const staticPath=path.join(__dirname,"../public")
const partialsPath=path.join(__dirname,"../templates/partials")
const viewsPath=path.join(__dirname,"../templates/views")

app.use(express.static(staticPath));

app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);

app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/about",(req,res)=>{
    res.render("about");
});
app.get("/weather",(req,res)=>{
    res.render("weather");
});
app.get("*",(req,res)=>{
    res.render("error");
});

app.listen(port,()=>{
    console.log(`listing to the port ${port}`)
});