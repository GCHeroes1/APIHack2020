Bootstrap website with the dashboard displaying all restaurants \
Dropdown for open, closed and orders. \
Open shows all open branches \
Closed shows all closed branches \
Each can be searched with the search bar referencing the restaurant name, live search result updates. \
Orders contains a list of orders and the riders that are assigned to them, only 1 rider per order. \
Able to collect location information from user, display time \
Able to display distance of closest branch to user for all restaurants \
Working on implementation of additional features such as 
- Distance of rider from user 
- Number of riders nearby user 
- Average food prep time (based off of multiple orders in single restaurant branch leading to higher wait time)
- Position in queue (number of orders at restaurant branch) 
- Time for food to reach user (average food prep time + current time)   

## Running the reverse proxy:
Create a virtual environment, activate it and install requirements (platform dependent)
 - Linux: \
  `python3 -m venv venv` \
  `source venv/bin/activate` \
  `python -m pip install -r requirements.txt`

 - Windows: \
 `py -m venv venv` \
 `venv\Scripts\activate` \
 `python -m pip install -r requirements.txt`
 
Once venv is created, run `python reverse-proxy.py`
  
