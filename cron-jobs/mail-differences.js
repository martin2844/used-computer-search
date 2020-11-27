const mail = require("../controllers/mailer");
const Compare = require("../models/Compare");
const queryTerm = require("../controllers/comparedb");
const logger = require("../utils/logger")(module);

const sendDifData = async () => {
    //First get all terms...
    logger.info("BEFOR QUERY TYPES")
    const queryTypes = await Compare.find({type:"scratch"}, (err, query) => {
        return query;
    });
    //
    logger.info("MAPPING TERMS")
    let terms = queryTypes.map((query) => {
       return query.query;
    });
    logger.info("ABOUT TO CHECK DIFFERENCES")
    //Check if there are differences for each term
    const checkDifferences = async () => {
        const difPromises = []
        terms.forEach((term) => {
            difPromises.push(
               queryTerm(term)
            )
        })
        Promise.all(difPromises).then(logger.info("terms checked")).catch(err => logger.error(JSON.stringify(err)));
    }
    // Checks differences
    checkDifferences();

 

    //Get Data from DB
    logger.info("ABOUT TO  CHECK DIFFERENCES")
    const differencesQuery = await Compare.find({type: "difference"}, (err, query) => {
        //filter via mongoose-.
        return query;
    });

    let differences = differencesQuery.filter((query) => {
        return query.data.length !== 0;
    });
    //If no Data log that there was no data
    if(differences.length === 0) {
        logger.info("There were no differences found")
        return 
    } else {
        logger.info(`There was a total of ${differences.length} queries with differences found`);
        mail(differences, "martin2844@gmail.com");
        return

    }

}


module.exports = sendDifData;

