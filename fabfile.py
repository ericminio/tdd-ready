from fabric.decorators import task
from fabric.operations import local
from test.features.driver.server_driver import ServerDriver


@task(default=True)
def default():
    test()


@task
def setup():
    install_requirements()


@task
def install_requirements():
    local('pip install -r requirements.txt --use-mirrors')
    local('pip install -r requirements-test.txt --use-mirrors')


@task
def unit():
    local("nosetests -a '!needs_server'")


@task
def test():
    import platform
    if platform.system() == 'Darwin':
        with YoseServer(port=8080):
            local("export PATH=$PATH:./test/features/geckodriver/mac ; nosetests --tc=server_url:'http://localhost:8080'")
    else:
        with YoseServer(port=8080):
            local("export PATH=$PATH:./test/features/geckodriver/linux ; nosetests --tc=server_url:'http://localhost:8080'")


@task
def run_server():
    local("python -c 'import yose; yose.app.run(port=8080)'")


class YoseServer():
    def __init__(self, port=8080):
        self.port = port
        self.server = ServerDriver(name='Yose', port=self.port)

    def __enter__(self):
        self.server.start(cmd=['gunicorn', 'yose:app', '-w', '1', '-b', '0.0.0.0:{0}'.format(self.port)])
        return self.server

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.server.shutdown()
