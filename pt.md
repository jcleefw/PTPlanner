NNER 
####Melbourne Public Transport Journey Planner

There are 3 train lines:

The **Alamein** line has the following stops: Flinders Street, Richmond, East Richmond, Burnley, Hawthorn, and Glenferrie.

The **Glen Waverly** line has the following stops: Flagstaff, Melbourne Central, Parliament, Richmond, Kooyong and Tooronga.

The **Sandringham** line has the following stops: Southern Cross, Richmond, South Yarra, Prahran, and Windsor.

---

All 3 train lines intersect at **Richmond**, but there are NO other intersection points as trains run express.

Write a JS program that takes the line + stop that a user is getting on at and the line + stop that user is getting off at and prints the total number of stops for the trip.


#####Hints:

Get your JS program to work for a single line before trying to tackle multiple lines.
Consider diagramming the lines by sketching out the train lines and their stops and intersection.
Make train lines keys in a hash, while the values are an array of all the stops on each line.

The key to the lab is the intersection of the lines at Richmond. 

####Non-Required Bonus:

* List the stations on the journey in order of travel
* Use input validation
  - User must enter a line and station in the subway network
  - If the user enters something else, your program should handle it
* Add an additional lines
* Allow trains to have multiple intersection points


#### Resources 
[Here's a map of the train network to help](https://drive.google.com/a/generalassemb.ly/file/d/0Bx09n7UgX2HyaGswNVNWd3B0bEE/view?usp=sharing)
