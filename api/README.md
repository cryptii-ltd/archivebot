# Usage
## Requirements
- python 3.11+
- pip


## Installation
`pip install -r requirements.txt`


## Running the API
`gunicorn -w {worker_count} app:app`.

For optimal performance, it is recommended to configure Gunicorn with 2-4 worker processes per CPU core. Adjust this number based on your server's hardware capabilities and anticipated traffic load to ensure efficient handling of simultaneous requests.

On windows you must `pip install waitress` and use `waitress-serve app:app` instead, as Gunicorn does not work on windows.


## Debugging
The API will automatically log to a `YYYY-MM-DD.log` file, as well as to the terminal/journal. Most operations are logged if they're helpful for debugging/logging. Some events are omitted in order to keep logs concise and useful.