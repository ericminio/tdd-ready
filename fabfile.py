from fabric.decorators import task
from fabric.operations import local
from features.driver.server_driver import ServerDriver

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
def test():
    import platform
    if platform.system() == 'Darwin':
        local("export PATH=$PATH:./features/geckodriver/mac ; behave features")
    else:
        local("export PATH=$PATH:./features/geckodriver/linux ; behave features")

@task
def run_server():
    local("python -c 'import server; server.app.run(port=8080)'")
