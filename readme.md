#### IMPORTANT ENV SERCRET 
- [] MONGO_URL      # DataBase Connection
- [] PORT           # Port address (recommended 5500)
- [] JWT_SECRET     # JWT SECRET
- [] JWT_LIFETIME   # JWT lifeTime (recommended '1hr', '1d');

#### IMPORTANT POINTS TO MARK
1. First Registory is ADMIN by default >which provide privilage of creating owner and have power has Super user
2. Password was bycrypted During pre Save Schema in Schema methods
3. JWT creation and attach to the cookies was handle throught the util functions `attachCookies` from utils
4. Error are handled throught the express-async-error and custom Error classes
5. some added security of xss-clean, http-rate-limit and helmet added
6. For supporting Cross-Origin Resource Sharing and filedoc  cors and fileupload middleware added
7. Morgan for logger also used  for displaying logger info on the console
8. Worked on use of populate ,virtuals and aggreagator function also utilized 
9. Worked on Schema.static.methods, Schema.methods and Schema.pre(save,fn()) and Schema.post() methods are also explored and handled