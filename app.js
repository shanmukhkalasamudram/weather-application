
const path = require('path')
const request = require('request')

const geocode = require('./geocode')

const forecast = require('./forecast')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000



//define paths
const pubd = path.join(__dirname,'/pub')

const vpath = path.join(__dirname,'/vpath')   //another line after set view engine
const ppath = path.join(__dirname,'/vpath/partials')


//setup
app.set('view engine','hbs')

app.set('views',vpath)
hbs.registerPartials(ppath)


app.use(express.static(pubd)) //this folder will be opened 

app.get('',(req, res) => {     //for hbs we use rebder instead of send
    res.render('index', {
        title: 'Weather',
        name: 'Shanmukh'
    })
}) 

app.get('/', (req, res) => {
    res.send('Hello express!')
})

app.get('/help', (req, res) => {     //After adding external html pages 
    res.render('help', {
        helpText: 'This is some helpful text.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shanmukh'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Provide an valid address'
        })
    }

    geocode(req.query.address,(error,{
        latitude,longitude,location
    }) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,location,
                address: req.query.address
            })

            // console.log(location)
            // console.log(forecastData)
        })
    })

    // res.send({
    //     forecast: 'It is snowing ',
    //     address: req.query.address

    // })

   
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'shan',
        error : 'help not found'
    })
})





app.get('*',(req, res) => {
    res.render('404',{
        title:'404',
        name:'shan',
        error : 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})



