from flask import Flask,request,redirect,Response
import requests

app = Flask(__name__)
SITE_NAME = 'http://localhost:8080'

# @app.route('/')
# def index():
#     return 'Flask is running!'

@app.route('/<path:path>',methods=['GET','POST','DELETE','OPTIONS'])
def proxy(path):
    global SITE_NAME
    print(request.method)
    print(request.headers.get("api-key"))
#     print("fucked")
    if request.method=='GET':
        resp = requests.get(f'{SITE_NAME}/{path}', headers={"api-key": request.headers.get("api-key")})
        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        headers = [(name, value) for (name, value) in  resp.raw.headers.items() if name.lower() not in excluded_headers]
        headers.append(('Access-Control-Allow-Origin', '*'))
        headers.append(('Access-Control-Allow-Headers', 'api-key'))
        response = Response(resp.content, resp.status_code, headers)
        return response
    elif request.method=='POST':
        resp = requests.post(f'{SITE_NAME}/{path}', json=request.get_json())
        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
        headers.append('Access-Control-Allow-Origin', '*')
        headers.append(('Access-Control-Allow-Headers', 'api-key'))
        response = Response(resp.content, resp.status_code, headers)
        return response
    elif request.method=='DELETE':
        resp = requests.delete(f'{SITE_NAME}/{path}').content
        response = Response(resp, resp.status_code)
        return response
    elif request.method=='OPTIONS':
#         print("in the right method")
        resp = requests.options(url=f'{SITE_NAME}/{path}')
#         print("got the response: ", resp.content.decode())
        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        headers = [(name, value) for (name, value) in  resp.raw.headers.items() if name.lower() not in excluded_headers]
        headers.append(('Access-Control-Allow-Origin', '*'))
        headers.append(('Access-Control-Allow-Headers', 'api-key'))
        response = Response(resp.content, resp.status_code, headers)
        return response

if __name__ == '__main__':
    app.run(port=8080)