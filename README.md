Bootstrap website with the dashboard displaying all restaurants, dropdown for open, closed and orders. Open shows all open branches, closed shows all closed branches, each can be searched with the search bar referencing the restaurant name, live search result updates. Orders is still a work in progress as currently struggling with indexing and implementing a javascript map. Able to collect location information from user, display time, working on implementation of additional features such as distance of rider from user, number of riders nearby user, average food prep time (based off of multiple orders in single restaurant branch leading to higher wait time), position in queue (number of orders at restaurant branch), time for food to reach user (average food prep time + current time) . able to display distance of closest branch to user 

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
  