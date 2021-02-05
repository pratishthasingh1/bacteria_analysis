# calling of api of another server
    url = 'http://apixpl.co.in/angul.php'
    params = {
    'key':'265D46FEE487314C374EF9706F866A20',
    'cmd':'ALL,*'

    }
    data =''
    r = requests.post(url, params=params, json=data)

    print(r.status_code)
    print(r.json())