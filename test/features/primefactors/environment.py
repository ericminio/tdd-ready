from selenium import webdriver
from test.features.driver.server_driver import ServerDriver

def before_all(context):
	context.server = start_yose(5000)
	context.browser = webdriver.Firefox()

def after_all(context):
	context.browser.quit()
	stop_yose(context.server)

def start_yose(port):
	server = ServerDriver(name='Yose', port=port)
	server.start(cmd=['gunicorn', 'yose:app', '-w', '1', '-b', '0.0.0.0:{0}'.format(port)])
	return server

def stop_yose(server):
    server.shutdown()