const _ = require('lodash');
const axios = require('axios');
const Compare = require("../models/Compare");

let getPages = async (term) => {

    try {
        console.log("@@@@@@@ GETTING PAGES @@@@@@@")
        // fetch data from a url endpoint
        const response = await axios.get('https://api.mercadolibre.com/sites/MLA/search?q=' + term + '&condition=used&category=MLA1652&offset=' + 0)
        const amount = await response.data.paging.primary_results;
        const pages = Math.ceil(amount / 50);
        return pages;
    } catch (error) {
        console.log(error); // catches both errors
    }
}


let compare = async (term, pages) => {
    console.log("@@@@@@@ GETTING ALL MELI DATA @@@@@@@")
    let arrayToStore = [];
    let promises = [];
    //here we begin the for loop.
    for (i = 0; i < pages; i++) {
        // So for each page we will do an axios request in order to get results
        //Since each page is 50 as offset, then i should be multiplied by 50.
        promises.push(
            axios.get('https://api.mercadolibre.com/sites/MLA/search?q=' + term + '&condition=used&category=MLA1652&offset=' + i * 50)
                .then((response) => {
                    const cleanUp = response.data.results.map((result) => {
                        let image = result.thumbnail.replace("I.jpg", "O.jpg");
                        return importante = {
                            id: result.id,
                            title: result.title,
                            price: result.price,
                            link: result.permalink,
                            image: image,
                            state: result.address.state_name,
                            city: result.address.city_name
                        }
                    });
                    arrayToStore.push(cleanUp);
                    
                }
                )
        )
    }
    
    return await Promise.all(promises).then(() => {
        return arrayToStore
    });
}


const processData = async (term, arrayToStore) => {
    console.log("@@@@@@@ FLATTENING ARRAY @@@@@@@")
    // FLATTEN ARRAY
    arrayToStore = _.flattenDeep(arrayToStore);
    // console.log(arrayToStore);
    const checkDB = async () => {
        console.log("@@@@@@@ CHECKING DB @@@@@@@")
        try {
            const query = await Compare.findOne({query: term, type: "scratch"}, (err, query) => {
                return query;
            });
            
            if(query) {
                console.log(`@@@@@@@ THE TERM ${term} HAS BEEN SEARCHED BEFORE @@@@@@@`)
                return true
            } else {
                console.log(`@@@@@@@ FIRST TIME SEARCHING ${term} @@@@@@@`)
                return false
            }
            
            // if the query has been done, await checkDB returns true, else false.
      
        } catch (error) {
            return error;
        }
    }

    //We should make a new function to read the DB with that query.
    const readDB = async () => {
        console.log(`@@@@@@@ GETTING DATA FOR ${term} @@@@@@@`)
        try {
            const query = await Compare.findOne({query: term, type:"scratch" }, (err, query) => {
                return query;
            });
            return query;
        } catch (error) {
         return error; 
        }
    }

    if (await checkDB()) {
        let rawDataFromYesterday = await readDB();
        // console.log(rawDataFromYesterday.data[0]);
        let difference = _.differenceBy(arrayToStore, rawDataFromYesterday.data, 'id');
        // console.log(difference, "is there a differences??");
        // difference variable return the new laptops, or the deleted ones. Differences...
        if (difference.length) {
            console.log(`@@@@@@@ THERE WAS A DIFFERENCE OF ${difference.length} ITEMS @@@@@@@`)
            const writeDifference = async () => {
                console.log(`@@@@@@@ ATTEMPTING TO WRITE DIFFERENCE for ${term} @@@@@@@`);
                try {
                    console.log("ENTERED QUERY");
                    const query = await Compare.findOne({query: term, type: "difference"}, (err, query) => {
                        return query;
                    });
                    console.log(query);
                    // if(query){
                    //     console.log("entered difference block")
                    //     let filterDifference = {query: term, type:"difference"}
                    //     let updateDifference = {data: difference}
                    //     let replaceDifference = await Compare.findOneAndUpdate(filterDifference, updateDifference, {new: true});
                    //     return replaceDifference;
                    // } else {
                        console.log("difference else block");
                        const newDifference = new Compare({
                            query: term,
                            type: "difference",
                            data: difference,
                            date: Date.now()
                        });
                        const newDif = await newDifference.save();
                        return newDif
                    // }
                    
              
                } catch (error) {
                    console.log(error);
                    return error;
                }
            }
            //HEHEHE MISSING AWAIT
            await writeDifference();
 
            //Finally write over yesterday's file to compare for tomorrow
            let filter = {query: term, type:"scratch"}
            let update = {data: arrayToStore}
            let replace = await Compare.findOneAndUpdate(filter, update, {new: true});

            //Finally Return Status
            return {
                content: difference,
                message: "These were the differences, items could be new or deleted.",
                info: "an email was sent, details are the following:"
            }
      
            // aca devolver diferencias pero guardar igual para futuras comps.
        } else {
            let pastDifferences = await Compare.findOneAndUpdate({query: term, type:"difference" }, {data: []}, {new: true});
            return {
                content: pastDifferences,
                message: "There were no difference from last consultation",
                info: `the document on the DB storing past differences for ${term} was cleaned up`
               }
            }
    }
     else {
       
        const newFile = new Compare({
            query: term,
            type: "scratch",
            data: arrayToStore
        })
        const newLog = await newFile.save();
        return {
            content: arrayToStore,
            message: "There were no registries that the consultation was done before",
            info: `Writting new file to database, the Id is: ${newLog._id}`
        }
       
    }
    

  return DATA;

}

let saveQueryToDB = async (term) => {
    let searchTerm = term || "thinkpad x240";
    // first round of promise to get pages amount status: WORKING
    const pages = await getPages(searchTerm);
    //second round of promises to get all results. status: WORKING
    const data = await compare(searchTerm, pages);
    // third round of promises to do all file processing
    const lastly = await processData(searchTerm, data)
    return lastly;
}



module.exports = saveQueryToDB;