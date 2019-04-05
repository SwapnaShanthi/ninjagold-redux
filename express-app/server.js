const express = require( 'express');
const app=express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const axios = require( 'axios');

app.use(express.static("./../react-app/build/")); 

app.get("/getninjagolddetails/",(request, response)=>{

    axios.get(`http://5c99215a423656001439321e.mockapi.io/api/v1/ninjagold`)
         .then(function (mockApiNinjaGoldGetResponse) {
                        return response.json({
                                data: mockApiNinjaGoldGetResponse.data,
                                status:true
                            })
                    
        })
        .catch(error => {
                console.log("NinjaGoldGetResponse failed"+error);
                return response.json({
                    status:false
                   })
        });
    

})

app.post("/updateninjadetails/",(request, response)=>{
   
   axios.put(`http://5c99215a423656001439321e.mockapi.io/api/v1/ninjagold/${request.body.objectToUpdate.id}`,request.body.objectToUpdate)
        .then((mockApiNinjaGoldPostResponse) => {
                        console.log("update dojodossier",mockApiNinjaGoldPostResponse.data);
                        return response.json({
                            status:true
                        })
        })
        .catch((error) => {
                       console.log("NinjaGold put failed",error);
                       return response.json({
                        status:false
                       })
        });


}) 


app.listen(5000 ,()=>{

});