from selenium import webdriver
from driver.server_driver import ServerDriver

def before_all(context):
    context.server_port = 5000
    context.server = start_server(context.server_port)
    context.browser = webdriver.Firefox()

def after_all(context):
    context.browser.quit()
    stop_server(context.server)

def start_server(port):
    server = ServerDriver(name='MyServer', port=port)
    server.start(cmd=['gunicorn', 'server:app', '-w', '1', '-b', '0.0.0.0:{0}'.format(port)])
    return server

def stop_server(server):
    server.shutdown()
