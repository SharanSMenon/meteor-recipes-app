import { Meteor } from 'meteor/meteor';
import { WebApp }  from 'meteor/webapp';
import './../imports/api/users';
import './../imports/api/recipes'
import './../imports/startup/simple-schema-configuration.js';
import { Session } from 'meteor/session';
import { Recipes } from './../imports/api/recipes';
Meteor.startup(() => {
    WebApp.connectHandlers.use((req, res, next) => {
        const page = req.url.slice(1,5)
        const id = req.url.slice(6);
        if (page == "view") {
            if (id) {
                // console.log(Recipes.findOne({_id:id}))
                res.setHeader('x-recipe', JSON.stringify(Recipes.findOne({_id:id})))
            }
        }
        next()
    })
});