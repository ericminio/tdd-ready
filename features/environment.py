from selenium import webdriver
from driver.server_driver import ServerDriver

def before_all(context):
	context.server = start_server(5000)
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
