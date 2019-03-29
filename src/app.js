const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require ('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

//DEFINE PATHS FOR EXPRESS CONFIGS
const publicPathDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPathDirectory = path.join(__dirname,'../templates/partials')
//SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPathDirectory)
app.use(express.static(publicPathDirectory))

//SETUP STATIC DIRECTORY TO SERVE
app.get('',(req,res)=>{
res.render('index',{
    title:'Weather App',
    name:'Created by Akhil'
})
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Created by Akhil'
    })
    })
    app.get('/help',(req,res)=>{
        res.render('help',{
            title:'Help Page',
            name:'Created by Akhil'
        })
        })
        app.get('/products',(req,res)=>{
            if(!req.query.search){
             return res.send({
                  error: 'You must provide a search code'
             })
            }
            console.log(req.query.search)
            res.send({
                products:[]
            })
        })
        app.get('/weather',(req,res)=>{
            if(!req.query.address){
            return res.send({
                error:'No address found'
            })}
            geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
                if(error)
                {
                     return res.send({error})
                }
                
forecast(latitude,longitude,(error,forecastData)=>
{
    if(error)
    {
        return res.send(error)
    }
    res.send({
        location:location,
        forecast:forecastData,
        address: req.query.address
    })
})
                
            })
            
                // res.send({
                //     forecast:'cloudy',
                //     location:'Kurnool',
                //     address:req.query.address
                // })
            
        })

        app.get('/geocode.js',(req,res)=>{
            res.send(
                geocode(address)
        )
    })

        app.get('*',(req,res)=>{
        res.render('404',{
        errorMessage:'404 Page not found',
        title:'Akhil'
         })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
    errorMessage:'404 Page not found',
    title:'Akhil'
     })
})

app.listen(port,()=>
{
    console.log('Server is up on port'+port)
})