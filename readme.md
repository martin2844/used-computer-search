# Used Computer search

A simple nodeJS Express server that uses Meli's Api to search for used computers (or whatever) and saves the results to a MongoDB.
Each day this task is carried out, and if there is a difference from the previous search, the results are sent out via email, this way you'll be ontop any new item published.   
   
Express Server with a GATSBY front end to view the information in a friendly way. 
JSON info is saved to a mongoDB database.   

Gatsby frontend sits ontop the server in the client folder.


## Packages 

Cron is managed by node-cron  
Mailing is managed by node-mailer    
Server is managed by express  
Logging is handled by winston  
